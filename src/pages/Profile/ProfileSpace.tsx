import React from 'react';
import PrivateProfile from "../../components/Profile/Private/PrivateProfile";
import {Skeleton} from '@chakra-ui/react';
import {useParams} from "react-router-dom";
import PublicProfile from "../../components/Profile/Public/PublicProfile";
import {LFC2} from "../../components/Layout/LFC";
import ProfileSpaceProvider, {useProfileContext} from "./ProfileSpace.Provider";
import ProfileTitle from "../../components/Profile/ProfileTitle";

const ProfileSpace: LFC2 = () => {
  const {id} = useParams();
  const {userAccessor, dashboardAccessor} = useProfileContext();

  return {
    Center: {
      Render: !userAccessor.isSuccess || !dashboardAccessor.isSuccess
        ? <Skeleton height={200}/>
        : id
          ? <PublicProfile/>
          : <PrivateProfile/>,
      title: <ProfileTitle/>,
      config: {error: {show: true}}
    },
    ContextProvider: ProfileSpaceProvider
  }
};
export default ProfileSpace;