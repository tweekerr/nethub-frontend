import React, {FC, useState} from 'react';
import classes from './ArticleCreating.module.scss';
import UiButton from '../UI/button/UiButton';
import {useAppDispatch, useAppSelector} from "../../store";
import ArticleTagsSettings from "./ArticleTagsSettings";
import {createArticleSlice} from "../../store/createArticleSlice";
import TitleInput from "../basisComps/titleInput/TitleInput";
import IArticle from "../../types/IArticle";

interface IArticleSettingsProps {
  article: IArticle,
  setArticle: (article: IArticle) => void
}

const ArticleSettings: FC<IArticleSettingsProps> = ({article, setArticle}) => {

    const handleSetLink = (link: string) => setArticle({...article, originalLink: link});
    const handleSetTags = (tag: string) => setArticle({...article, tags: [...article.tags, tag]});
    const handleDeleteTag = (tag: string) => setArticle({...article, tags: article.tags.filter(t => t !== tag)});

    const articleSending = (e: React.MouseEvent) => {
      e.preventDefault()
      console.log(article)
      //TODO: axios request to BACK
    }

    return (
      <div className={classes.articleSettings}>
        <p className={'nonCopyrable'}>Налаштування</p>
        <div className={classes.articleSettingsItem}>
          <p>Теги по темам</p>
          <ArticleTagsSettings
            tags={article.tags}
            addToAllTags={handleSetTags}
            deleteTag={handleDeleteTag}
          />
        </div>
        <div className={classes.settingsInputItem}>
          <TitleInput
            value={article.originalLink}
            setValue={handleSetLink}
            title={"Посилання на оригінал "}
            placeholder={"Посилання на статтю"}
            width={"100%"}/>
          <p>*якщо стаття переведена, вкажіть посилання на оригінал</p>
        </div>
        <UiButton onClick={articleSending}>Створити статтю</UiButton>
      </div>
    );
  }
;

export default ArticleSettings;
