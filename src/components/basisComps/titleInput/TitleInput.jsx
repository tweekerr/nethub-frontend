import React from 'react';
import BasicInput from '../BasicInput/BasicInput';
import classes from '../ВasicComps.module.scss';

//TODO: TO TSX

const TitleInput = (props) => {
  return (
    <div className={classes.titleInput}>
      <p>{props.titleToInput}</p>
      <BasicInput {...props} />
    </div>
  );
};

export default TitleInput;
