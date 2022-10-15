import React, {FC, useState} from 'react';
import {FilledDiv} from '../basisComps/Basic.styled';
import IUserInfoResponse from "../../types/api/User/IUserInfoResponse";
import {Typography} from "@mui/material";
import cl from './Profile.module.sass'
import SvgSelector from "../basisComps/SvgSelector/SvgSelector";
import IDashboardResponse from "../../types/api/Dashboard/IDashboardResponse";
import millify from "millify";
import UiButton from "../UI/button/UiButton";
import SetImageModal from "./SetImageModal";
import {useActions} from "../../store/storeConfiguration";


interface IPrivateDashboardProps {
  user: IUserInfoResponse,
  dashboard: IDashboardResponse
}

const PrivateDashboard: FC<IPrivateDashboardProps> = ({user, dashboard}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [imageLink, setImageLink] = useState<{ value: string, needsToUpdate: boolean }>({
    value: '',
    needsToUpdate: false
  })
  const {updateProfileImage} = useActions();


  //handlerFunctions
  const handleSetImageLink = (value: string) => setImageLink(prev => {
    return {...prev, value}
  });
  const handleOpenModal = () => setIsModalOpened(true);
  const handleCloseModal = () => setIsModalOpened(false);
  const articlesCount = () => millify(dashboard!.articlesCount);
  const articlesViews = () => millify(dashboard!.articlesViews);
  const handleModalButton = () => {
    setImageLink(prev => {
      return {...prev, needsToUpdate: true}
    })
    // const link = await userApi.setUserImage(imageLink.value);
    // updateProfileImage(link!)
  }

  return (
    <FilledDiv
      className={cl.dashboardWrapper}
      sx={{justifyContent: dashboard!.articlesCount === 0 ? '' : 'space-between'}}>
      <div className={cl.dashboardMainImage} onClick={handleOpenModal}>
        <img src={user?.profilePhotoLink} alt={'damaged'}></img>
        <SvgSelector id={'DriveFileRenameOutlineIcon'}/>
      </div>
      <SetImageModal isModalOpened={isModalOpened} closeModal={handleCloseModal} imageLink={imageLink.value}
                     setImageLink={handleSetImageLink} onClick={handleModalButton}/>
      {dashboard!.articlesCount === 0 ?
        <div className={cl.dashboardEmpty}>
          <Typography variant={'inherit'}>
            Ви ще не опублікували жодної статті.
          </Typography>
          <div>
            <UiButton backgroundColor={'white'} color={'#323232'} boldSize={500}
              // padding={'11px 21px'}
                      onClick={() => {
                      }}>
              Створити статтю
              <SvgSelector id={'DriveFileRenameOutlineIcon'}/>
            </UiButton>
            <span>Як правильно писати статтю?</span>
          </div>
        </div>
        :
        <div className={cl.dashboardInfoWrapper}>
          <div style={{width: articlesViews().length > 4 ? '50%' : '40%'}} className={cl.dashboardInfo}>
            <Typography variant={'inherit'}>
              Опубліковано:
            </Typography>
            <div>
              <Typography variant={'inherit'}>{articlesCount()}</Typography>
              <Typography variant={'inherit'}>статтей</Typography>
            </div>
          </div>

          <div style={{width: articlesViews().length > 5 ? '50%' : '40%'}} className={cl.dashboardInfo}>
            <Typography variant={'inherit'}>
              Статті зібрали:
            </Typography>
            <div>
              <Typography variant={'inherit'}>{articlesViews()}</Typography>
              <Typography variant={'inherit'}>переглядів</Typography>
            </div>
          </div>
        </div>
      }
    </FilledDiv>
  );
};

export default PrivateDashboard;
