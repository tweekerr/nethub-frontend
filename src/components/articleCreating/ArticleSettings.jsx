import React from 'react';
import ArticleSettingsItem from './ArticleSettingsItem';
import classes from './ArticleCreating.module.scss';
import SettingsInputItem from './SettingsInputItem';
import UiButton from '../../design-core/button/UiButton';
import {useSelector} from 'react-redux';

const ArticleSettings = () => {

    const articleStoreSelector = useSelector(state=> state.articleReducer)

    const axiosRequestFunc = ()=>{
        console.log('REQUEST')
    }

    const createArtValidation = (object) =>{
        let isValid = false;

        for (const [key, value] of object){
            if (key!=="originalLink" && !value){
                isValid = false;
                return alert(`Please, confirm the ${key} value`)
            }else if (key==="tags" && value.length===0){
                isValid = false;
                return alert(`Please, confirm at list 1 tag`)
            }else{
                isValid = true;
                console.log(key, ": ", value)
            }
        }
        return isValid;
    }

    const articleSending = (e) =>{
        e.preventDefault()
        const articleEntries = Object.entries(articleStoreSelector)

        if (createArtValidation(articleEntries)){
            axiosRequestFunc()
        }
        // console.log(articleStoreSelector)
        // console.log(articleStoreSelector.tags)
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
