import React, {FC} from 'react';
import classes from './ArticleCreating.module.sass';
import UiButton from '../../UI/button/UiButton';
import ArticleTagsSettings from "./ArticleTagsSettings";
import TitleInput from "../../basisComps/titleInput/TitleInput";
import ILocalization, {IArticleFormErrors} from "../../../types/ILocalization";
import ArticleImagesSettings from "./ArticleImagesSettings";
import {ArticleStorage} from "../../../utils/localStorageProvider";
import { FilledDiv } from '../../basisComps/Basic.styled';

interface IArticleSettingsProps {
  article: ILocalization,
  setArticle: (article: ILocalization) => void,
  createArticle: () => Promise<void>,
  errors: IArticleFormErrors,
  setError: (flag: boolean) => void;
  images: string[]
}

const ArticleSettings: FC<IArticleSettingsProps> = ({article, setArticle, createArticle, errors, setError, images}) => {

  const handleSetLink = (link: string) => {
    setArticle({...article, originalLink: link});
    ArticleStorage.setLink(link);
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
          error={errors.originalLink}
          value={article.originalLink}
          setValue={handleSetLink}
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
      <UiButton onClick={createArticle}>Створити статтю</UiButton>
    </div>
  );
};

export default ArticleSettings;
