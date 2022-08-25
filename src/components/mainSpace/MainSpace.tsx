import React, {FC} from 'react';
import BlogSpace from './blog/BlogSpace';
import classes from './MainSpace.module.scss';
import NewsSpace from './news/NewsSpace';
import Layout from '../Layout/Layout';

const MainSpace = () => {
  return (
      <Layout>
        <div className={classes.mainSpaceContainer}>
          <BlogSpace/>
          <NewsSpace/>
        </div>
      </Layout>
  );
};

export default MainSpace;
