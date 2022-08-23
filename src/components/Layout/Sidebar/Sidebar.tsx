import React from 'react';
import TitleWithPoints from './TitleWithPoints';
import classes from './Sidebar.module.scss';
import {menuItemsKeys} from "./SidebarData";

const AMOUNT_OF_ITEMS = 3;

const Sidebar = () => {
  // TODO: must be removed to constants

  return (
    <div className={classes.menuItems}>
      {Array.from({
        length: Math.round(menuItemsKeys.length / AMOUNT_OF_ITEMS),
      }).map((_, i) => {
        return (
          <TitleWithPoints
            // whichIsActive={activeId}
            key={i}
            menuItemsKeys={menuItemsKeys.slice(
              i * AMOUNT_OF_ITEMS,
              i * AMOUNT_OF_ITEMS + AMOUNT_OF_ITEMS
            )}
          />
        );
      })}
    </div>
  );
};

export default Sidebar;
