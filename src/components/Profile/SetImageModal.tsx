import React, {FC} from 'react';
import {Box, Modal, Typography} from "@mui/material";
import cl from './Profile.module.sass'
import {FilledDiv} from '../basisComps/Basic.styled';
import UiInput from "../UI/input/UiInput";
import UiButton from "../UI/button/UiButton";
import useValidator from "../../hooks/useValidator";
import {isNotNullOrWhiteSpace, regexTest} from "../../utils/validators";
import {imageLinkRegex} from "../../utils/regex";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import ProfileImageDrop from "./ProfileImageDrop";

interface ISetImageModalProps {
  isModalOpened: boolean,
  closeModal: () => void,
  imageLink: string,
  setImageLink: (value: string) => void,
  onClick: () => void,
  handleDrop: (e: React.DragEvent<HTMLSpanElement>) => Promise<void>
}

const SetImageModal: FC<ISetImageModalProps> = ({isModalOpened, closeModal, imageLink, setImageLink, onClick, handleDrop}) => {

  const {subscribeValidator, validateAll, errors} = useValidator<{ link: boolean }>();
  const {enqueueError} = useCustomSnackbar();

  const handleOnClick = async () => {
    subscribeValidator({
      value: imageLink,
      field: 'link',
      validators: [regexTest(imageLinkRegex), isNotNullOrWhiteSpace],
      message: 'Не правильне посилання'
    })

    const {isSuccess, errors} = await validateAll();

    if (!isSuccess) {
      errors.forEach(e => enqueueError(e))
      return
    }

    onClick();
    closeModal();
  }

  return (
    <Modal
      open={isModalOpened}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <FilledDiv className={cl.setImageModal}>
        <Typography variant={'h6'}>Редагування фотографії профілю</Typography>
        <div>
          <div className={cl.leftModalBlock}>
            <Typography variant={'inherit'}>Додати посилання на фото</Typography>
            <UiInput
              error={errors.link} width={'100%'} placeholder={'Посилання'} value={imageLink}
              setValue={setImageLink}
            />
            <UiButton onClick={handleOnClick} width={'100%'}>Зберегти</UiButton>
          </div>
          <div><Box bgcolor={'#FFFFFF'} width={2} height={131} margin={'0 30px'}/></div>
          <div className={cl.rightModalBlock}>
            <ProfileImageDrop onDrop={handleDrop}/>
          </div>
        </div>
      </FilledDiv>
    </Modal>
  );
};

export default SetImageModal;
