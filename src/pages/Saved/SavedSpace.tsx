import React from 'react';
import UserLibrary, {ILibraryItem} from "../../components/Library/UserLibrary";
import SvgSelector from "../../components/UI/SvgSelector/SvgSelector";
import SavedArticles from "../../components/Article/Saved/SavedArticles";
import ArticlesThreadSpace from "../Articles/Thread/ArticlesThreadSpace";
import cl from './SavedSpace.module.sass';
import {Text} from "@chakra-ui/react";
import {LFC2} from "../../components/Layout/LFC";
import SavedSpaceProvider from "./SavedSpace.Provider";

const SavedSpace: LFC2 = () => {

  const items: ILibraryItem[] = [
    {
      name: 'Статті',
      component: <SavedArticles/>
    }
  ]

  return {
    Center: {
      Render: <UserLibrary
        items={items}
        radioGroupConfig={{
          name: 'saved',
          defaultValue: 'Статті',
        }}
      />,
      title: <Text
        as={'h2'}
        fontWeight={700}
        display={'flex'}
        alignItems={'center'}
      >
        Збережено вами
        <SvgSelector id={'SavedOutlinedFilled'} className={cl.titleIcon}/>
      </Text>
    },
    ContextProvider: SavedSpaceProvider
  }
};

export default SavedSpace;
