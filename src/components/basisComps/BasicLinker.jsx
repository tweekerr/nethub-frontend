import React from 'react';
import SvgSelector from "./SvgSelector/SvgSelector";
import classes from "./basicComps.module.scss"

const BasicLinker = ({...props}) => {
    return (
        <a href={"#"} {...props} className={classes.basicLink}>
            <p>{props.linktxt}</p>
            <SvgSelector id={props.svgid}/>
        </a>

    );
};

export default BasicLinker;
