import React from 'react';
import classes from "./PublicBasis.module.css"

const PublicBasis = ({title,description, timeAgo}) => {
    return (
        <a href="#" className ={classes.titleWithDescription}>

            <div className={classes.titleTime}>
                <h2 className={classes.publicTitle}>{title}</h2>
                <p className={classes.timeAgo}>{timeAgo}</p>
            </div>
            <p className={classes.publicDes}>{description}</p>
        </a>
    );
};

export default PublicBasis;