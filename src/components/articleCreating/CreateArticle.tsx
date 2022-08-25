import React, {FC} from 'react';
import CreateArticleForm from "./CreateArticleForm";
import classes from "./ArticleCreating.module.scss"

const CreateArticle: FC = () => {
    return (
        <div className={classes.createArticle}>
            <h2 className={'nonCopyrable'}>Створення статті</h2>
            <CreateArticleForm titleParams={"Загальні налаштування"}/>
        </div>
    );
};

export default CreateArticle;
