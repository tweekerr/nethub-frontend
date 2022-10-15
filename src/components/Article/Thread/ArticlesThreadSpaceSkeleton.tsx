import React from 'react';
import {Skeleton} from "@mui/material";
import cl from './ArticlesThreadSpace.module.sass'

const ArticlesThreadSpaceSkeleton = () => {
  return (
    <>
      <Skeleton variant={'rounded'} height={160} className={cl.skeleton}/>
      <Skeleton variant={'rounded'} height={160} className={cl.skeleton}/>
      <Skeleton variant={'rounded'} height={160} className={cl.skeleton}/>
      <Skeleton variant={'rounded'} height={160} className={cl.skeleton}/>
    </>
  );
};

export default ArticlesThreadSpaceSkeleton;
