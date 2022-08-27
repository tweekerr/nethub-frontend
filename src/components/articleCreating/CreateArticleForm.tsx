import React, {FC} from 'react';
import classes from './ArticleCreating.module.scss';
import TitleInput from '../basisComps/titleInput/TitleInput';
import {useState} from 'react';
import {useActions} from '../../utils';
import TinyInput from "./TinyInput";
import IArticle from "../../types/IArticle";

// import {createArticleSlice, updateMainTxt, updateSubTitle, updateTitle} from '../../store/createArticleSlice';

interface IMainArticleProps {
  titleParams: string,
  article: IArticle,
  setArticleValue: (key: string) => (value: any) => void
}

const CreateArticleForm: FC<IMainArticleProps> = ({titleParams, article, setArticleValue}) => {

  const handleUpdateTitle = setArticleValue('title');
  const handleUpdateSubTitle = setArticleValue('subTitle');
  const handleUpdateBody = setArticleValue('body');

  return (
    <div className={classes.createArticle}>
      <h2 className={'nonCopyrable'}>Створення статті</h2>

      <div className={classes.mainArticleParams}>
        <p>{titleParams}</p>
        <TitleInput
          value={article.title}
          setValue={handleUpdateTitle}
          title={'Заголовок статті'}
          placeholder={'Заголовок вашої статті'}
          width={'100%'}
        />
        <TitleInput
          value={article.subTitle}
          setValue={handleUpdateSubTitle}
          title={'Заголовок статті'}
          placeholder={'Заголовок вашої статті'}
          width={'100%'}
        />
        <TinyInput
          data={article.body}
          setData={handleUpdateBody}
          editorTitle={'Текст статті'}
        />
      </div>
    </div>
  );
};

export default CreateArticleForm;
