import React from 'react';
import Profile from "../../components/Profile/Profile";
import Layout from "../../components/Layout/Layout";
import IUserInfoResponse from "../../types/api/User/IUserInfoResponse";
import IDashboardResponse from "../../types/api/Dashboard/IDashboardResponse";
import {useAppSelector} from "../../store/storeConfiguration";
import {useQuery} from "react-query";
import {userApi} from "../../api/api";
import {Text, Skeleton} from '@chakra-ui/react';

const ProfileSpace = () => {
  const userAccessor = useQuery<IUserInfoResponse, string>('user', () => userApi.me())
  const dashboardAccessor = useQuery<IDashboardResponse, string>('dashboard', () => userApi.myDashboard());
  const {user: reduxUser} = useAppSelector(state => state.generalReducer);

  if (userAccessor.isError || dashboardAccessor.isError)
    return <div>Помилка при завантаженні інформації про користувача</div>;

  return (
    <Layout title={<Text as={'h2'} style={{display: 'flex'}}>Вітаю, {reduxUser!.firstName}</Text>}>
      {
        userAccessor.isLoading || dashboardAccessor.isLoading ? <Skeleton height={200}/> :
          <Profile user={userAccessor.data!} dashboard={dashboardAccessor.data!}/>
      }
    </Layout>
  );
};

export default ProfileSpace;
