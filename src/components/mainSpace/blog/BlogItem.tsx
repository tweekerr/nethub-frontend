import React, {FC} from 'react';
import PublicBasis from "../../basisComps/PublicBasis/PublicBasis";
import classes from "./BlogSpace.module.scss"
import RateCounter from "../../basisComps/RateCounter";
import FuncButtons from "../../basisComps/FuncButtons";
import moment from "moment";


interface IBlogItemProps {
  itemTitle: string,
  itemDescription: string,
  createdTime: Date
}

const BlogItem: FC<IBlogItemProps> = ({itemTitle, itemDescription, createdTime}) => {

  const myTime = moment.utc(createdTime).local().startOf('seconds').fromNow();

  return (
    <div className={classes.BlogItem}>
      <PublicBasis title={itemTitle} description={itemDescription} timeAgo={myTime}/>
      <div className={classes.downFuncItems}>
        <RateCounter/>
        <FuncButtons/>
      </div>
    </div>
  );
};

export default BlogItem;
