import React from 'react';
import cl from './SavedArticles.module.sass'
import './transitions.css'
import ArticleShort from "../Shared/ArticleShort";
import {loadSavedArticles} from "./SavedArticles.functions";
import SavedArticlesSkeleton from "./SavedArticlesSkeleton";
import {articlesApi} from "../../../api/userApi";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import IExtendedArticle from "../../../types/IExtendedArticle";
import {useQuery, useQueryClient} from "react-query";

const SavedArticles = () => {
  const queryClient = useQueryClient();
  const savedArticles = useQuery<IExtendedArticle[], string>('savedArticles', () => loadSavedArticles());

  console.log('savedArticles', savedArticles);

  const handleSetRate = (localization: IExtendedArticle) => (value: number) => {
    const articleIndex = savedArticles.data!.indexOf(localization);
    const result = savedArticles.data!.map((a, index) => index === articleIndex ? {...a, rate: value} : a);
    queryClient.setQueryData('savedArticles', result);
  }

  async function removeFromSavedHandle(id: number, code: string) {
    await articlesApi.toggleSavingLocalization(id, code);
    const savedArticleIndex = savedArticles.data!.findIndex(a => a.articleId === id && a.languageCode === code);
    queryClient.setQueryData('savedArticles', savedArticles.data!.filter((a, index) => index !== savedArticleIndex));
    await queryClient.invalidateQueries('articles');
  }

  if (savedArticles.isError) return <div>{savedArticles.error}</div>;

  return (
    savedArticles.isLoading ? <SavedArticlesSkeleton/> :
      <TransitionGroup className={cl.savedWrapper}>
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
              timeShow={'saved'}
              textBeforeTime={'збережено'}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
  );
};

export default SavedArticles;
