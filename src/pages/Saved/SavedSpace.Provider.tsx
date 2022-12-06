import React, {createContext, FC, PropsWithChildren, useContext, useMemo} from 'react';
import {useQuery, useQueryClient, UseQueryResult} from "react-query";
import IExtendedArticle from "../../types/IExtendedArticle";
import {loadSavedArticles} from "../../components/Article/Saved/SavedArticles.functions";
import {ApiError} from "../../types/ApiError";

type ContextType = {
  savedArticles: UseQueryResult<IExtendedArticle[], ApiError>,
  setSavedArticles: (articles: IExtendedArticle[]) => void
}

const InitialContextValue: ContextType = {
  savedArticles: {} as UseQueryResult<IExtendedArticle[], ApiError>,
  setSavedArticles: () => {
  }
}

const SavedContext = createContext<ContextType>(InitialContextValue);

export const useSavedArticlesContext = (): ContextType => useContext<ContextType>(SavedContext);

const SavedSpaceProvider: FC<PropsWithChildren> = ({children}) => {
  const queryClient = useQueryClient();
  const savedArticles = useQuery<IExtendedArticle[], ApiError>('savedArticles', () => loadSavedArticles());

  const setSavedArticles = (articles: IExtendedArticle[]) => queryClient.setQueryData('savedArticles', articles);

  const value: ContextType = useMemo(() => {
    return {
      savedArticles,
      setSavedArticles
    }
  }, [savedArticles, setSavedArticles])

  return <SavedContext.Provider value={value}>
    {children}
  </SavedContext.Provider>
};

export default SavedSpaceProvider;