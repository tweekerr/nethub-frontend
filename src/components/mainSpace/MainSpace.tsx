import React, {FC} from 'react';
import BlogSpace from './blog/BlogSpace';
import classes from './MainSpace.module.scss';
import NewsSpace from './news/NewsSpace';
import Layout from '../Layout/Layout';

const MainSpace: FC = () => {
  return (
    <>
      <Layout aside>
        <div className={classes.mainSpaceContainer}>
          <BlogSpace/>
          <NewsSpace/>
        </div>
      </Layout>
    </>
  );
};

export default MainSpace;
