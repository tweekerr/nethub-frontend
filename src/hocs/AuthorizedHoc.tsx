import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {isAccessTokenValid, isRefreshTokenValid} from "../utils/JwtHelper";
import jwtDecode from "jwt-decode";
import IJwtPayload from "../types/IJwtPayload";
import {JWTStorage} from "../utils/localStorageProvider";
import axios, {AxiosResponse} from "axios";
import IAuthResult from "../types/api/Refresh/IAuthResult";
import {baseApiUrl} from "../api/api";
import {useAppStore} from "../store/config";
import {Page} from "../components/Layout/Layout";

interface IAuthorizedProps {
  children: Page,
  requireAuthorization: boolean
}


const AuthorizedHoc = ({children: Children, requireAuthorization}: IAuthorizedProps) => {
  const login = useAppStore(state => state.login);


  const [authResult, setAuthResult] = useState<boolean | null>(null);
  console.log('query', authResult)

  useEffect(() => {
    isUserSignedIn().then(setAuthResult);
  }, [window.location.pathname])

  // const authResult = useQuery<boolean, string>([],
  //   async () => await isUserSignedIn());

  async function isUserSignedIn() {

    if (isAccessTokenValid()) {
      const jwt = jwtDecode<IJwtPayload>(JWTStorage.getAccessToken()!);
      login({
        username: jwt.username,
        profilePhotoUrl: jwt.image,
        firstName: jwt.firstname,
        // lastName: data.lastName
      })
      return true;
    }

    if (!isRefreshTokenValid())
      return false;

    try {
      const response: AxiosResponse<IAuthResult> = await axios.post(`${baseApiUrl}/user/refresh-tokens`);
      JWTStorage.setTokensData(response.data);

      const jwt = jwtDecode<IJwtPayload>(JWTStorage.getAccessToken()!);
      login({
        username: jwt.username,
        profilePhotoUrl: jwt.image,
        firstName: jwt.firstname,
        // lastName: data.lastName
      })

      return true;
    } catch (e) {
      JWTStorage.clearTokensData();
      return false;
    }
  }

  return <Children.Provider>
    {authResult === null
      ? <>LOADER...</>
      : authResult ? <Children/>
        // doesn't signed in
        : requireAuthorization
          ? <Navigate to={'/login'}/>
          : <Children/>
    }
  </Children.Provider>
}
export default AuthorizedHoc;
