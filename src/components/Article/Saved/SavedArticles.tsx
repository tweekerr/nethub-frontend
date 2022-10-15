import React, {useEffect, useState} from 'react';
import cl from './SavedArticles.module.sass'
import './transitions.css'
import ArticleShort from "../Shared/ArticleShort";
import useLoading from "../../../hooks/useLoading";
import {loadSavedArticles} from "./SavedArticles.functions";
import SavedArticlesSkeleton from "./SavedArticlesSkeleton";
import {articlesApi} from "../../../api/userApi";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import IExtendedArticle from "../../../types/IExtendedArticle";

const SavedArticles = () => {
  const {isLoading, startLoading, finishLoading, error, setError} = useLoading();
  const [savedArticles, setSavedArticles] = useState<IExtendedArticle[]>([])
  const handleSetRate = (localization: IExtendedArticle) => (value: number) => {
    const articleIndex = savedArticles.indexOf(localization);
    const result = savedArticles.map((a, index) => index === articleIndex ? {...a, rate: value} : a);
    setSavedArticles(result);
  }

  useEffect(() => {
    startLoading();
    loadSavedArticles()
      .then(({articles}) => {
        setSavedArticles(articles);
      })
      .catch((e) => {
        setError(true, 'Помилка при завантаженні інформації :(')
      })
      .finally(() => {
        finishLoading()
      })
  }, []);


  async function removeFromSavedHandle(id: number, code: string) {
    await articlesApi.toggleSavingLocalization(id, code);
    const articleIndex = savedArticles.findIndex(a => a.articleId === id && a.languageCode === code);
    setSavedArticles(prev => prev.filter((sa, index) => index !== articleIndex));
  }

  return (
    error.isError ? <div>{error.message}</div> :
      isLoading ? <SavedArticlesSkeleton/> :
        <TransitionGroup className={cl.savedWrapper}>
          {savedArticles.map((article) =>
            <CSSTransition
              key={article.localizationId}
              timeout={500}
              classNames="item"
            >
              <ArticleShort localization={article}
                            setRate={handleSetRate(article)}
                            save={{
                              actual: true,
                              handle: async () => await removeFromSavedHandle(article.articleId, article.languageCode)
                            }}
                            timeShow={'saved'}
                            textBeforeTime={'збережено'}/>
            </CSSTransition>
          )}
        </TransitionGroup>
  );
};

export default SavedArticles;
