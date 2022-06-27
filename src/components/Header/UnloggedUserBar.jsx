import React from 'react';
import SvgSelector from "../basisComps/SvgSelector/SvgSelector";
import classes from "./Header.module.css"

const UnloggedUserBar = () => {
    return (
        <div className={classes.loggingLinks}>
            <SvgSelector id="PersonOutlineOutlinedIcon"/>
            <a href="">Sign up</a>
            <p>/</p>
            <a href="">Login</a>
        </div>
    );
};

export default UnloggedUserBar;
