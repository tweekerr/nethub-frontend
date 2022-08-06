import React from 'react';
//@ts-ignore
import classes from './ArticleCreating.module.scss';
import CreateArticle from './CreateArticle';
import ArticleSettings from './ArticleSettings';
import Layout from '../../layout/Layout';

const ArticleCreatingSpace = () => {
  return (
    <Layout>
      <div className={classes.articleCreatingSpace}>
        <CreateArticle />
        <ArticleSettings />
      </div>
    </Layout>
  );
};

export default ArticleCreatingSpace;
