import React, {FC} from 'react';
import cl from './Profile.module.sass'
import PrivateDashboard from "./PrivateDashboard";
import SvgSelector from "../basisComps/SvgSelector/SvgSelector";
import {FilledDiv} from '../basisComps/Basic.styled';
import IUserInfoResponse from "../../types/api/User/IUserInfoResponse";
import IDashboardResponse from "../../types/api/Dashboard/IDashboardResponse";
import UiButton from "../UI/button/UiButton";
import {useNavigate} from "react-router-dom";
import ProfileSettings from "./ProfileSettings";

interface IProfileProps {
  user: IUserInfoResponse,
  dashboard: IDashboardResponse
}

const Profile: FC<IProfileProps> = ({user, dashboard}) => {
  const navigate = useNavigate();

  return (
    <div className={cl.profileWrapper}>
      <PrivateDashboard user={user} dashboard={dashboard}/>
      <FilledDiv
        className={cl.profileButton}
        width={'100%'}
        color={'#242D35'}
        onClick={() => {
        }}>
        <div className={cl.buttonInside}>
          <div>
            <SvgSelector id={'DriveFileRenameOutlineIcon'}/>
            Створені вами статті
          </div>
          <UiButton
            fontSize={'14px'}
            padding={'11px 34px'}
            onClick={() => navigate('/by-you')}>Показати</UiButton>
        </div>
      </FilledDiv>
      <FilledDiv
        className={cl.profileButton}
        width={'100%'}
        color={'#242D35'}
        onClick={() => {
        }}>
        <div className={cl.buttonInside}>
          <div>
            <SvgSelector id={'SavedOutlinedFilled'}/>
            Збережені вами статті
          </div>
          <UiButton
            fontSize={'14px'}
            padding={'11px 34px'}
            onClick={() => navigate('/saved')}>Показати</UiButton>
        </div>
      </FilledDiv>
      <ProfileSettings/>
    </div>
  );
};

export default Profile;
