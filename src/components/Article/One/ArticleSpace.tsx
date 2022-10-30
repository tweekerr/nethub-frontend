import React, {useState} from 'react';
import Layout from '../../Layout/Layout';
import ArticleBody from "./Body/ArticleBody";
import CommentsWidget from "../../Shared/CommentsWidget";
import cl from './ArticleSpace.module.sass'
import ArticleInfo from "./ArticleInfo";
import {useParams} from "react-router-dom";
import ArticleBodySkeleton from "./Body/ArticleBodySkeleton";
import IArticleLocalizationResponse from "../../../types/api/Article/IArticleLocalizationResponse";
import {RateVariants} from "../Shared/ArticlesRateCounter";
import {useQuery, useQueryClient} from "react-query";
import {useAppSelector} from "../../../store/storeConfiguration";
import {Skeleton} from '@mui/material';
import {getArticle, getArticleActions, getLocalization,} from "./ArticleSpace.functions";


const ArticleSpace = () => {
    const queryClient = useQueryClient();
    const {id, code} = useParams();
    const {isLogin} = useAppSelector(state => state.generalReducer);
    const article = useQuery(['article', id], () => getArticle(id!), {staleTime: 50000});
    const localization = useQuery<IArticleLocalizationResponse, any>(['articleLocalization', id, code], () => getLocalization(id!, code!),
      {
        staleTime: 50000,
        onSuccess: async () => {
          if (isLogin) {
            setUserActions(await getArticleActions(id!, code!))
          }
        }
      });

    const [userActions, setUserActions] = useState<{ isSaved: boolean, rate: RateVariants }>({
      isSaved: false,
      rate: 'none'
    })

    const handleSetRate = (value: number) => queryClient.setQueryData(['article', id], {...article, rate: value});

    if (localization.isError || article.isError) {
      if (localization.error?.message === 'No such article localization') {
        return <Layout><p>Дана стаття ще пишеться :)</p></Layout>
      }
      return <Layout><p>{localization.error?.message}</p></Layout>
    }

    return (
      <Layout
        rightBar={
          (localization.isLoading || article.isLoading)
            ? <Skeleton variant={'rounded'} width={'100%'} height={200}/>
            : <ArticleInfo
              isError={localization.isError}
              article={article.data!}
              localization={localization.data!}
              isLoading={localization.isLoading}
            />}
      >

        <div className={cl.layoutBody}>
          {
            localization.isLoading || article.isLoading ? <ArticleBodySkeleton/> :
              <ArticleBody
                localization={localization.data!} tags={article.data!.tags}
                userActions={userActions} rate={{current: article.data!.rate, setCurrent: handleSetRate}}
              />
          }
          {<CommentsWidget display={!(localization.isLoading || article.isLoading)} deps={[id, code]}/>}
        </div>
      </Layout>
    );
  }
;

export default ArticleSpace;
