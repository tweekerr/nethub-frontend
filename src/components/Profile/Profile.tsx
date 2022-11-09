import React, {FC, useEffect, useState} from 'react';
import cl from './Profile.module.sass'
import PrivateDashboard from "./PrivateDashboard";
import SvgSelector from "../basisComps/SvgSelector/SvgSelector";
import IUserInfoResponse from "../../types/api/User/IUserInfoResponse";
import IDashboardResponse from "../../types/api/Dashboard/IDashboardResponse";
import UiButton from "../UI/button/UiButton";
import {useNavigate} from "react-router-dom";
import ProfileSettings from "./ProfileSettings";
import IUpdateProfileRequest from "../../types/api/Profile/IUpdateProfileRequest";
import {userApi} from "../../api/api";
import {useActions, useAppSelector} from "../../store/storeConfiguration";
import FilledDiv from '../UI/FilledDiv';
import {Button, Text} from '@chakra-ui/react';
import AnimateHeight from "react-animate-height";


interface IProfileProps {
  user: IUserInfoResponse,
  dashboard: IDashboardResponse
}

export interface ExtendedRequest extends IUpdateProfileRequest {
  username: string,
  image: string | File,
  email: string
}

export type ProfileChangesType = 'profile' | 'photo' | 'username';

type ProfileSettingsRef = React.ElementRef<typeof ProfileSettings>


const Profile: FC<IProfileProps> = ({user, dashboard}) => {
  const navigate = useNavigate();

  const {user: reduxUser} = useAppSelector(state => state.generalReducer);
  const [request, setRequest] = useState<ExtendedRequest>({
    username: user.userName,
    email: user.email,
    image: '',
    firstName: user.firstName,
    lastName: user.lastName,
    middleName: user.middleName,
    description: user.description
  });
  const [changes, setChanges] = useState<ProfileChangesType[]>([]);
  const profileSettingsRef = React.createRef<ProfileSettingsRef>();
  const {updateProfile: updateProfileAction} = useActions();
  const [lockFlag, setLockFlag] = useState<boolean>(false);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState<boolean>(false);

  const handleAddChanges = (change: ProfileChangesType) => {
    if (!changes.includes(change)) setChanges(prev => [...prev, change]);
  }

  const handleRemoveChanges = (change: ProfileChangesType) => {
    setChanges(changes.filter(item => item !== change));
  }

  const updateProfile = async () => {
    if (changes.length === 0) return;

    const isProfileValid = await profileSettingsRef.current?.validateUpdate();

    if (!isProfileValid) return;

    let newProfileImage = '';
    for (const change of changes) {
      switch (change) {
        case "profile":
          await userApi.updateUserProfile(request);
          break;
        case "photo":
          newProfileImage = await userApi.setUserImage(request.image);
          break;
        case "username":
          await userApi.updateUserName(request.username);
          break;
      }
    }

    const newFirstName = changes.includes('profile') ? request.firstName : reduxUser.firstName;
    const newUserName = changes.includes('username') ? request.username : reduxUser.username;

    updateProfileAction({
      firstName: newFirstName,
      username: newUserName,
      profilePhotoLink: newProfileImage === '' ? reduxUser.profilePhotoLink : newProfileImage
    });

    await userApi.refresh()
    setLockFlag(prev => !prev);
    setChanges([])
    setIsSettingsExpanded(false);
  }

  return (
    <div className={cl.profileWrapper}>
      <PrivateDashboard
        user={user}
        dashboard={dashboard}
        request={request}
        setRequest={setRequest}
        addChanges={handleAddChanges}
      />
      <FilledDiv
        className={cl.profileButton}
        width={'100%'}
      >
        <div className={cl.buttonInside}>
          <div>
            <div>
              <SvgSelector id={'ProfileCreated'}/>
            </div>
            <Text as={'p'}>
              Створені вами статті
            </Text>
          </div>
          <Button
            fontSize={'14px'}
            onClick={() => navigate('/by-you')}
            minW={'120px'}
          >
            Показати
          </Button>
        </div>
      </FilledDiv>
      <FilledDiv
        className={cl.profileButton}
        width={'100%'}
      >
        <div className={cl.buttonInside}>
          <div>
            <div>
              <SvgSelector id={'ProfileBookmark'}/>
            </div>
            <Text as={'p'}>
              Збережені вами статті
            </Text>
          </div>
          <Button
            fontSize={'14px'}
            minW={'120px'}
            onClick={() => navigate('/saved')}
          >
            Показати
          </Button>
        </div>
      </FilledDiv>
      <ProfileSettings
        ref={profileSettingsRef}
        request={request}
        setRequest={setRequest}
        changes={{add: handleAddChanges, remove: handleRemoveChanges}}
        lockFlag={lockFlag}
        expanded={isSettingsExpanded}
        setExpanded={setIsSettingsExpanded}
      />
      <AnimateHeight
        height={changes.length > 0 ? 'auto' : 0}
        duration={700}
      >
        <div className={cl.saveChangesBlock}>
          <Text as={'p'}>
            Ви внесли зміни до профілю, збережіть їх
          </Text>
          <Button onClick={updateProfile} padding={'15px 95px'}>Зберегти</Button>
        </div>
      </AnimateHeight>
    </div>
  );
};

export default Profile;
