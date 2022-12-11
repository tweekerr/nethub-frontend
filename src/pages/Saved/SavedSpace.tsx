import React from 'react';
import UserLibrary, {ILibraryItem} from "../../components/Library/UserLibrary";
import SvgSelector from "../../components/UI/SvgSelector/SvgSelector";
import SavedArticles from "../../components/Article/Saved/SavedArticles";
import cl from './SavedSpace.module.sass';
import {Text} from "@chakra-ui/react";
import SavedSpaceProvider, {useSavedArticlesContext} from "./SavedSpace.Provider";
import Layout, {Page} from "../../components/Layout/Layout";
import ErrorBlock from "../../components/Layout/ErrorBlock";
import {ErrorsHandler} from "../../utils/ErrorsHandler";

const SavedSpace: Page = () => {

  const {savedArticles} = useSavedArticlesContext();

  const items: ILibraryItem[] = [
    {
      name: 'Статті',
      component:
        savedArticles.isError
          ? <ErrorBlock>{ErrorsHandler.default(savedArticles.error.statusCode)}</ErrorBlock>
          : <SavedArticles/>
    }
  ]

  const titles = {
    Center: <Text
      as={'h2'}
      fontWeight={700}
      display={'flex'}
      alignItems={'center'}
    >
      Збережено вами
      <SvgSelector id={'SavedOutlinedFilled'} className={cl.titleIcon}/>
    </Text>
  }

  return <Layout Titles={titles}>
    <UserLibrary
      items={items}
      radioGroupConfig={{
        name: 'saved',
        defaultValue: 'Статті',
      }}
    />
  </Layout>
};

SavedSpace.Provider = SavedSpaceProvider;

export default SavedSpace;
