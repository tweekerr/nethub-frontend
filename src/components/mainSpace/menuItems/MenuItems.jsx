import React from 'react';
import TitleWithPoints from "./TitleWithPoints";
import classes from "./MenuItems.module.css"

const AMOUNT_OF_ITEMS = 3;

const MenuItems = () => {
    const menuItemsKeys = [{
        svgId: "TerrainIcon",
        pId: "Onhovered item"
    }, {
        svgId: "TerrainIcon",
        pId: "PhotosIcon"
    }, {
        svgId: "TerrainIcon",
        pId: "Good item"
    }, {
        svgId: "TerrainIcon",
        pId: "Onhovered item"
    }, {
        svgId: "TerrainIcon",
        pId: "PhotosIcon"
    }, {
        svgId: "TerrainIcon",
        pId: "Good item"
    }, {
        svgId: "TerrainIcon",
        pId: "Onhovered item"
    }, {
        svgId: "TerrainIcon",
        pId: "PhotosIcon"
    }, {
        svgId: "TerrainIcon",
        pId: "Good item"
    }]

    return (
        <div className={classes.menuItems}>
            {Array.from({length: Math.round(menuItemsKeys.length / AMOUNT_OF_ITEMS)}).map((_, i) => {
                return <TitleWithPoints
                    key={i} menuItemsKeys={menuItemsKeys.slice(i * AMOUNT_OF_ITEMS, i * AMOUNT_OF_ITEMS + AMOUNT_OF_ITEMS)}/>
            })}

        </div>
    );
};

export default MenuItems;