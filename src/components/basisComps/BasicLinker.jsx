import React from 'react';
import SvgSelector from './SvgSelector/SvgSelector';
import classes from './ВasicComps.module.scss';
import { Typography } from '@mui/material';

//TODO: TO TSX

const BasicLinker = ({ ...props }) => {
  return (
    <a href={'#'} {...props} className={classes.basicLink}>
      <Typography color={'primary'}>{props.linktxt}</Typography>
      <SvgSelector id={props.svgid} />
    </a>
  );
};

export default BasicLinker;
