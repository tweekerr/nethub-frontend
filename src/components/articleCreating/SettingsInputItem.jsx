import React from 'react';
import classes from './ArticleCreating.module.scss'
import TitleInput from "../basisComps/titleInput/TitleInput";
import {updateOriginalLink, updateSubTitle} from "../../store/createArticleSlice";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const SettingsInputItem = (props) => {
    const [linkValue, setLinkValue]=useState("")
    const dispatch = useDispatch()

    return (
        <div className={classes.settingsInputItem}>
            <TitleInput
                value={linkValue}
                setValue={(val)=>{
                    dispatch(updateOriginalLink(val))
                }}
                titleToInput={"Посилання на оригінал "}
                placeholder={"Посилання на статтю"}
                width={"100%"}/>
            <p>*якщо стаття переведена, вкажіть посилання на оригінал</p>
        </div>
    );
};

export default SettingsInputItem;
