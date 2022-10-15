import React, {FC} from 'react';
import ShortItem from "../../basisComps/PublicBasis/ShortItem";
import classes from "./NewsSpace.module.scss"

interface INewsItemProps {
  title: string,
  description: string
}

const NewsItem: FC<INewsItemProps> = ({title, description}) => {
  return (
    <div className={classes.newsItem}>
      <ShortItem title={title} description={description}/>
      <div className={classes.tagsSpace}>
      </div>
    </div>
  );
};

export default NewsItem;
