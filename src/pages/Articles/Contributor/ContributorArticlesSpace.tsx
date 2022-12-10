import React from 'react';
import ArticlesThread from "../../../components/Article/Thread/ArticlesThread";
import ArticlesThreadSpaceSkeleton from "../Thread/ArticlesThreadSpaceSkeleton";
import Currency from "../../../components/Currency/Currency";
import {Skeleton, Text} from "@chakra-ui/react";
import ArticlesThreadTitle from "../../../components/Article/Thread/ArticlesThreadTitle";
import {LFC2} from "../../../components/Layout/LFC";
import ContributorArticlesSpaceProvider, {useContributorArticlesContext} from "./ContributorArticlesSpace.Provider";

const ContributorArticlesSpace: LFC2 = () => {
  const {
    languages,
    articlesLanguage,
    setArticlesLanguage,
    contributorAccessor,
    contributorArticlesAccessor,
    setContributorArticles
  } = useContributorArticlesContext()


  const title = contributorAccessor.data?.userName
    ? `Статті, написані ${contributorAccessor.data.userName}`
    : <Skeleton height={'auto'}>height</Skeleton>

  return {
    Center: {
      Render: !contributorArticlesAccessor
        ? <ArticlesThreadSpaceSkeleton/>
        : <ArticlesThread
          articles={contributorArticlesAccessor.data!} setArticles={setContributorArticles} byUser={true}
        />,
      title: <ArticlesThreadTitle
        title={title}
        articlesLanguage={articlesLanguage}
        setArticlesLanguage={setArticlesLanguage}
        options={languages}
      />,
      config: {error: {show: true}}
    },
    Right: {
      render: <Currency/>,
      title: <Text as={'h2'}>Курс</Text>,
      config: {error: {show: true, customMessage: 'Помилка'}}
    },
    ContextProvider: ContributorArticlesSpaceProvider
  };
}

export default ContributorArticlesSpace;
