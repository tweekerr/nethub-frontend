import {Box, Button, Skeleton} from '@chakra-ui/react';
import React from 'react';
import {useArticlesThreadContext} from "./ArticlesThreadSpace.Provider";

const ArticlesThreadSpaceSkeleton = () => {

  const {articlesAccessor, number, setNumber} = useArticlesThreadContext();

  console.log('4', articlesAccessor);


  return (
    <>

      <Skeleton height={160} mb={'15px'}/>
      <Skeleton height={160} mb={'15px'}/>
      <Skeleton height={160} mb={'15px'}/>
      <Skeleton height={160} mb={'15px'}/>
    </>
  );
};

export default ArticlesThreadSpaceSkeleton;
