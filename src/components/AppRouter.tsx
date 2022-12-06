import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {paths} from "../routes/paths";
import {ChakraProvider} from "@chakra-ui/react";
import LayoutHoc from "../hocs/LayoutHoc";
import Layout from "./Layout/Layout";
import theme from "../constants/themes";
import NotFoundSpace from "../pages/NotFoundSpace";

const AppRouter: FC = () => {
  return (
    <Routes>
      {paths.map(({path, Component, authorized}) => {
        const Called = Component();

        return <Route
          key={path} path={path} element={
          <ChakraProvider>
            <LayoutHoc authorized={authorized}>
              <Layout
                left={{
                  render: Called.Left?.render ?? null,
                  config: Called.Left?.config
                }}

                center={{
                  render: Called.Center?.render ?? null,
                  config: Called.Center?.config
                }}

                right={{
                  render: Called.Right?.render ?? null,
                  config: Called.Right?.config
                }}
              />
            </LayoutHoc>
          </ChakraProvider>}
        />
      })
      }
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
