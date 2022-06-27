import React from 'react';
import SvgSelector from "./SvgSelector/SvgSelector";
import classes from "./basicComps.module.scss"

const FuncBtns = () => {
    return (
        <div className = {classes.funcBtns}>
            <button >
                <SvgSelector id={"ExternalLink"}/>
            </button>
            <button >
                <SvgSelector id = {"BookmarkBorderOutlined"}/>
            </button>
        </div>
    );
};

export default FuncBtns;
