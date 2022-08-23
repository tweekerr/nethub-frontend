import React, {FC} from 'react';
import ArticleSettingsItem from './ArticleSettingsItem';
import classes from './ArticleCreating.module.scss';
import SettingsInputItem from './SettingsInputItem';
import UiButton from '../UI/button/UiButton';
import {useAppSelector} from "../../store";

const ArticleSettings: FC = () => {
  const articleStoreSelector = useAppSelector(state => state.articleReducer)

  const articleSending = (e: React.MouseEvent) => {
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
