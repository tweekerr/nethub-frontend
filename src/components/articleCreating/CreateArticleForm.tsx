import React, {FC} from 'react';
import classes from './ArticleCreating.module.scss';
import TitleInput from '../basisComps/titleInput/TitleInput';
import {useState} from 'react';
import {useActions} from '../../utils';
import TinyInput from "./TinyInput";

// import {createArticleSlice, updateMainTxt, updateSubTitle, updateTitle} from '../../store/createArticleSlice';

interface IMainArticleProps {
  titleParams: string
}

const CreateArticleForm: FC<IMainArticleProps> = ({titleParams}) => {

  const {updateTitle, updateBody, updateSubTitle} = useActions();
  const [titleValue, setTitleValue] = useState('');
  const [subTitleValue, setSubTitleValue] = useState('');
  const [bodyValue, setBodyValue] = useState('');

  // const articleStoreSelector = useSelector(state=> state.articleReducer)
  // console.log(articleStoreSelector)


  return (
    <div className={classes.createArticle}>
      <h2 className={'nonCopyrable'}>Створення статті</h2>

      <div className={classes.mainArticleParams}>
        <p>{titleParams}</p>
        {/*{JSON.stringify(newArticle)}*/}
        <TitleInput
          value={titleValue}
          setValue={(title: string) => {
            updateTitle(title);
          }}
          title={'Заголовок статті'}
          placeholder={'Заголовок вашої статті'}
          width={'100%'}
        />
        <TitleInput
          value={subTitleValue}
          setValue={(subTitle: string) => {
            updateSubTitle(subTitle);
          }}
          title={'Заголовок статті'}
          placeholder={'Заголовок вашої статті'}
          width={'100%'}
        />
        <TinyInput
          data={bodyValue}
          setData={(body: string) => {
            updateBody(body);
          }}
          editorTitle={'Текст статті'}
        />
      </div>
    </div>
  );
};

export default CreateArticleForm;
