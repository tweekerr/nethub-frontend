import React, {useState} from 'react';
import MenuItems from "../mainSpace/menuItems/MenuItems";
import classes from './ArticleCreating.module.scss'
import CreateArticle from "./CreateArticle";
import ArticleSettings from "./ArticleSettings";

const ArticleCreatingSpace = () => {
    // let [article, setArticle] = useState({
    //     title:"",
    //     subTitle:"",
    //     mainTxt:"",
    //     tags:[],
    //     originalLink:""
    // })

    return (
        <div className="mainContainer">
            <div className={classes.articleCreatingSpace}>
                <MenuItems/>
                <CreateArticle/>
                <ArticleSettings/>

            </div>

        </div>
    );
};

export default ArticleCreatingSpace;