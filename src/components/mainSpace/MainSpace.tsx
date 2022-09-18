import React from 'react';
import BlogSpace from './blog/BlogSpace';
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
