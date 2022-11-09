import React from 'react';
import UserLibrary, {ILibraryItem} from "../../components/Library/UserLibrary";
import SvgSelector from "../../components/basisComps/SvgSelector/SvgSelector";
import Layout from "../../components/Layout/Layout";
import SavedArticles from "../../components/Article/Saved/SavedArticles";
import ArticlesThreadSpace from "../Articles/Thread/ArticlesThreadSpace";
import cl from './SavedSpace.module.sass';
import {Text} from "@chakra-ui/react";

const SavedSpace = () => {

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
    <Layout
      title={<Text
        as={'h2'}
        fontWeight={700}
        display={'flex'}
        alignItems={'center'}
      >
        Збережено вами
        <SvgSelector id={'SavedOutlinedFilled'} className={cl.titleIcon}/>
      </Text>}
    >
      <UserLibrary
        items={items}
        radioGroupConfig={{
          name: 'saved',
          defaultValue: 'Статті',
        }}
      />
    </Layout>
  );
};

export default SavedSpace;
