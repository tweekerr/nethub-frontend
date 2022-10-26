import React, {useEffect, useState} from 'react';
import Profile from "../../components/Profile/Profile";
import Layout from "../../components/Layout/Layout";
import {getPrivateDashboardInfo} from "../../components/Profile/Dashboard.functions";
import IUserInfoResponse from "../../types/api/User/IUserInfoResponse";
import IDashboardResponse from "../../types/api/Dashboard/IDashboardResponse";
import useLoading from "../../hooks/useLoading";
import {Skeleton} from "@mui/material";
import {useAppSelector} from "../../store/storeConfiguration";

const ProfileSpace = () => {
  const [user, setUser] = useState<IUserInfoResponse>();
  const [dashboard, setDashboard] = useState<IDashboardResponse>();
  const {isLoading, startLoading, finishLoading, error, setError} = useLoading();
  const {user: reduxUser} = useAppSelector(state => state.generalReducer);

  const titles = {
    center: <h2 style={{display: 'flex'}}>Вітаю, {reduxUser!.firstName}</h2>
  }

  useEffect(() => {
    startLoading();
    getPrivateDashboardInfo()
      .then(({user, dashboardInfo}) => {
        setUser(user);
        setDashboard(dashboardInfo)
        // setDashboard({articlesViews: 0, articlesCount: 0});
      })
      .catch((e) => setError(e.message))
      .finally(() => finishLoading())
  }, [])

  return (
    <Layout titles={titles}>
      {
        error.isError ? <div>{error.message}</div> :
          isLoading ? <Skeleton variant={'rounded'} height={200}/> :
            <Profile user={user!} dashboard={dashboard!}/>
      }
    </Layout>
  );
};

export default ProfileSpace;
