import React, {FC, useState} from 'react';
import classes from './ArticleCreating.module.scss';
import UiButton from '../UI/button/UiButton';
import {useAppDispatch, useAppSelector} from "../../store";
import FixedTags from "./FixedTags";
import {createArticleSlice} from "../../store/createArticleSlice";
import TitleInput from "../basisComps/titleInput/TitleInput";

const ArticleSettings: FC = () => {
  // const [article, setArticle] = userState

  const articleStoreSelector = useAppSelector(state => state.articleReducer)

  const [tagsValue, setTagsValue] = useState("")
  const dispatch = useAppDispatch();

  const [linkValue, setLinkValue] = useState("")

  const articleSending = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log(articleStoreSelector)
    //TODO: axios request to BACK
  }

  return (
    <div className={classes.articleSettings}>
      <p className={'nonCopyrable'}>Налаштування</p>
      <div className={classes.articleSettingsItem}>
        <p>Теги по темам</p>
        <FixedTags
          tag={tagsValue}
          setTag={(tags: string) => {
            dispatch(createArticleSlice.actions.updateTags(tags))
          }}
        />
      </div>
      <div className={classes.settingsInputItem}>
        <TitleInput
          value={linkValue}
          setValue={(link: string) => {
            dispatch(createArticleSlice.actions.updateOriginalLink(link))
          }}
          title={"Посилання на оригінал "}
          placeholder={"Посилання на статтю"}
          width={"100%"}/>
        <p>*якщо стаття переведена, вкажіть посилання на оригінал</p>
      </div>
      <UiButton onClick={articleSending}>Створити статтю</UiButton>
    </div>
  );
};

export default ArticleSettings;
