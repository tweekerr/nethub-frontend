import React, {FC} from 'react';
import classes from './ArticleCreating.module.sass';
import ArticleTagsSettings from "./ArticleTagsSettings";
import TitleInput from "../../UI/TitleInput/TitleInput";
import ILocalization, {IArticleFormErrors} from "../../../types/ILocalization";
import ArticleImagesSettings from "./ArticleImagesSettings";
import {ArticleStorage} from "../../../utils/localStorageProvider";
import FilledDiv from '../../UI/FilledDiv';
import {Button} from "@chakra-ui/react";

interface IArticleSettingsProps {
  article: ILocalization,
  setArticle: (article: ILocalization) => void,
  createArticle: () => Promise<void>,
  errors: IArticleFormErrors,
  setError: (flag: boolean) => void;
  images: string[]
}

const ArticleSettings: FC<IArticleSettingsProps> = ({article, setArticle, createArticle, errors, setError, images}) => {

  const handleSetLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArticle({...article, originalLink: event.target.value});
    ArticleStorage.setLink(event.target.value);
  }
  const handleSetTags = (tag: string) => {
    const allTags = [...article.tags, tag];
    setArticle({...article, tags: allTags});
    ArticleStorage.setTags(JSON.stringify(allTags));
  }
  const handleDeleteTag = (tag: string) => {
    const filteredTags = article.tags.filter(t => t !== tag);
    setArticle({...article, tags: filteredTags});
    ArticleStorage.setTags(JSON.stringify(filteredTags));
  }

  return (
    <div className={classes.articleSettings}>
      <FilledDiv>
        <p className={classes.title}>Теги по темам</p>
        <ArticleTagsSettings
          tags={article.tags}
          addToAllTags={handleSetTags}
          deleteTag={handleDeleteTag}
          error={errors.tags}
          setError={setError}
        />
        <p className={classes.specification}>*натисність на тег, для його видалення</p>
      </FilledDiv>
      <FilledDiv className={classes.settingsItem}>
        <TitleInput
          isInvalid={errors.originalLink}
          value={article.originalLink}
          onChange={handleSetLink}
          title={"Посилання на оригінал "}
          placeholder={"Посилання на статтю"}
          width={"100%"}/>
        <p style={{marginTop: '-10px'}} className={classes.specification}>*якщо стаття переведена, вкажіть посилання на
          оригінал</p>
      </FilledDiv>
      {images.length > 0 &&
        <FilledDiv className={classes.settingsItem}>
          <p className={classes.title}>Пропоновані зображення</p>
          <ArticleImagesSettings images={images}/>
          <p className={classes.specification}>*натисність, щоб скопіювати посилання на фото</p>
        </FilledDiv>
      }
      <Button onClick={createArticle}>Створити статтю</Button>
    </div>
  );
};

export default ArticleSettings;
