import React from 'react';
import TitleWithPoints from './TitleWithPoints';
import classes from './MenuItems.module.css';

const AMOUNT_OF_ITEMS = 3;

const MenuItems = () => {
  // TODO: must be removed to constsnts
  const menuItemsKeys = [
    {
      svgid: 'TerrainIcon',
      pId: 'Onhovered item',
    },
    {
      svgid: 'TerrainIcon',
      pId: 'PhotosIcon',
    },
    {
      svgid: 'TerrainIcon',
      pId: 'Good item',
    },
    {
      svgid: 'TerrainIcon',
      pId: 'Onhovered item',
    },
    {
      svgid: 'TerrainIcon',
      pId: 'PhotosIcon',
    },
    {
      svgid: 'TerrainIcon',
      pId: 'Good item',
    },
    {
      svgid: 'TerrainIcon',
      pId: 'Onhovered item',
    },
    {
      svgid: 'TerrainIcon',
      pId: 'PhotosIcon',
    },
    {
      svgid: 'TerrainIcon',
      pId: 'Good item',
    },
  ];

  return (
    <div className={classes.menuItems}>
      {Array.from({
        length: Math.round(menuItemsKeys.length / AMOUNT_OF_ITEMS),
      }).map((_, i) => {
        return (
          <TitleWithPoints
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

export default MenuItems;
