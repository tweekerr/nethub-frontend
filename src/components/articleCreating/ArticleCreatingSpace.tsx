import React from 'react';
import classes from './ArticleCreating.module.scss';
import CreateArticle from './CreateArticle';
import ArticleSettings from './ArticleSettings';
import Layout from "../Layout/Layout";

const ArticleCreatingSpace = () => {
  return (
    <Layout aside>
      <div className={classes.articleCreatingSpace}>
        <CreateArticle />
        <ArticleSettings />
      </div>
    </Layout>
  );
};

export default ArticleCreatingSpace;
