import React, {FC, PropsWithChildren, useState} from 'react';
import classes from '../UiComps.module.scss'

interface IUiInputProps extends PropsWithChildren {
  placeholder: string
}

const UiInput: FC<IUiInputProps> = ({children, placeholder}) => {
  return (
    <input className={classes.input} placeholder={placeholder} type="text">{children}</input>
  );
};

export default UiInput;
