import React from 'react';
import cl from './SavedArticles.module.sass'
import './transitions.css'
import SavedArticlesSkeleton from "./SavedArticlesSkeleton";
import {articlesApi} from "../../../api/api";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import IExtendedArticle from "../../../types/IExtendedArticle";
import {useSavedArticlesContext} from "../../../pages/Saved/SavedSpace.Provider";
import {useQueryClient} from "react-query";
import ErrorBlock from "../../Layout/ErrorBlock";
import ArticleShort from "../Shared/ArticleShort";

const SavedArticles = () => {
  const {savedArticles, setSavedArticles} = useSavedArticlesContext();
  const queryClient = useQueryClient();

  const handleSetRate = (localization: IExtendedArticle) => (value: number) => {
    const articleIndex = savedArticles.data!.indexOf(localization);
    const result = savedArticles.data!.map((a, index) => index === articleIndex ? {...a, rate: value} : a);
    setSavedArticles(result);
  }

  async function removeFromSavedHandle(id: number, code: string) {
    await articlesApi.toggleSavingLocalization(id, code);
    const savedArticleIndex = savedArticles.data!.findIndex(a => a.articleId === id && a.languageCode === code);
    setSavedArticles(savedArticles.data!.filter((a, index) => index !== savedArticleIndex));
    await queryClient.invalidateQueries('articles');
  }

  return (
    !savedArticles.isSuccess ? <SavedArticlesSkeleton/> :
      savedArticles.data.length === 0
        ? <ErrorBlock>Упс, Ви ще не зберегли статтей</ErrorBlock>
        : <TransitionGroup className={cl.savedWrapper}>
          {savedArticles.data!.map((article) =>
            <CSSTransition
              key={article.localizationId}
              timeout={500}
              classNames="item"
            >
              <ArticleShort
                localization={article}
                setRate={handleSetRate(article)}
                save={{
                  actual: true,
                  handle: async () => await removeFromSavedHandle(article.articleId, article.languageCode)
                }}
                time={{before: 'збережено', show: 'saved'}}
              />
            </CSSTransition>
          )}
        </TransitionGroup>
  );
};

export default SavedArticles;
