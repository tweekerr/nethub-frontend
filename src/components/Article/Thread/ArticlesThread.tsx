import React, {FC} from 'react';
import classes from './ArticlesThreadSpace.module.sass';
import ArticleShort from '../Shared/ArticleShort';
import {Skeleton} from "@mui/material";
import {articlesApi} from "../../../api/userApi";
import IExtendedArticle from "../../../types/IExtendedArticle";

interface IArticlesThreadProps {
  articles: IExtendedArticle[],
  setArticles: (articles: IExtendedArticle[]) => void
}

const ArticlesThread: FC<IArticlesThreadProps> = ({articles, setArticles}) => {

  const handleSaving = (id: number, code: string) => async () => await articlesApi.toggleSavingLocalization(id, code);
  const handleSetRate = (localization: IExtendedArticle) => (value: number) => {
    setArticles(articles.map((a) => a.localizationId === localization.localizationId ? {...a, rate: value} : a));
  }

  console.log(articles, 'articles')


  return (
    <div className={classes.blogSpace}>
      {articles.length > 0 ?
        articles.map((item) => (
          <ArticleShort
            key={item.localizationId}
            localization={item}
            setRate={handleSetRate(item)}
            save={{actual: item.isSaved ?? false, handle: handleSaving(item.articleId, item.languageCode)}}
            timeShow={'published'}
          />
        )) : <Skeleton height={'100px'}/>}
    </div>
  );
};

export default ArticlesThread;
