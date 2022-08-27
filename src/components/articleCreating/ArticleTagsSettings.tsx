import SvgSelector from "../basisComps/SvgSelector/SvgSelector";
import classes from "./ArticleCreating.module.scss"
import React, {FC, useState} from "react";
import UiInput from "../UI/input/UiInput";
import ThemeTag from "../basisComps/ThemeTag";

interface IArticleTagsSettingsProps {
  tags: string[],
  addToAllTags: (tag: string) => void,
  deleteTag: (tag: string) => void
}

const ArticleTagsSettings: FC<IArticleTagsSettingsProps> = ({tags, addToAllTags, deleteTag}) => {

  const [middleTag, setMiddleTag] = useState<string>('');

  const addTag = () => {
    if (tags.includes(middleTag) || middleTag === '') return;
    addToAllTags(middleTag)
    setMiddleTag('');
  }

  return (
    <>
      <div className={classes.fixedTags}>
        <UiInput placeholder={'Теги'}
                 value={middleTag}
                 setValue={setMiddleTag}
                 width={'75%'}/>
        <button onClick={addTag}>
          <SvgSelector id={"AddIcon"}/>
        </button>
      </div>
      <div className={classes.addedTags}>
        {
          tags.length > 0 &&
          tags.map(tag =>
            <ThemeTag value={tag} onClick={deleteTag}/>
          )
        }
      </div>
    </>
  );
}

export default ArticleTagsSettings;
