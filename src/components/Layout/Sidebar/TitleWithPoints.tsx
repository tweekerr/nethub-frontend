import {Typography} from '@mui/material';
import React, {FC, useState} from 'react';
import SvgSelector from '../../basisComps/SvgSelector/SvgSelector';
import classes from './Sidebar.module.scss';

interface ITitleWithPointsProps {
  menuItemsKeys: any[]
}

const TitleWithPoints: FC<ITitleWithPointsProps> = ({menuItemsKeys}) => {
  return (
    <ul className={classes.menuPointContainer}>
      <p>menu items</p>
      {menuItemsKeys.map(({svgid, pId, link}) => {
        return (
          <li
            key={pId}
            className={`${classes.menuPoint} ${
              window.location.pathname === link ? classes.menuPointActive : ''
            }`}
            onClick={() => {
              window.location.pathname = link;
            }}
            id={window.location.pathname === link ? 'active' : ''}
          >
            <SvgSelector id={svgid}/>
            <Typography color={'primary'}>{pId}</Typography>
            {/*<p>{activeId}</p>*/}
          </li>
        );
      })}
    </ul>
  );
};

export default TitleWithPoints;
