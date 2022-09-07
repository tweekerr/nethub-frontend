import React from 'react';
import classes from './ArticleCreating.module.sass'
import ClickImage from "../UI/ClickImage";

const ArticleImagesSettings = () => {
  const a0a = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg';

  return (
    <div className={classes.images}>
      <ClickImage src={a0a} onClick={() => {
        console.log(a0a)
      }}/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img
        src='https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
           alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
      <img src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' alt='damaged'/>
    </div>
  );
};

export default ArticleImagesSettings;
