import React, {FC, forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef} from 'react';
import classes from './ArticleCreating.module.sass';
import TitleInput from '../../basisComps/titleInput/TitleInput';
import TinyInput from "./TinyInput";
import IArticle, {IArticleFormErrors} from "../../../types/IArticle";
import {StyledDiv} from '../../UI/styled';
import {ArticleStorage} from "../../../utils/localStorageProvider";

interface IMainArticleProps {
  titleParams: string,
  article: IArticle,
  setArticleValue: (key: string) => (value: any) => void,
  errors: IArticleFormErrors,
}

interface IMainArticleHandle {
  getTinyRef: () => React.RefObject<TinyRef>
}

type TinyRef = React.ElementRef<typeof TinyInput>;


const CreateArticleForm: ForwardRefRenderFunction<IMainArticleHandle, IMainArticleProps> =
  ({titleParams, article, setArticleValue, errors}, ref) => {

    const tinyRef = useRef<TinyRef>(null)

    const handleUpdateTitle = (value: string) => {
      setArticleValue('title')(value);
      ArticleStorage.setTitle(value)
    }

    const handleUpdateSubTitle = (value: string) => {
      setArticleValue('subTitle')(value);
      ArticleStorage.setSubTitle(value)
    }
    const handleUpdateBody = (value: string) => {
      setArticleValue('body')(value);
      ArticleStorage.setBody(value)
    }

    useImperativeHandle(ref, () => ({
      getTinyRef() {
        return tinyRef;
      }
    }), [tinyRef]);

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
            ref={tinyRef}
          />
        </StyledDiv>
      </div>
    );
  };

export default forwardRef(CreateArticleForm);
