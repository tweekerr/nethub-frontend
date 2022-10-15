import React, {FC, forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef} from 'react';
import classes from './ArticleCreating.module.sass';
import TitleInput from '../../basisComps/titleInput/TitleInput';
import TinyInput from "./TinyInput";
import ILocalization, {IArticleFormErrors} from "../../../types/ILocalization";
import {ArticleStorage} from "../../../utils/localStorageProvider";
import { FilledDiv } from '../../basisComps/Basic.styled';

interface IMainArticleProps {
  article: ILocalization,
  setArticleValue: (key: string) => (value: any) => void,
  errors: IArticleFormErrors,
}

interface IMainArticleHandle {
  getTinyRef: () => React.RefObject<TinyRef>
}

type TinyRef = React.ElementRef<typeof TinyInput>;


const CreateArticleForm: ForwardRefRenderFunction<IMainArticleHandle, IMainArticleProps> =
  ({article, setArticleValue, errors}, ref) => {

    const tinyRef = useRef<TinyRef>(null)

    const handleUpdateTitle = (value: string) => {
      setArticleValue('title')(value);
      ArticleStorage.setTitle(value)
    }

    const handleUpdateDescription = (value: string) => {
      setArticleValue('description')(value);
      ArticleStorage.setDescription(value)
    }
    const handleUpdateHtml = (value: string) => {
      setArticleValue('html')(value);
      ArticleStorage.setHtml(value)
    }

    useImperativeHandle(ref, () => ({
      getTinyRef() {
        return tinyRef;
      }
    }), [tinyRef]);

    return (
      <div className={classes.createArticle}>
        <FilledDiv className={classes.mainArticleParams}>
          <TitleInput
            error={errors.title}
            value={article.title}
            setValue={handleUpdateTitle}
            title={'Заголовок статті'}
            placeholder={'Заголовок вашої статті'}
            width={'100%'}
          />
          <TitleInput
            error={errors.description}
            value={article.description}
            setValue={handleUpdateDescription}
            title={'Заголовок статті'}
            placeholder={'Заголовок вашої статті'}
            width={'100%'}
          />
          <TinyInput
            error={errors.html}
            data={article.html}
            setData={handleUpdateHtml}
            editorTitle={'Текст статті'}
            ref={tinyRef}
          />
        </FilledDiv>
      </div>
    );
  };

export default forwardRef(CreateArticleForm);
