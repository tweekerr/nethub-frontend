import React, {FC, useState} from 'react';
import './ArticleCreating.module.scss'
import TitleInput from "../basisComps/titleInput/TitleInput";
import {useDispatch} from "react-redux";
import {createArticleSlice} from "../../store/createArticleSlice";

const SettingsInputItem: FC = () => {
  const [linkValue, setLinkValue] = useState("")
  const dispatch = useDispatch()

  return (
    <div className={'.settingsInputItem'}>
      <TitleInput
        value={linkValue}
        setValue={(link: string) => {
          dispatch(createArticleSlice.actions.updateOriginalLink(link))
        }}
        title={"Посилання на оригінал "}
        placeholder={"Посилання на статтю"}
        width={"100%"}/>
      <p>*якщо стаття переведена, вкажіть посилання на оригінал</p>
    </div>
  );
};

export default SettingsInputItem;
