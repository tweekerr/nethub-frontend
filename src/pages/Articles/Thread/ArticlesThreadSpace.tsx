import React, {useState} from 'react';
import Layout from '../../../components/Layout/Layout';
import {useTranslation} from "react-i18next";
import ArticlesThreadTitle from "../../../components/Article/Thread/ArticlesThreadTitle";
import IExtendedArticle from "../../../types/IExtendedArticle";
import {UkrainianLanguage} from "../../../utils/constants";
import {useQuery, useQueryClient} from "react-query";
import {useAppSelector} from "../../../store/storeConfiguration";
import ArticlesThreadSpaceSkeleton from "./ArticlesThreadSpaceSkeleton";
import ArticlesThread from "../../../components/Article/Thread/ArticlesThread";
import Currency from "../../../components/Currency/Currency";
import {Text} from "@chakra-ui/react";
import {articlesApi} from "../../../api/api";

const ArticlesThreadSpace = () => {
  const [articlesLanguage, setArticlesLanguage] = useState<string>(localStorage.getItem('articlesLanguage') ?? UkrainianLanguage);
  const {t} = useTranslation();
  const languages = [{title: 'UA', value: 'ua'}, {title: 'EN', value: 'en'}]
  const handleSetArticlesLanguage = (value: string) => {
    localStorage.setItem('articlesLanguage', value);
    setArticlesLanguage(value);
  }

  const {isLogin} = useAppSelector(state => state.generalReducer);

  const queryClient = useQueryClient();
  const articlesAccessor = useQuery<IExtendedArticle[], Error>(['articles', articlesLanguage, isLogin],
    () => articlesApi.getArticles(articlesLanguage)
  );

  const handleSetArticles = (newArticles: IExtendedArticle[]) => {
    queryClient.setQueryData(['articles', articlesLanguage, isLogin], newArticles);
  }

  const rightBar = {
    children: <Currency/>,
    title: <Text as={'h2'}>Курс</Text>,
    error: {show:true, customMessage: 'Test'}
  };

  return (
    <Layout
      title={
        <ArticlesThreadTitle
          articlesLanguage={articlesLanguage}
          setArticlesLanguage={handleSetArticlesLanguage}
          options={languages}
        />}
      rightBar={rightBar}
      error={{show: true}}
    >
      {
        // articlesAccessor.isError ? <ErrorBlock/>
        //   :
        articlesAccessor.isLoading
          ? <ArticlesThreadSpaceSkeleton/>
          : <ArticlesThread
            articles={articlesAccessor.data!}
            setArticles={handleSetArticles}
          />
      }
    </Layout>
  );
};

export default ArticlesThreadSpace;
