import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useAppSelector} from "../../store";

interface IAuthorizedProps {
  children: () => JSX.Element,
  redirectTo?: string
}

const Authorized = ({children, redirectTo = '/login'}: IAuthorizedProps) => {
  const location = useLocation();
  const {isLogin} = useAppSelector(state => state.generalReducer);

  if (!isLogin)
    return <Navigate to='/login' state={{from: location}}/>

  return children();
}

export default Authorized;
