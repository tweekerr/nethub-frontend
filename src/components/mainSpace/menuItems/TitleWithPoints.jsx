import React from 'react';
import SvgSelector from "../../basisComps/SvgSelector/SvgSelector";
import classes from "./MenuItems.module.css"



const TitleWithPoints = ({whichIsActive, menuItemsKeys}) => {

    return (
        <div className={classes.menuPointContainer}>
            <p>menu items</p>
            {menuItemsKeys.map(({svgid, pId}) => {
                return (<div key={pId} className={classes.menuPoint}>
                    <SvgSelector id={svgid}/>
                    <p>{pId}</p>
                </div>)
            })
            }
        </div>
    );
};

export default TitleWithPoints;
