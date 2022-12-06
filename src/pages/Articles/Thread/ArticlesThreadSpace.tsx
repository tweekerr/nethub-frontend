import React from 'react';
import {useTranslation} from "react-i18next";
import ArticlesThreadTitle from "../../../components/Article/Thread/ArticlesThreadTitle";
import ArticlesThreadSpaceSkeleton from "./ArticlesThreadSpaceSkeleton";
import ArticlesThread from "../../../components/Article/Thread/ArticlesThread";
import Currency from "../../../components/Currency/Currency";
import {Text} from "@chakra-ui/react";
import {LFC2} from "../../../components/Layout/LFC";
import ArticlesThreadSpaceProvider, {useArticlesThreadContext} from "./ArticlesThreadSpaceProvider";

const ArticlesThreadSpace: LFC2 = () => {
  const {t} = useTranslation();

  const {languages, articlesLanguage, setArticlesLanguage, articlesAccessor, setArticles} = useArticlesThreadContext();

  return {
    Center: {
      render: !articlesAccessor.isSuccess
        ? <ArticlesThreadSpaceSkeleton/>
        : <ArticlesThread
          articles={articlesAccessor.data!}
          setArticles={setArticles}
        />,
      title: <ArticlesThreadTitle
        title={'Стрічка'}
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
    ContextProvider: ArticlesThreadSpaceProvider
  }
};

export default ArticlesThreadSpace;
