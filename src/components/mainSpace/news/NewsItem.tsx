import React, {FC} from 'react';
import PublicBasis from "../../basisComps/PublicBasis/PublicBasis";
import classes from "./NewsSpace.module.scss"

interface INewsItemProps {
  title: string,
  description: string
}

const NewsItem: FC<INewsItemProps> = ({title, description}) => {
  return (
    <div className={classes.newsItem}>
      <PublicBasis title={title} description={description}/>
      <div className={classes.tagsSpace}>
      </div>
    </div>
  );
};

export default NewsItem;
