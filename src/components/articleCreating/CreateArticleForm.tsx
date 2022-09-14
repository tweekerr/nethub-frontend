import React, {FC} from 'react';
import classes from './ArticleCreating.module.sass';
import TitleInput from '../basisComps/titleInput/TitleInput';
import TinyInput from "./TinyInput";
import IArticle, {IArticleFormErrors} from "../../types/IArticle";
import {StyledDiv} from '../UI/styled';

interface IMainArticleProps {
  titleParams: string,
  article: IArticle,
  setArticleValue: (key: string) => (value: any) => void,
  errors: IArticleFormErrors,
}

const CreateArticleForm: FC<IMainArticleProps> = ({titleParams, article, setArticleValue, errors}) => {

  const handleUpdateTitle = setArticleValue('title');
  const handleUpdateSubTitle = setArticleValue('subTitle');
  const handleUpdateBody = setArticleValue('body');

  return (
    <div className={classes.createArticle}>
      <h2 className={'nonCopyrable'}>Створення статті</h2>

      <StyledDiv className={classes.mainArticleParams}>
        <p>{titleParams}</p>
        <TitleInput
          error={errors.title}
          value={article.title}
          setValue={handleUpdateTitle}
          title={'Заголовок статті'}
          placeholder={'Заголовок вашої статті'}
          width={'100%'}
        />
        <TitleInput
          error={errors.subTitle}
          value={article.subTitle}
          setValue={handleUpdateSubTitle}
          title={'Заголовок статті'}
          placeholder={'Заголовок вашої статті'}
          width={'100%'}
        />
        <TinyInput
          error={errors.body}
          data={article.body}
          setData={handleUpdateBody}
          editorTitle={'Текст статті'}
        />
      </StyledDiv>
    </div>
  )
    ;
};

export default CreateArticleForm;
