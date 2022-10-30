import React, {useState} from 'react';
import ArticlesThread from '../../../components/Article/Thread/ArticlesThread';
import Layout from '../../../components/Layout/Layout';
import {useTranslation} from "react-i18next";
import ArticlesThreadTitle from "../../../components/Article/Thread/ArticlesThreadTitle";
import {loadLocalizations} from "../../../components/Article/Thread/ArticlesThreadSpace.functions";
import IExtendedArticle from "../../../types/IExtendedArticle";
import ArticlesThreadSpaceSkeleton from "../../../components/Article/Thread/ArticlesThreadSpaceSkeleton";
import {UkrainianLanguage} from "../../../utils/constants";
import {useQuery, useQueryClient} from "react-query";
import {useAppSelector} from "../../../store/storeConfiguration";

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
  const articles = useQuery<IExtendedArticle[], string>(['articles', articlesLanguage, isLogin],
    () => loadLocalizations(articlesLanguage));

  const handleSetArticles = (newArticles: IExtendedArticle[]) => {
    queryClient.setQueryData(['articles', articlesLanguage, isLogin], newArticles);
  }

  const titles = {
    center:
      <ArticlesThreadTitle
        articlesLanguage={articlesLanguage}
        setArticlesLanguage={handleSetArticlesLanguage}
        options={languages}
      />,
  }

  if (articles.isError) return <div>{articles.error}</div>

  return (
    <Layout
      titles={titles}
    >
      {
        articles.isLoading ? <ArticlesThreadSpaceSkeleton/> :
          <ArticlesThread
            articles={articles.data!}
            setArticles={handleSetArticles}
          />
      }
    </Layout>
  );
};

export default ArticlesThreadSpace;
