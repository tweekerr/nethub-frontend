import React from 'react';
import {Skeleton} from "@mui/material";
import cl from './SavedArticles.module.sass'

const SavedArticlesSkeleton = () => {
  return (
    <>
      <Skeleton variant={'rounded'} height={150} className={cl.skeleton}/>
      <Skeleton variant={'rounded'} height={150} className={cl.skeleton}/>
      <Skeleton variant={'rounded'} height={150} className={cl.skeleton}/>
      <Skeleton variant={'rounded'} height={150} className={cl.skeleton}/>
    </>
  );
};

export default SavedArticlesSkeleton;
