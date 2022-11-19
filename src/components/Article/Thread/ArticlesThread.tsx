import React, {FC} from 'react';
import classes from './ArticlesThread.module.sass';
import ArticleShort from '../Shared/ArticleShort';
import {articlesApi} from "../../../api/api";
import IExtendedArticle from "../../../types/IExtendedArticle";
import {useQueryClient} from "react-query";
import ErrorBlock from "../../Layout/ErrorBlock";

interface IArticlesThreadProps {
  articles: IExtendedArticle[],
  setArticles: (articles: IExtendedArticle[]) => void
}

const ArticlesThread: FC<IArticlesThreadProps> = ({articles, setArticles}) => {

  const queryClient = useQueryClient();

  const handleSaving = (localization: IExtendedArticle) => async () => {
    await articlesApi.toggleSavingLocalization(localization.articleId, localization.languageCode);
    await queryClient.invalidateQueries('savedArticles');
    setArticles(articles.map((a) => a.localizationId === localization.localizationId
      ? {...a, isSaved: !a.isSaved} : a));
  }

  const handleSetRate = (localization: IExtendedArticle) => (value: number) => {
    setArticles(articles.map((a) => a.localizationId === localization.localizationId ? {...a, rate: value} : a));
  }


  return (
    <div className={classes.thread}>
      {articles.length > 0
        ? articles.map((item) => (
          <ArticleShort
            key={item.localizationId}
            localization={item}
            setRate={handleSetRate(item)}
            save={{actual: item.isSaved ?? false, handle: handleSaving(item)}}
            timeShow={'published'}
          />
        ))
        : <ErrorBlock>
          Користувач ще не написав жодноЇ статті
        </ErrorBlock>
      }
    </div>
  );
};

export default ArticlesThread;
