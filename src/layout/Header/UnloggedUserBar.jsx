import React from 'react';
import { Link } from 'react-router-dom';
import SvgSelector from '../../components/basisComps/SvgSelector/SvgSelector';
import classes from './Header.module.css';

const UnloggedUserBar = () => {
  return (
    <div className={classes.loggingLinks}>
      <SvgSelector id="PersonOutlineOutlinedIcon" />
      <Link to="/login">Sign up / Login</Link>
    </div>
  );
};

export default UnloggedUserBar;
