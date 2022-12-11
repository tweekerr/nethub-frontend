import React, {createContext, FC, PropsWithChildren, useContext, useMemo, useState} from 'react';
import ILocalization from "../../../types/ILocalization";
import {ArticleStorage} from "../../../utils/localStorageProvider";
import {useQuery, UseQueryResult} from "react-query";
import {articlesApi} from "../../../api/api";
import {ApiError} from "../../../types/ApiError";
import {useParams} from "react-router-dom";

interface ContextType {
  article: ILocalization,
  defaultArticleState: ILocalization,
  setArticle: React.Dispatch<React.SetStateAction<ILocalization>>,
  setArticleValue: (key: string) => (value: any) => void
  images?: UseQueryResult<string[], ApiError>,
}

const defaultState = () => {
  return {
    title: ArticleStorage.getTitle() ?? '',
    description: ArticleStorage.getDescription() ?? '',
    html: ArticleStorage.getHtml() ?? '',
    // tags: ArticleStorage.getTags() ? JSON.parse(ArticleStorage.getTags()!) : [] as string[],
    tags: ArticleStorage.getTags() ? JSON.parse(ArticleStorage.getTags()!) : ['test1', 'test2', 'test3'],
  } as ILocalization
};

const InitialContextValue: ContextType = {
  article: defaultState(),
  defaultArticleState: defaultState(),
  setArticle: () => {
  },
  setArticleValue: () => () => {
  },
}

const ArticleCreatingContext = createContext<ContextType>(InitialContextValue);

export const useArticleCreatingContext = (): ContextType => useContext<ContextType>(ArticleCreatingContext);

const ArticleCreatingProvider: FC<PropsWithChildren> = ({children}) => {
  const {id} = useParams();

  const [article, setArticle] = useState<ILocalization>(defaultState);
  const images = useQuery<string[], ApiError>('articleImages', () => articlesApi.getArticleImages(), {enabled: !!id});


  const setArticleValue = (key: string) => (value: any) => {
    setArticle((prev) => {
      return {...prev, [key]: value}
    })
  }

  const value: ContextType = useMemo(() => {
    return {
      article,
      setArticle,
      setArticleValue,
      images,
      defaultArticleState: defaultState()
    }
  }, [article, setArticle, setArticleValue, images, defaultState])

  return (
    <ArticleCreatingContext.Provider value={value}>
      {children}
    </ArticleCreatingContext.Provider>
  );
};

export default ArticleCreatingProvider;