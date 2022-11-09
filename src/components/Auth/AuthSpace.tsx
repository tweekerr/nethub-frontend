import React from 'react';
import Layout from "../Layout/Layout";
import Login from "./Login";
import {Box, Text} from "@chakra-ui/react";

  export const AuthSpace = () => {

  return (
    <Layout
      sideBar={{showSidebar: false}}
      title={<Box display={"flex"}>
        <Text
          mb={2}
          fontWeight={700}
          as={'h4'}
        >
          Вітаємо на
        </Text>
        <Text
          as={'h4'}
          fontWeight={700}
        >
          NetHub!
        </Text>
      </Box>}
    >
      <Login/>
    </Layout>
  );
};
