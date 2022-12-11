import React from 'react';
import Login from "../../components/Auth/Login";
import {Box, Text} from "@chakra-ui/react";
import Layout, {Page} from "../../components/Layout/Layout";


export const AuthSpace: Page = () => {
  const config = {Left: {showSidebar: false}}

  const titles = {
    Center: <Box display={"flex"}>
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
    </Box>
  }

  return <Layout Config={config} Titles={titles}>
    <Login/>
  </Layout>
};

AuthSpace.Provider = React.Fragment;