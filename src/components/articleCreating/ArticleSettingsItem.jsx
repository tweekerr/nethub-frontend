import React, {useState} from 'react';
import classes from "./ArticleCreating.module.scss"
import FixedTags from "./FixedTags";
import {updateTags, updateTitle} from "../../store/createArticleSlice";
import {useDispatch, useSelector} from "react-redux";


const ArticleSettingsItem = ({props}) => {

    const [tagsValue, setTagsValue]=useState("")
    const dispatch = useDispatch()


    return (
            <div className={classes.articleSettingsItem}>
                <p>Теги по темам</p>
                <FixedTags
                    value={tagsValue}
                    setValue={(val)=>{
                        dispatch(updateTags(val))
                    }}
                />
            </div>
    );
};

export default ArticleSettingsItem;