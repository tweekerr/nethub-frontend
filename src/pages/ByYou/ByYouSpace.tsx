import React from 'react';
import Layout from "../../components/Layout/Layout";
import {ILibraryItem} from "../../components/Library/UserLibrary";
import SavedArticles from "../../components/Article/Saved/SavedArticles";
import ArticlesThreadSpace from "../Articles/Thread/ArticlesThreadSpace";

const ByYouSpace = () => {
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
    <Layout>
      {/*<UserLibrary items={items} title={<p>Hello World!</p>}>*/}

      {/*</UserLibrary>*/}
    </Layout>
  );
};

export default ByYouSpace;
