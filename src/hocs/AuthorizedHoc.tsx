import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import Layout from "../components/Layout/Layout";
import {isAuthorized} from "../utils/JwtHelper";
import TitleEmpty from "../components/Layout/TitleEmpty";
import {useQuery} from "react-query";

interface IAuthorizedProps {
  children: JSX.Element,
  redirectTo?: string,
}


const AuthorizedHoc = ({children, redirectTo = '/login'}: IAuthorizedProps) =>
  !!isAuthorized() ? children : <Navigate to={redirectTo}/>;

export default AuthorizedHoc;
