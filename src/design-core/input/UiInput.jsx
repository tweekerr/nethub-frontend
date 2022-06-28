import React, {useState} from 'react';
import classes from '../uiComps.module.css'

const UiInput = ({children, ...props}) => {
    const [tags, setTags] = useState([]);
    return (
        <input className={classes.input} placeholder={props.placeholder} type="text">{children}</input>
    );
};

export default UiInput;
