import React from 'react';
import classes from '../uiComps.module.css'

const UiButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.btnUi}>
            {children}
        </button>
    );
};

export default UiButton;