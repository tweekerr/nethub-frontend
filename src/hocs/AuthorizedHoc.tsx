import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import {isAuthorized} from "../utils/JwtHelper";

interface IAuthorizedProps {
  children: JSX.Element,
  redirectTo?: string,
}


const AuthorizedHoc = ({children, redirectTo = '/login'}: IAuthorizedProps) => {
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

  const config = {
    Left: {showSidebar: false}
  }


  if (isLogin === null)
    return <Layout Config={config}>
      <></>
    </Layout>


  return isLogin ? children : <Navigate to={redirectTo}/>;
}

export default AuthorizedHoc;
