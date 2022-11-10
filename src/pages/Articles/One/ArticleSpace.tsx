import React, {useState} from 'react';
import Layout from '../../../components/Layout/Layout';
import ArticleBody from "../../../components/Article/One/Body/ArticleBody";
import CommentsWidget from "../../../components/Shared/CommentsWidget";
import ArticleInfo from "../../../components/Article/One/ArticleInfo";
import {useParams} from "react-router-dom";
import ArticleBodySkeleton from "../../../components/Article/One/Body/ArticleBodySkeleton";
import IArticleLocalizationResponse from "../../../types/api/Article/IArticleLocalizationResponse";
import {RateVariants} from "../../../components/Article/Shared/ArticlesRateCounter";
import {useQuery, useQueryClient} from "react-query";
import {useAppSelector} from "../../../store/storeConfiguration";
import {getArticle, getArticleActions, getLocalization,} from "./ArticleSpace.functions";
import {Box, Skeleton, Text} from "@chakra-ui/react";


const ArticleSpace = () => {
    const queryClient = useQueryClient();
    const {id, code} = useParams();
    const {isLogin} = useAppSelector(state => state.generalReducer);
    const article = useQuery(['article', id], () => getArticle(id!));
    const localization = useQuery<IArticleLocalizationResponse, any>(['articleLocalization', id, code], () => getLocalization(id!, code!),
      {
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
        return <Layout><Text as={'p'}>Дана стаття ще пишеться :)</Text></Layout>
      }
      return <Layout><Text as={'p'}>{localization.error?.message}</Text></Layout>
    }

    const rightBar = {
      children: (localization.isLoading || article.isLoading)
        ? <Skeleton height={200}/>
        : <ArticleInfo
          isError={localization.isError}
          article={article.data!}
          localization={localization.data!}
          isLoading={localization.isLoading}
        />
    }

    return (
      <Layout rightBar={rightBar}>
        <Box width={'100%'} display={'flex'} flexDirection={'column'}>
          {
            localization.isLoading || article.isLoading ? <ArticleBodySkeleton/> :
              <ArticleBody
                localization={localization.data!} tags={article.data!.tags}
                userActions={userActions} rate={{current: article.data!.rate, setCurrent: handleSetRate}}
              />
          }
          {<CommentsWidget display={!(localization.isLoading || article.isLoading)} deps={[id, code]}/>}
        </Box>
      </Layout>
    );
  }
;

export default ArticleSpace;
