import React, {forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef} from 'react';
import classes from './ArticleCreating.module.sass';
import TitleInput from '../../UI/TitleInput/TitleInput';
import TinyInput from "./TinyInput";
import ILocalization, {IArticleFormErrors} from "../../../types/ILocalization";
import {ArticleStorage} from "../../../utils/localStorageProvider";
import FilledDiv from "../../UI/FilledDiv";
import {Box} from "@chakra-ui/react";
import AddContributorsBlock from "./AddContributorsBlock";
import {useArticleCreatingContext} from "../../../pages/Articles/Create/ArticleCreatingSpace.Provider";

interface IMainArticleProps {
  errors: IArticleFormErrors,
}

interface IMainArticleHandle {
  getTinyRef: () => React.RefObject<TinyRef>
}

type TinyRef = React.ElementRef<typeof TinyInput>;

const CreateArticleForm: ForwardRefRenderFunction<IMainArticleHandle, IMainArticleProps> =
  ({errors}, ref) => {

    const {article, setArticle, setArticleValue} = useArticleCreatingContext();

    const tinyRef = useRef<TinyRef>(null)

    const handleUpdateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setArticleValue('title')(event.target.value);
      ArticleStorage.setTitle(event.target.value)
    }

    const handleUpdateDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
      setArticleValue('description')(event.target.value);
      ArticleStorage.setDescription(event.target.value)
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
      <Box className={classes.createArticle}>
        <FilledDiv className={classes.mainArticleParams}>
          <TitleInput
            isInvalid={errors.title}
            value={article.title}
            onChange={handleUpdateTitle}
            title={'Заголовок статті'}
            placeholder={'Заголовок вашої статті'}
            width={'100%'}
          />
          <TitleInput
            isInvalid={errors.description}
            value={article.description}
            onChange={handleUpdateDescription}
            title={'Короткий опис статті'}
            placeholder={'Короткий опис вашої статті'}
            width={'100%'}
          />
          <TinyInput
            isInvalid={errors.html}
            data={article.html}
            setData={handleUpdateHtml}
            editorTitle={'Тіло статті'}
            ref={tinyRef}
          />
        </FilledDiv>
        <AddContributorsBlock article={article} setArticle={setArticle}/>
      </Box>
    );
  };

export default forwardRef(CreateArticleForm);
