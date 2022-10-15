import React from 'react';
import Layout from "../Layout/Layout";
import Login from "./Login";
import {useTranslation} from "react-i18next";
import {Typography} from '@mui/material';

export const AuthSpace = () => {

  const titles = {
    center: <div style={{display: "flex"}}><Typography
      mb={2}
      display={'initial'}
      color={'secondary.contrastText'}
      fontWeight={700}
      variant="h4"
    >
      Вітаємо на 
    </Typography>
      <Typography
        display={'initial'}
        variant="h4"
        fontWeight={700}
        color={'primary.contrastText'}
      >
        NetHub!
      </Typography></div>
  }

  return (
    <Layout showSidebar={false} titles={titles}>
      <Login/>
    </Layout>
  );
};
