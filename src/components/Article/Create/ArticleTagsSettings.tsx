import SvgSelector from "../../basisComps/SvgSelector/SvgSelector";
import classes from "./ArticleCreating.module.sass"
import React, {FC, useState} from "react";
import UiInput from "../../UI/input/UiInput";
import ThemeTag from "../../basisComps/ThemeTag";
import {IArticleFormErrors} from "../../../types/IArticle";
import useValidation from "../../../hooks/useValidation";
import {regexTest} from "../../../utils/validators";
import {tagRegex} from "../../../utils/regex";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import useValidator from "../../../hooks/useValidator";

interface IArticleTagsSettingsProps {
  tags: string[],
  addToAllTags: (tag: string) => void,
  deleteTag: (tag: string) => void,
  error: boolean
  setError: (flag: boolean) => void;
}

const ArticleTagsSettings: FC<IArticleTagsSettingsProps> = ({tags, addToAllTags, deleteTag, error, setError}) => {

  const [middleTag, setMiddleTag] = useState<string>('');
  const {enqueueError} = useCustomSnackbar();

  const addTag = async () => {
    setError(false);
    if (tags.includes(middleTag) || middleTag === '') return;
    const isSuccess = regexTest(tagRegex)(middleTag);
    if (!isSuccess) {
      enqueueError('Неправильний тег')
      setError(true);
      return;
    }
    addToAllTags(middleTag)
    setMiddleTag('');
  }

  return (
    <>
      <div className={classes.fixedTags}>
        <UiInput placeholder={'Теги'}
                 value={middleTag}
                 setValue={setMiddleTag}
                 width={'75%'}
                 error={error}
        />
        <button onClick={addTag}>
          <SvgSelector id={"AddIcon"}/>
        </button>
      </div>
      <div className={classes.addedTags}>
        {
          tags.length > 0 &&
          tags.map(tag =>
            <ThemeTag key={tag} value={tag} onClick={deleteTag}/>
          )
        }
      </div>
    </>
  );
}

export default ArticleTagsSettings;
