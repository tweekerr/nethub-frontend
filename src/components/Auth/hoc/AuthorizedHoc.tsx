import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import Layout from "../../Layout/Layout";
import {isAuthorized} from '../../../utils/JwtHelper';

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
    return (<Layout sideBar={{showSidebar: false}}/>)


  return isLogin ? children : <Navigate to={redirectTo}/>;
}

export default AuthorizedHoc;
