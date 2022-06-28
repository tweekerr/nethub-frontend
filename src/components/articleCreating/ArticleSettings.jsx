import React from 'react';
import ArticleSettingsItem from './ArticleSettingsItem';
import classes from './ArticleCreating.module.scss';
import TitleInput from '../basisComps/titleInput/TitleInput';
import SettingsInputItem from './SettingsInputItem';
import UiButton from '../../design-core/button/UiButton';
import { useSelector } from 'react-redux';

const ArticleSettings = () => {
  const newArticle = useSelector((state) => state.articleReducer);
  return (
    <div className={classes.articleSettings}>
      <p>Налаштування</p>
      <ArticleSettingsItem />
      <SettingsInputItem />
      <UiButton>Створити статтю</UiButton>
    </div>
  );
};

export default ArticleSettings;
