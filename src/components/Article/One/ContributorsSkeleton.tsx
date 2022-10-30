import React from 'react';
import {Skeleton} from "@mui/material";
import cl from './ArticleSpace.module.sass'

const ContributorsSkeleton = () => {
  return (
    <div className={cl.contributorsSkeleton}>
      <Skeleton variant={'rounded'} width={150} height={42}/>
      <Skeleton variant={'rounded'} width={150} height={42}/>
    </div>
  );
};

export default ContributorsSkeleton;
