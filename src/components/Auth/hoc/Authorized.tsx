import React, {useLayoutEffect} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {Loader} from "../../UI/loader/Loader";
import Layout from "../../Layout/Layout";
import {useAppDispatch, useAppSelector} from "../../../store";
import {useActions} from "../../../utils";
import {checkAuth} from "../../../store/thunks/authThunk";

interface IAuthorizedProps {
  children: JSX.Element,
  redirectTo?: string
}

const Authorized = ({children, redirectTo = '/login'}: IAuthorizedProps) => {
  const {isLogin} = useAppSelector(state => state.generalReducer);
  const dispatch = useAppDispatch();
  const {setIsLoginFalse} = useActions();
  const location = useLocation();

  useLayoutEffect(() => {
    console.log('effect')
    if (localStorage.getItem('token') && localStorage.getItem('refreshToken')) {
      dispatch(checkAuth())
    } else setIsLoginFalse()
  }, [isLogin])

  if (isLogin === null)
    return <Layout showSidebar={false}>
      <Loader/>
    </Layout>

  return isLogin
    ? children
    : <Navigate to={redirectTo} state={{from: location}}/>;

}

export default Authorized;
