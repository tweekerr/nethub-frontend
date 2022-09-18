import React, {useEffect, useState} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import jwtDecode from "jwt-decode";
import IJwtPayload from "../../../types/IJwtPayload";
import Layout from "../../Layout/Layout";
import {isAccessTokenExpired, isAuthorized, isRefreshTokenExpired} from '../../../utils/JwtHelper';
import {api} from "../../../api/api";
import {useActions} from "../../../store/storeConfiguration";
import {JWTStorage} from "../../../utils/localStorageProvider";

interface IAuthorizedProps {
  children: JSX.Element,
  redirectTo?: string
}

const Authorized = ({children, redirectTo = '/login'}: IAuthorizedProps) => {
  const {login} = useActions();
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  const location = useLocation();

  useEffect(() => {
    (async () => {
      await check();
    })();
  }, [])

  async function check() {
    if (isAuthorized()) {
      const data = jwtDecode<IJwtPayload>(JWTStorage.getAccessToken()!);
      login({username: data.username, profilePhotoLink: data.image})
      setIsLogin(true)
    } else if (isAccessTokenExpired()) {
      if (!isRefreshTokenExpired())
        setIsLogin(await api.checkAuth());
    } else {
      setIsLogin(false);
    }
  }

  if (isLogin === null)
    return (
      <Layout showSidebar={false}>
      </Layout>)

  return isLogin
    ? children
    : <Navigate to={redirectTo} state={{from: location}}/>;
}

export default Authorized;
