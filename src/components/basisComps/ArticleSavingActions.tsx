import React, {FC} from 'react';
import {FilledDiv} from "./Basic.styled";
import cl from "./ВasicComps.module.sass";
import IconButton from "../UI/iconButton/IconButton";
import {isAuthorized} from "../../utils/JwtHelper";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import {useQueryClient} from "react-query";

interface ISavingActionsProps {
  isSavedDefault: boolean,
  onSave: () => Promise<void>,
  saveLink?: string
}

const ArticleSavingActions: FC<ISavingActionsProps> = ({isSavedDefault, onSave, saveLink}) => {

  const {enqueueSnackBar: enqueueSuccess, enqueueError} = useCustomSnackbar('success');
  const queryClient = useQueryClient();

  async function handleOnSave(e: React.MouseEvent) {
    e.stopPropagation()
    await onSave();
    await queryClient.invalidateQueries('articles');
    await queryClient.invalidateQueries('savedArticles');
  }

  function copyToClipboard(e: React.MouseEvent) {
    e.stopPropagation()
    navigator.clipboard.writeText(saveLink ?? window.location.href)
      .then(() => enqueueSuccess('Посилання скопійовано'))
      .catch(() => enqueueError('Помилка копіювання'))
  }

  return (
    <FilledDiv
      onClick={(e) => e.stopPropagation()} background={'white'} className={cl.actionsRight}
      padding={'4px 13px'}
    >
      <IconButton iconId={'ExternalLink'} checkAuth={false} onClick={copyToClipboard}/>
      <IconButton
        iconId={'SavedOutlined'} filledIconId={'SavedOutlinedFilled'} defaultState={isSavedDefault}
        onClick={handleOnSave}
      />
    </FilledDiv>
  );
};

export default ArticleSavingActions;
