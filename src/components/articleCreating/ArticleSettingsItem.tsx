import React, {FC, useState} from 'react';
import classes from "./ArticleCreating.module.scss"
import FixedTags from "./FixedTags";
import {createArticleSlice} from "../../store/createArticleSlice";
import {useAppDispatch} from "../../store";


const ArticleSettingsItem: FC = () => {

  const [tagsValue, setTagsValue] = useState("")
  const dispatch = useAppDispatch();


  return (
    <div className={classes.articleSettingsItem}>
      <p>Теги по темам</p>
      <FixedTags
        tag={tagsValue}
        setTag={(tags: string) => {
          dispatch(createArticleSlice.actions.updateTags(tags))
        }}
      />
    </div>
  );
};

export default ArticleSettingsItem;
