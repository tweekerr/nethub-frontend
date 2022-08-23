import React, {FC} from 'react';
import MainArticleParams from "./MainArticleParams";
import classes from "./ArticleCreating.module.scss"

const CreateArticle: FC = () => {
    return (
        <div className={classes.createArticle}>
            <h2 className={'nonCopyrable'}>Створення статті</h2>
            <MainArticleParams titleParams={"Загальні налаштування"}/>
            <MainArticleParams titleParams={"Локалізація країни"}/>
        </div>
    );
};

export default CreateArticle;
