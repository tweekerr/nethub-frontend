import React, {useState} from 'react';
import MenuItems from "../mainSpace/menuItems/MenuItems";
import classes from './ArticleCreating.module.scss'
import CreateArticle from "./CreateArticle";
import ArticleSettings from "./ArticleSettings";
import Layout from "../../layout/Layout";

const ArticleCreatingSpace = (props) => {
    // let [article, setArticle] = useState({
    //     title:"",
    //     subTitle:"",
    //     mainTxt:"",
    //     tags:[],
    //     originalLink:""
    // })
    return (
        <Layout >
            <div className={classes.articleCreatingSpace}>
                <CreateArticle/>
                <ArticleSettings/>
            </div>
        </Layout>

    );
};

export default ArticleCreatingSpace;