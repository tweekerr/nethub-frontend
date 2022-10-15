import React, {useEffect, useState} from 'react';
import Layout from '../../Layout/Layout';
import ArticleBody from "./Body/ArticleBody";
import CommentsWidget from "../../Shared/CommentsWidget";
import cl from './ArticleSpace.module.sass'
import ArticleInfo from "./ArticleInfo";
import useLoading from "../../../hooks/useLoading";
import {useParams} from "react-router-dom";
import ArticleBodySkeleton from "./Body/ArticleBodySkeleton";
import IArticleLocalizationResponse, {IContributor} from "../../../types/api/Article/IArticleLocalizationResponse";
import IArticleResponse from "../../../types/api/Article/IArticleResponse";
import {loadArticleInfo} from "./ArticleSpace.functions";
import IUserInfoResponse from "../../../types/api/User/IUserInfoResponse";
import {RateVariants} from "../Shared/ArticlesRateCounter";
import {isAuthorized} from "../../../utils/JwtHelper";


const ArticleSpace = () => {
  const {isLoading, startLoading, finishLoading, error, setError} = useLoading();
  const {id, code} = useParams();
  const [article, setArticle] = useState<IArticleResponse>({tags: [] as string[]} as IArticleResponse);
  const [localization, setLocalization] = useState<IArticleLocalizationResponse>({
    contributors: [] as IContributor[]
  } as IArticleLocalizationResponse);
  const [contributors, setContributors] = useState<IUserInfoResponse[]>([])
  const [userActions, setUserActions] = useState<{ isSaved: boolean, rate: RateVariants }>({
    isSaved: false,
    rate: 'none'
  })
  const handleSetRate = (value: number) => setArticle({...article, rate: value});

  useEffect(() => {
      startLoading();
      loadArticleInfo(id!, code!, !!isAuthorized())
        .then(({article, localization, users, isSaved, rating}) => {
          setArticle(article);
          setLocalization(localization);
          setContributors(users)
          if (!!isAuthorized()) {
            setUserActions({isSaved: isSaved!, rate: rating!});
          }
        })
        .catch(e => {
          setError(true, 'Дана стаття ще пишеться :)')
        })
        .finally(() =>
          finishLoading()
        )
    }, [id, code]
  )

  return (
    <Layout
      rightBar={
        <ArticleInfo error={error}
                     article={article}
                     localization={localization}
                     contributors={contributors}
                     isLoading={isLoading}
        />}
    >

      <div className={cl.layoutBody}>
        {
          error.isError ? <div>{error.message}</div> :
            isLoading ? <ArticleBodySkeleton/> :
              <ArticleBody localization={localization} contributors={contributors} tags={article.tags}
                           userActions={userActions} rate={{current: article.rate, setCurrent: handleSetRate}}/>
        }
        {!error.isError && <CommentsWidget display={!isLoading} deps={[id, code]}/>}
      </div>
    </Layout>
  );
};

export default ArticleSpace;
