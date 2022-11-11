import React, {FC} from 'react';
import classes from './ArticleCreating.module.sass'

interface IArticleImagesSettings {
  images: string[]
}

const ArticleImagesSettings: FC<IArticleImagesSettings> = ({images}) => {

  return (
    <div className={classes.images}>
      {images.map(src =>
        <img key={src} onClick={() => console.log(src)} src={src} alt={'damaged'}/>
      )}
    </div>
  );
};

export default ArticleImagesSettings;
