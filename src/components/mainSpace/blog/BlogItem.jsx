import React, {useEffect} from 'react';
import PublicBasis from "../../basisComps/PublicBasis/PublicBasis";
import classes from "./blogSpace.module.css"
import RateCounter from "../../basisComps/RateCounter";
import FuncBtns from "../../basisComps/FuncBtns";
import moment from "moment";



const BlogItem = ({itemTitle, itemDescription,createdTime}) => {

    const myTime =moment.utc(createdTime).local().startOf('seconds').fromNow();

    return (
        <div className={classes.BlogItem}>
            <PublicBasis title={itemTitle} description={itemDescription} timeAgo={myTime}/>
            <div className={classes.downFuncItems}>
                <RateCounter/>
                <FuncBtns/>
            </div>
        </div>
    );
};

export default BlogItem;