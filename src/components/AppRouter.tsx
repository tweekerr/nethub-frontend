import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {paths} from "../routes/paths";
import AuthorizedHoc from "./Auth/hoc/AuthorizedHoc";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "../constants/themes";
import NotFoundSpace from "../pages/NotFoundSpace";

const AppRouter: FC = () => {
  return (
    <Routes>
      {paths.map(({path, Component, authorized}) =>
        <Route
          key={path} path={path} element={
          <ChakraProvider theme={theme}>
            {authorized ? <AuthorizedHoc>
                <Component/>
              </AuthorizedHoc>
              : <Component/>}
          </ChakraProvider>}
        />
      )}
      <Route
        path={'*'} element={
        <ChakraProvider theme={theme}>
          <NotFoundSpace/>
        </ChakraProvider>
      }
      />
    </Routes>
  );
};

export default AppRouter;
