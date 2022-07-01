import React from 'react';
import BasicInput from '../BasicInput/BasicInput';
import classes from '../basicComps.module.scss';

const TitleInput = (props) => {
  return (
    <div className={classes.titleInput}>
      <p>{props.titleToInput}</p>
      <BasicInput {...props} />
    </div>
  );
};

export default TitleInput;