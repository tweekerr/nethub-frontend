import {Typography} from '@mui/material';
import React, {FC} from 'react';
import SvgSelector from '../../basisComps/SvgSelector/SvgSelector';
import classes from './Menu.module.sass';
import {IMenuItem} from "./MenuData";
import {useNavigate} from "react-router-dom";

interface IMenuGroupProps {
  groupName?: string,
  menuItems: IMenuItem[]
}

const MenuGroup: FC<IMenuGroupProps> = ({groupName, menuItems}) => {
  const navigate = useNavigate();

  return (
    <ul className={classes.menuPointContainer}>
      {groupName && <p>{groupName}</p>}
      {menuItems.map(menuItem =>
        <li
          key={menuItem.itemName}
          className={`${classes.menuPoint} ${
            window.location.pathname === menuItem.link ? classes.menuPointActive : ''
          } ${menuItem.isActive ? '' : classes.disabled}`}
          onClick={() => menuItem.isActive && navigate(menuItem.link)}
        >
          <SvgSelector id={menuItem.svgId}/>
          <Typography color={'primary'}>{menuItem.itemName}</Typography>
        </li>
      )}
    </ul>
  );
};

export default MenuGroup;
