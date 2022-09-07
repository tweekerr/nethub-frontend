import React, {FC, useEffect} from 'react';
import BlogSpace from './blog/BlogSpace';
import classes from './MainSpace.module.scss';
import NewsSpace from './news/NewsSpace';
import Layout from '../Layout/Layout';
import {useActions} from "../../utils";

const MainSpace = () => {
  return (
    <Layout rightBar={<NewsSpace/>}>
      <BlogSpace/>
    </Layout>
  );
};

export default MainSpace;
