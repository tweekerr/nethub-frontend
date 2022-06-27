import React from 'react';
import classes from "./basicComps.module.scss"

const ThemeTag = ({tagLink, tagName}) => {
    return (
        <a href="`taglink`" className={classes.themeTag}>
            #{tagName}
        </a>
    );
};

export default ThemeTag;
