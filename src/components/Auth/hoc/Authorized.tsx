import React, {useEffect, useState} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../store";
import {useActions} from "../../../utils";
import {checkAuth2} from "../../../store/thunks/authThunk";
import jwtDecode from "jwt-decode";
import IJwtPayload from "../../../types/IJwtPayload";
import {
  getAccessToken,
  getAccessTokenExpires,
  getRefreshToken,
  getRefreshTokenExpires
} from "../../../utils/localStorageProvider";
import {Loader} from "../../UI/loader/Loader";
import Layout from "../../Layout/Layout";

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

  function isAuthorized() {
    return getAccessToken() && new Date(getAccessTokenExpires()!) > new Date();
  }

  function isAccessTokenExpired() {
    return getAccessToken() && new Date(getAccessTokenExpires()!) < new Date();
  }

  function isRefreshTokenExpired() {
    return getRefreshToken() && new Date(getRefreshTokenExpires()!) < new Date();
  }

  async function check() {
    if (isAuthorized()) {
      const data = jwtDecode<IJwtPayload>(getAccessToken()!);
      login({username: data.username, profilePhotoLink: data.image})
      setIsLogin(true)
    } else if (isAccessTokenExpired()) {
      if (!isRefreshTokenExpired())
        setIsLogin(await checkAuth2());
    } else {
      setIsLogin(false);
    }
  }

  if (isLogin === null)
    return (
      <Layout showSidebar={false}>
      </Layout>)

  console.log('isLogin', isLogin)

  return isLogin
    ? children
    : <Navigate to={redirectTo} state={{from: location}}/>;
}

export default Authorized;
