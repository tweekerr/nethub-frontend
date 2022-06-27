import React from 'react';
import PublicBasis from "../../basisComps/PublicBasis/PublicBasis";
import ThemeTag from "../../basisComps/ThemeTag";
import classes from "./NewsSpace.module.scss"

const NewsItem = ({newsTitle,newsDescription}) => {
    return (
        <div className={classes.newsItem}>
            <PublicBasis title={newsTitle} description={newsDescription}/>
            <div className={classes.tagsSpace}>
            </div>
        </div>
    );
};

export default NewsItem;
