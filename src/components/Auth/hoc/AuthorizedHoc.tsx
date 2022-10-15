import React, {useEffect, useState} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import jwtDecode from "jwt-decode";
import IJwtPayload from "../../../types/IJwtPayload";
import Layout from "../../Layout/Layout";
import {isAccessTokenExpired, isAuthorized, isRefreshTokenExpired} from '../../../utils/JwtHelper';
import {userApi} from "../../../api/userApi";
import {useActions} from "../../../store/storeConfiguration";
import {JWTStorage} from "../../../utils/localStorageProvider";

interface IAuthorizedProps {
  children: JSX.Element,
  redirectTo?: string,
  checkAuth?: boolean
}


const AuthorizedHoc = ({children, redirectTo = '/login', checkAuth = true}: IAuthorizedProps) => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      await check();
    })();
  }, [])

  async function check() {
    if (isAuthorized()) {
      setIsLogin(true);
      return;
    }
    setIsLogin(false);
  }

  if (isLogin === null)
    return (<Layout showSidebar={false}/>)


  return isLogin ? children : <Navigate to={redirectTo}/>;
}

export default AuthorizedHoc;
