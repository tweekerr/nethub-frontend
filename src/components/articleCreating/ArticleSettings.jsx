import React from 'react';
import ArticleSettingsItem from './ArticleSettingsItem';
import classes from './ArticleCreating.module.scss';
import SettingsInputItem from './SettingsInputItem';
import UiButton from '../../design-core/button/UiButton';
import {useSelector} from 'react-redux';
import styles from '../../index.scss'

const ArticleSettings = () => {
    // const newArticle = useSelector((state) => state.articleReducer);
    const articleStoreSelector = useSelector(state=> state.articleReducer)

    const articleSending = (e) =>{
        e.preventDefault()
        console.log(articleStoreSelector)
        //TODO: axios request to BACK
    }

    return (
        <div className={classes.articleSettings}>
            <p className={'nonCopyrable'}>Налаштування</p>
            <ArticleSettingsItem/>
            <SettingsInputItem/>
            <UiButton onClick={articleSending}>Створити статтю</UiButton>
        </div>
    );
};

export default ArticleSettings;
