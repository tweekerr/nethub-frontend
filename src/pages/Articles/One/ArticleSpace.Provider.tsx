import React, {FC, PropsWithChildren, useState} from 'react';
import {useQuery, useQueryClient, UseQueryResult} from "react-query";
import {getArticle, getArticleActions, getLocalization} from "./ArticleSpace.functions";
import {useParams} from "react-router-dom";
import IArticleLocalizationResponse from "../../../types/api/Article/IArticleLocalizationResponse";
import {ApiError} from "../../../types/ApiError";
import {RateVariants} from "../../../components/Article/Shared/ArticlesRateCounter";
import {useAppStore} from "../../../store/config";
import IArticleResponse from "../../../types/api/Article/IArticleResponse";
import {AxiosError, AxiosResponse} from "axios";

type ContextType = {
  articleAccessor: UseQueryResult<IArticleResponse, ApiError>,
  setArticle: (article: IArticleResponse) => void,
  localizationAccessor: UseQueryResult<IArticleLocalizationResponse, ApiError>,
  userActions: { isSaved: boolean, rate: RateVariants }
}

const InitialContextValue: ContextType = {
  articleAccessor: {} as UseQueryResult<IArticleResponse, ApiError>,
  setArticle: () => {
  },
  localizationAccessor: {} as UseQueryResult<IArticleLocalizationResponse, ApiError>,
  userActions: {
    isSaved: false,
    rate: 'none'
  }
};

const ArticleContext = React.createContext<ContextType>(InitialContextValue);

export const useArticleContext = (): ContextType => React.useContext(ArticleContext);

const ArticleSpaceProvider: FC<PropsWithChildren> = ({children}) => {
  const isLogin = useAppStore(state => state.isLogin);
  const queryClient = useQueryClient();


  const {id, code} = useParams();
  const [userActions, setUserActions] = useState<{ isSaved: boolean, rate: RateVariants }>({
    isSaved: false,
    rate: 'none'
  });

  const articleAccessor = useQuery<IArticleResponse, ApiError>(['article', id], () => getArticle(id!));
  const localizationAccessor = useQuery<IArticleLocalizationResponse, ApiError>(['articleLocalization', id, code], () => getLocalization(id!, code!),
    {
      onSuccess: async () => {
        if (isLogin) {
          setUserActions(await getArticleActions(id!, code!))
        }
      }
    });


  const setArticle = (article: IArticleResponse) => queryClient.setQueryData(['article', id], article);

  const value: ContextType = React.useMemo(
    () => ({
      articleAccessor,
      setArticle,
      localizationAccessor,
      userActions
    }),
    [articleAccessor, setArticle, localizationAccessor, userActions]
  );

  return (
    <ArticleContext.Provider value={value}>
      {children}
    </ArticleContext.Provider>
  );
};

export default ArticleSpaceProvider;