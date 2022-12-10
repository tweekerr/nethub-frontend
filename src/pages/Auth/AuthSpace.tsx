import React from 'react';
import Login from "../../components/Auth/Login";
import {Box, Text} from "@chakra-ui/react";
import {LFC2} from "../../components/Layout/LFC";


export const AuthSpace: LFC2 = () => {

  return {
    Left: {render: <></>, config: {showSidebar: false}},
    Center: {
      Render: <Login/>, title: <Box display={"flex"}>
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
    },
    ContextProvider: React.Fragment
  };
}