import React from 'react';
import ArticleBody from "../../../components/Article/One/Body/ArticleBody";
import CommentsWidget from "../../../components/Shared/CommentsWidget";
import ArticleInfo from "../../../components/Article/One/ArticleInfo";
import {useParams} from "react-router-dom";
import ArticleBodySkeleton from "../../../components/Article/One/Body/ArticleBodySkeleton";
import {Box, Skeleton} from "@chakra-ui/react";
import {ApiError} from "../../../types/ApiError";
import {LFC2} from "../../../components/Layout/LFC";
import ArticleSpaceProvider, {useArticleContext} from "./ArticleSpace.Provider";

const ArticleSpace: LFC2 = () => {
  const {articleAccessor, localizationAccessor} = useArticleContext();
  const {id, code} = useParams();

  const processError = (e: ApiError | Error) => {
    if (localizationAccessor.isError) {

      switch (localizationAccessor.error.statusCode) {
        case 404:
          return 'Дана стаття ще пишеться :)';
        case 403:
          return 'Ви повинні бути вкладником, щоб мати доступ до цієї статті'
        default:
          return e.message;
      }
    }

    return e.message
  }

  return {
    Center: {
      Render: <Box width={'100%'} display={'flex'} flexDirection={'column'}>
        {
          (!localizationAccessor.isSuccess || !articleAccessor.isSuccess)
            ? <ArticleBodySkeleton/>
            : <ArticleBody/>
        }
        {<CommentsWidget display={!(localizationAccessor.isLoading || articleAccessor.isLoading)} deps={[id, code]}/>}
      </Box>,
      config: {
        error: {
          show: true,
          processError
        }
      }
    },
    Right: {
      render: (!localizationAccessor.isSuccess || !articleAccessor.isSuccess)
        ? <Skeleton height={200}/>
        : <ArticleInfo/>,
      config: {error: {show: true, customMessage: 'Custom test'}}
    },
    ContextProvider: ArticleSpaceProvider
  }
};
export default ArticleSpace;
