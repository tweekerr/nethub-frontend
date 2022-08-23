import React, {useEffect, useState} from 'react';
import classes from './BlogSpace.module.scss';
import BlogItem from './BlogItem';

//TODO: TO TSX

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
      {blogItems.map((item, index) => (
        <BlogItem
          key={index}
          itemTitle={item.localizations[0].title}
          itemDescription={item.localizations[0].description}
          createdTime={item.created}
        />
      ))}
    </div>
  );
};

export default BlogSpace;
