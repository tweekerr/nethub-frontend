import React, {FC, useState} from 'react';
import IUserInfoResponse from "../../../types/api/User/IUserInfoResponse";
import cl from '../Profile.module.sass'
import SvgSelector from "../../UI/SvgSelector/SvgSelector";
import IDashboardResponse from "../../../types/api/Dashboard/IDashboardResponse";
import millify from "millify";
import SetImageModal from "../SetImageModal";
import {ExtendedRequest, ProfileChangesType} from "./PrivateProfile";
import {allowedImagesTypes} from "../../../constants/dnd";
import useCustomSnackbar from "../../../hooks/useCustomSnackbar";
import DashboardImage from "../DashboardImage";
import {getTimeFrom} from "../../../utils/timeHelper";
import FilledDiv from "../../UI/FilledDiv";
import {Button, Text} from '@chakra-ui/react';


interface IPrivateDashboardProps {
  user: IUserInfoResponse,
  dashboard: IDashboardResponse,
  addChanges: (change: ProfileChangesType) => void,
  request: ExtendedRequest,
  setRequest: (request: ExtendedRequest) => void,
}

const PrivateDashboard: FC<IPrivateDashboardProps> = ({user, dashboard, request, setRequest, addChanges}) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [imageLink, setImageLink] = useState<string>('')
  const {enqueueError} = useCustomSnackbar();

  //handlerFunctions
  const handleSetImageLink = (value: string) => setImageLink(value);
  const handleOpenModal = () => setIsModalOpened(true);
  const handleCloseModal = () => setIsModalOpened(false);
  const articlesCount = () => millify(dashboard!.articlesCount);
  const articlesViews = () => millify(dashboard!.articlesViews);
  const handleModalButton = () => {
    user.profilePhotoLink !== imageLink && addChanges('photo');
    setRequest({...request, image: imageLink});
    setImageLink('');
  }
  const handleDrop = async (e: React.DragEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const photo = e.dataTransfer.files[0];
    if (!allowedImagesTypes.includes(photo.type)) {
      enqueueError('Дозволені лише формати: jpg, jpeg, png');
      return;
    }
    setIsModalOpened(false);
    addChanges('photo');
    setRequest({...request, image: photo});
  }

  return (
    <FilledDiv
      className={cl.dashboardWrapper}
      sx={{justifyContent: dashboard!.articlesCount === 0 ? '' : 'space-between'}}
    >
      <DashboardImage openModal={handleOpenModal} handleDrop={handleDrop}/>
      <SetImageModal
        isModalOpened={isModalOpened} closeModal={handleCloseModal} imageLink={imageLink}
        setImageLink={handleSetImageLink} onClick={handleModalButton} handleDrop={handleDrop}
      />
      <div className={cl.dashboardInfoWrapper}>
        <div className={cl.dateBlock}>
          <span>{getTimeFrom(user.registered)}</span> разом з NetHub
        </div>
        {dashboard!.articlesCount === 0 ?
          <div className={cl.dashboardEmpty}>
            <Text as={'p'}>
              Ви ще не опублікували жодної статті.
            </Text>
            <div>
              <Button
                backgroundColor={'white'} color={'#323232'} fontWeight={500}
                // padding={'11px 21px'}
                onClick={() => {
                }}
              >
                Створити статтю
                <SvgSelector id={'DriveFileRenameOutlineIcon'}/>
              </Button>
              <span>Як правильно писати статтю?</span>
            </div>
          </div>
          :
          <div className={cl.filledDashboard}>
            <div style={{width: articlesViews().length > 4 ? '50%' : '40%'}} className={cl.dashboardInfoBlock}>
              <Text as={'p'}>
                Опубліковано:
              </Text>
              <div>
                <Text as={'p'}>{articlesCount()}</Text>
                <Text as={'p'}>статтей</Text>
              </div>
            </div>

            <div style={{width: articlesViews().length > 5 ? '50%' : '40%'}} className={cl.dashboardInfoBlock}>
              <Text as={'p'}>
                Статті зібрали:
              </Text>
              <div>
                <Text as={'p'}>{articlesViews()}</Text>
                <Text as={'p'}>переглядів</Text>
              </div>
            </div>
          </div>
        }
      </div>
    </FilledDiv>
  );
};

export default PrivateDashboard;
