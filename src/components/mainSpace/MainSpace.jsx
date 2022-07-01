import React from 'react';
import MenuItems from "./menuItems/MenuItems";
import BlogSpace from "./blog/BlogSpace"
import styles from "../../index.scss"
import classes from "./MainSpace.module.scss"
import NewsSpace from "./news/NewsSpace";
import Layout from "../../layout/Layout";

const MainSpace = () => {

    return (
        <div>
            <Layout>
                <div className={classes.mainSpaceContainer}>
                    <BlogSpace/>
                    <NewsSpace/>
                </div>
            </Layout>

        </div>
    );
};

export default MainSpace;
