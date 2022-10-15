import React from 'react';
import UserLibrary, {ILibraryItem} from "../../components/Library/UserLibrary";
import {Typography} from "@mui/material";
import SvgSelector from "../../components/basisComps/SvgSelector/SvgSelector";
import Layout from "../../components/Layout/Layout";
import SavedArticles from "../../components/Article/Saved/SavedArticles";
import ArticlesThreadSpace from "../Articles/Thread/ArticlesThreadSpace";
import cl from './SavedSpace.module.sass';

const SavedSpace = () => {
  const titles = {
    center: <Typography
      mb={2}
      display={'initial'}
      color={'secondary.contrastText'}
      fontWeight={700}
      variant="h4"
      sx={{margin: 0}}
    >
      Збережено вами {''}
      <SvgSelector id={'SavedOutlinedFilled'} className={cl.titleIcon}/>
    </Typography>
  }


  const items: ILibraryItem[] = [
    {
      name: 'Статті',
      component: <SavedArticles/>
    },
    {
      name: 'Блог',
      component: <ArticlesThreadSpace/>
    }
  ]

  return (
    <Layout titles={titles}>
      <UserLibrary
        items={items}/>
    </Layout>
  );
};

export default SavedSpace;
