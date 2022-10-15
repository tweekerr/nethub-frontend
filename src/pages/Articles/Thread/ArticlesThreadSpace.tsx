import React, {useEffect, useState} from 'react';
import ArticlesThread from '../../../components/Article/Thread/ArticlesThread';
import NewsSpace from '../../../components/mainSpace/news/NewsSpace';
import Layout from '../../../components/Layout/Layout';
import {useTranslation} from "react-i18next";
import ArticlesThreadTitle from "../../../components/Article/Thread/ArticlesThreadTitle";
import {loadLocalizations} from "../../../components/Article/Thread/ArticlesThreadSpace.functions";
import useLoading from "../../../hooks/useLoading";
import IExtendedArticle from "../../../types/IExtendedArticle";
import ArticlesThreadSpaceSkeleton from "../../../components/Article/Thread/ArticlesThreadSpaceSkeleton";
import {UkrainianLanguage} from "../../../utils/constants";
import {isAuthorized} from "../../../utils/JwtHelper";


const ArticlesThreadSpace = () => {
  const [articlesLanguage, setArticlesLanguage] = useState<string>(localStorage.getItem('articlesLanguage') ?? UkrainianLanguage);
  const {t} = useTranslation();
  const languages = [{title: 'UA', value: 'ua'}, {title: 'EN', value: 'en'}]
  const handleSetArticlesLanguage = (value: string) => {
    localStorage.setItem('articlesLanguage', value);
    setArticlesLanguage(value);
  }
  const handleSetArticles = (articles: IExtendedArticle[]) => setArticles(articles);


  const titles = {
    center:
      <ArticlesThreadTitle
        articlesLanguage={articlesLanguage}
        setArticlesLanguage={handleSetArticlesLanguage}
        options={languages}
      />,
    // right: <h2>{t('news')}</h2>
  }


  const {startLoading, finishLoading, isLoading, error, setError} = useLoading();

  const [articles, setArticles] = useState<IExtendedArticle[]>([]);

  useEffect(() => {
    startLoading();
    loadLocalizations(articlesLanguage)
      .then(({articles}) => {
        setArticles(articles);
      })
      .catch(e => {
        setError(e);
      })
      .finally(() => {
        finishLoading();
      })
  }, [articlesLanguage, isAuthorized()]);


  return (
    <Layout titles={titles}
      // rightBar={<NewsSpace/>}
    >
      {
        error.isError ? <div>{error.message}</div> :
          isLoading ? <ArticlesThreadSpaceSkeleton/> :
            <ArticlesThread articles={articles} setArticles={handleSetArticles}/>
      }
    </Layout>
  );
};

export default ArticlesThreadSpace;
