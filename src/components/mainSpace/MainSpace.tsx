import React, {FC} from 'react';
import BlogSpace from './blog/BlogSpace';
import classes from './MainSpace.module.scss';
import NewsSpace from './news/NewsSpace';
import Layout from '../Layout/Layout';

const MainSpace = () => {
  return (
    <Layout rightBar={<NewsSpace/>}>
      <BlogSpace/>
    </Layout>
  );
};

export default MainSpace;
