import SvgSelector from "../../UI/SvgSelector/SvgSelector";
import classes from "./ArticleCreating.module.sass"
import React, {FC, useState} from "react";
import Tag from "../One/Body/Tag";
import {regexTest} from "../../../utils/validators";
import {tagRegex} from "../../../utils/regex";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import {Button, Input} from "@chakra-ui/react";
import {useArticleCreatingContext} from "../../../pages/Articles/Create/ArticleCreatingSpace.Provider";

interface IArticleTagsSettingsProps {
  addToAllTags: (tag: string) => void,
  deleteTag: (tag: string) => void,
  error: boolean
  setError: (flag: boolean) => void;
}

const ArticleTagsSettings: FC<IArticleTagsSettingsProps> = ({addToAllTags, deleteTag, error, setError}) => {

  const {article} = useArticleCreatingContext();

  const [middleTag, setMiddleTag] = useState<string>('');
  const {enqueueError} = useCustomSnackbar();

  const addTag = async () => {
    setError(false);
    if (article.tags.includes(middleTag) || middleTag === '') return;
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
        <Input
          placeholder={'Теги'}
          value={middleTag}
          onChange={(e) => setMiddleTag(e.target.value)}
          width={'75%'}
          isInvalid={error}
        />
        <Button onClick={addTag}>
          <SvgSelector id={"AddIcon"}/>
        </Button>
      </div>
      <div className={classes.addedTags}>
        {
          article.tags.length > 0 &&
          article.tags.map(tag =>
            <Tag key={tag} value={tag} onClick={deleteTag}>
              #{tag}
            </Tag>)
        }
      </div>
    </>
  );
}

export default ArticleTagsSettings;
