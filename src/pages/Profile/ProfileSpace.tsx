import React from 'react';
import PrivateProfile from "../../components/Profile/Private/PrivateProfile";
import IUserInfoResponse from "../../types/api/User/IUserInfoResponse";
import IDashboardResponse from "../../types/api/Dashboard/IDashboardResponse";
import {useQuery} from "react-query";
import {Skeleton, Text} from '@chakra-ui/react';
import {useAppStore} from "../../store/config";
import {useParams} from "react-router-dom";
import {getUserDashboard, getUserInfo} from "./ProfileSpace.functions";
import PublicProfile from "../../components/Profile/Public/PublicProfile";
import {LFC} from "../../components/Layout/LFC";
import {proxy} from "valtio";

interface ProfileSpaceStore {
  title: string | JSX.Element,
}

const ProfileSpace: LFC<ProfileSpaceStore> = () => {
  const {id} = useParams();
  const userAccessor = useQuery<IUserInfoResponse, string>(['user', id], () => getUserInfo(id))
  const dashboardAccessor = useQuery<IDashboardResponse, string>(['dashboard', id], () => getUserDashboard(id));
  const reduxUser = useAppStore(state => state.user);

  const title = id
    ? userAccessor.data?.userName
      ? userAccessor.data.userName
      : <Skeleton width={'30%'}>height</Skeleton> //'height' - to declare font height to skeleton
    : `Вітаю, ${reduxUser.username}`;
  ProfileSpace.store.title = title;

  if (userAccessor.isError || dashboardAccessor.isError)
    return <div>Помилка при завантаженні інформації про користувача</div>;

  return userAccessor.isLoading || dashboardAccessor.isLoading
    ? <Skeleton height={200}/>
    : id
      ? <PublicProfile user={userAccessor.data!} dashboard={dashboardAccessor.data!}/>
      : <PrivateProfile user={userAccessor.data!} dashboard={dashboardAccessor.data!}/>
};

ProfileSpace.store = proxy({
  title: '',
});

ProfileSpace.title = () => <Text as={'h2'} style={{display: 'flex'}}>{ProfileSpace.store.title}</Text>;

ProfileSpace.config = {
  error: {
    show: true
  }
}

export default ProfileSpace;
