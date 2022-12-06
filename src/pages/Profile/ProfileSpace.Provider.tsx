import React, {createContext, FC, PropsWithChildren, useContext, useMemo} from 'react';
import {useQuery, UseQueryResult} from "react-query";
import {ApiError} from "../../types/ApiError";
import IUserInfoResponse from "../../types/api/User/IUserInfoResponse";
import {getUserDashboard, getUserInfo} from "./ProfileSpace.functions";
import IDashboardResponse from "../../types/api/Dashboard/IDashboardResponse";
import {useParams} from "react-router-dom";

type ContextType = {
  userAccessor: UseQueryResult<IUserInfoResponse, ApiError>,
  dashboardAccessor: UseQueryResult<IDashboardResponse, ApiError>,
}

const InitialContextValue: ContextType = {
  userAccessor: {} as UseQueryResult<IUserInfoResponse, ApiError>,
  dashboardAccessor: {} as UseQueryResult<IDashboardResponse, ApiError>,
}
const ProfileContext = createContext<ContextType>(InitialContextValue);

export const useProfileContext = (): ContextType => useContext<ContextType>(ProfileContext);

const ProfileSpaceProvider: FC<PropsWithChildren> = ({children}) => {
  const {id} = useParams();

  const userAccessor = useQuery<IUserInfoResponse, ApiError>(['user', id], () => getUserInfo(id))
  const dashboardAccessor = useQuery<IDashboardResponse, ApiError>(['dashboard', id], () => getUserDashboard(id));

  const value: ContextType = useMemo(() => {
    return {
      userAccessor,
      dashboardAccessor
    }
  }, [userAccessor, dashboardAccessor])

  return <ProfileContext.Provider value={value}>
    {children}
  </ProfileContext.Provider>
};

export default ProfileSpaceProvider;