import React from 'react';
import MainArticleParams from "./MainArticleParams";
import classes from "./ArticleCreating.module.scss"
import ArticleSettings from "./ArticleSettings";

const CreateArticle = () => {
    return (
        <div className={classes.createArticle}>
            <h2 className={'nonCopyrable'}>Створення статті</h2>
            <MainArticleParams titleParams={"Загальні налаштування"}/>
            <MainArticleParams titleParams={"Локалізація країни"}/>
        </div>
    );
};

export default CreateArticle;
