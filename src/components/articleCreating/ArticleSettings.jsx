import React from 'react';
import ArticleSettingsItem from './ArticleSettingsItem';
import classes from './ArticleCreating.module.scss';
import SettingsInputItem from './SettingsInputItem';
import UiButton from '../../design-core/button/UiButton';

const ArticleSettings = () => {
  const articleSending = (e) => {
    e.preventDefault();
    //TODO: axios request to BACK
  };

  return (
    <div className={classes.articleSettings}>
      <p className={'nonCopyrable'}>Налаштування</p>
      <ArticleSettingsItem />
      <SettingsInputItem />
      <UiButton onClick={articleSending}>Створити статтю</UiButton>
    </div>
  );
};

export default ArticleSettings;
