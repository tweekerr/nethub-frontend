import React from 'react';
import ArticleSettings from './ArticleSettings';
import Layout from "../Layout/Layout";
import CreateArticleForm from "./CreateArticleForm";

const ArticleCreatingSpace = () => {
  return (
    <Layout rightBar={<ArticleSettings/>}>
      <CreateArticleForm titleParams={"Загальні налаштування"}/>
    </Layout>
  );
};

export default ArticleCreatingSpace;
