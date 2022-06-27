import React from 'react';
import SvgSelector from "./SvgSelector/SvgSelector";
import classes from "./basicComps.module.scss"
import {Link} from "react-router-dom";

const BasicLinker = ({...props}) => {
    return (
        <a href={"#"} {...props} className={classes.basicLink}>
            <p>{props.linktxt}</p>
            <SvgSelector id={props.svgId}/>
        </a>

    );
};

export default BasicLinker;
