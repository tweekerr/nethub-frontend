import React, {FC} from 'react';
import classes from './ArticleCreating.module.sass';
import UiButton from '../UI/button/UiButton';
import ArticleTagsSettings from "./ArticleTagsSettings";
import TitleInput from "../basisComps/titleInput/TitleInput";
import IArticle, {IArticleFormErrors} from "../../types/IArticle";
import {StyledDiv} from '../UI/styled';
import ArticleImagesSettings from "./ArticleImagesSettings";

interface IArticleSettingsProps {
  article: IArticle,
  setArticle: (article: IArticle) => void,
  createArticle: (e: React.MouseEvent) => void
  errors: IArticleFormErrors,
  setErrors: (key: keyof IArticleFormErrors, flag: boolean) => void
}

const ArticleSettings: FC<IArticleSettingsProps> = ({article, setArticle, createArticle, errors, setErrors}) => {

  const handleSetLink = (link: string) => setArticle({...article, originalLink: link});
  const handleSetTags = (tag: string) => setArticle({...article, tags: [...article.tags, tag]});
  const handleDeleteTag = (tag: string) => setArticle({...article, tags: article.tags.filter(t => t !== tag)});


  return (
    <div className={classes.articleSettings}>
      <p className={'nonCopyrable'}>Налаштування</p>
      <StyledDiv className={classes.settingsItem}>
        <p className={classes.title}>Теги по темам</p>
        <ArticleTagsSettings
          tags={article.tags}
          addToAllTags={handleSetTags}
          deleteTag={handleDeleteTag}
          errors={errors}
          setErrors={setErrors}
        />
        <p className={classes.specification}>*натисність на тег, для його видалення</p>
      </StyledDiv>
      <StyledDiv className={classes.settingsItem}>
        <TitleInput
          error={errors.originalLink}
          value={article.originalLink}
          setValue={handleSetLink}
          title={"Посилання на оригінал "}
          placeholder={"Посилання на статтю"}
          width={"100%"}/>
        <p style={{marginTop: '-10px'}} className={classes.specification}>*якщо стаття переведена, вкажіть посилання на
          оригінал</p>
      </StyledDiv>
      <StyledDiv className={classes.settingsItem}>
        <p className={classes.title}>Пропоновані зображення</p>
        <ArticleImagesSettings/>
        <p className={classes.specification}>*натисність, щоб скопіювати посилання на фото</p>
      </StyledDiv>
      <UiButton onClick={createArticle}>Створити статтю</UiButton>
    </div>
  );
};

export default ArticleSettings;
