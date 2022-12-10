import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {paths} from "../routes/paths";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "../constants/themes";
import NotFoundSpace from "../pages/NotFoundSpace";
import ErrorBoundary from "./Layout/ErrorBoundary";

const AppRouter: FC = () => {
  return (
    <ErrorBoundary main={true}>
      <Routes>
        {paths.map(({path, Component, authorized}) => {

          return <Route
            key={path} path={path} element={
            <ChakraProvider>
              <Component.Provider>
                <Component/>
              </Component.Provider>
            </ChakraProvider>}
          />
        })}
        <Route
          path={'*'} element={
          <ChakraProvider theme={theme}>
            <NotFoundSpace/>
          </ChakraProvider>
        }
        />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRouter;
