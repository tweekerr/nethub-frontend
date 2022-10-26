import React, {FC, useState} from 'react';
import cl from './Profile.module.sass'
import PrivateDashboard from "./PrivateDashboard";
import SvgSelector from "../basisComps/SvgSelector/SvgSelector";
import {FilledDiv} from '../basisComps/Basic.styled';
import IUserInfoResponse from "../../types/api/User/IUserInfoResponse";
import IDashboardResponse from "../../types/api/Dashboard/IDashboardResponse";
import UiButton from "../UI/button/UiButton";
import {useNavigate} from "react-router-dom";
import ProfileSettings from "./ProfileSettings";
import IUpdateProfileRequest from "../../types/api/Profile/IUpdateProfileRequest";
import {userApi} from "../../api/userApi";
import {useActions, useAppSelector} from "../../store/storeConfiguration";

interface IProfileProps {
  user: IUserInfoResponse,
  dashboard: IDashboardResponse
}

export interface ExtendedRequest extends IUpdateProfileRequest {
  username: string,
  image: string | File
}

export type ProfileChangesType = 'profile' | 'photo' | 'username';

type ProfileSettingsRef = React.ElementRef<typeof ProfileSettings>


const Profile: FC<IProfileProps> = ({user, dashboard}) => {
  const navigate = useNavigate();

  const {user: reduxUser} = useAppSelector(state => state.generalReducer);
  const [request, setRequest] = useState<ExtendedRequest>({
    username: user.userName,
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
        color={'#242D35'}
        onClick={() => {
        }}
      >
        <div className={cl.buttonInside}>
          <div>
            <div>
              <SvgSelector id={'ProfileCreated'}/>
            </div>
            Створені вами статті
          </div>
          <UiButton
            fontSize={'14px'}
            padding={'11px 34px'}
            onClick={() => navigate('/by-you')}
          >Показати</UiButton>
        </div>
      </FilledDiv>
      <FilledDiv
        className={cl.profileButton}
        width={'100%'}
        color={'#242D35'}
        onClick={() => {
        }}
      >
        <div className={cl.buttonInside}>
          <div>
            <div>
              <SvgSelector id={'ProfileBookmark'}/>
            </div>
            Збережені вами статті
          </div>
          <UiButton
            fontSize={'14px'}
            padding={'11px 34px'}
            onClick={() => navigate('/saved')}
          >
            Показати
          </UiButton>
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
      {
        changes.length > 0 &&
        <div className={cl.saveChangesBlock}>
          <p>Ви внесли зміни до профілю, збережіть їх</p>
          <UiButton onClick={updateProfile} padding={'15px 95px'}>Зберегти</UiButton>
        </div>
      }
    </div>
  );
};

export default Profile;
