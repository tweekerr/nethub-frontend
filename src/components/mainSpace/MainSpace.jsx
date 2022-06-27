import React from 'react';
import MenuItems from "./menuItems/MenuItems";
import BlogSpace from "./blog/BlogSpace"
import styles from "../../index.scss"
import classes from "./MainSpace.module.scss"
import NewsSpace from "./news/NewsSpace";

const MainSpace = () => {

    return (
        <div>
            <div className="mainContainer" >
                <div className={classes.mainSpaceContainer}>
                    <MenuItems/>
                    <BlogSpace/>
                    <NewsSpace/>
                </div>

            </div>
        </div>
    );
};

export default MainSpace;
