import React, { useEffect } from 'react';
import classes from './blogSpace.module.css';
import BlogItem from './BlogItem';
import { useState } from 'react';
import { api } from '../../../api';

const BlogSpace = () => {
  const [blogItems, setBlogItems] = useState([]);

  useEffect(() => {
    // api.getArticles().then((res) => {
    //   setBlogItems(res);
    // });
  }, []);

  //TODO: тут створити стор для блогу(редакс)
  return (
    <div className={classes.blogSpace}>
      <h2>Blog</h2>
      {blogItems.map((item) => (
        <BlogItem
          itemTitle={item.localizations[0].title}
          itemDescription={item.localizations[0].description}
          createdTime={item.created}
        />
      ))}
    </div>
  );
};

export default BlogSpace;
