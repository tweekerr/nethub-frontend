import React from 'react';
import {Skeleton} from "@mui/material";
import cl from '../ArticleSpace.module.sass'

const ArticleBodySkeleton = () => {
  return (
    <div className={cl.articleBodySkeleton}>
      <Skeleton variant='rounded' height={300} width={'100%'}/>
      <Skeleton variant='rounded' height={300} width={'100%'}/>
    </div>
  );
};

export default ArticleBodySkeleton;
