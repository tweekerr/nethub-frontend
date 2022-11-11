import React, {FC, PropsWithChildren, ReactNode} from 'react';
import Header from './Header/Header';
import Body from "./Body";
import Flag from "./Flag";
import {Box} from "@chakra-ui/react";
import Footer from "./Footer/Footer";
import cl from './Layout.module.sass';
import {ErrorConfig} from "./ErrorBoundary";

export interface ISectionConfig {
  title?: ReactNode
  children?: ReactNode,
  error?: ErrorConfig
}

export interface ISideBarConfig extends ISectionConfig {
  showSidebar?: boolean
}

export interface ILayoutProps extends PropsWithChildren {
  sideBar?: ISideBarConfig,
  rightBar?: ISectionConfig,
  title?: ReactNode,
  error?: ErrorConfig
  hf?: { header?: boolean, footer?: boolean }
}

const Layout: FC<ILayoutProps> =
  ({
     children, sideBar, rightBar,
     title, error, hf
   }) => {

    return (
      <Box className={cl.mainBody} minH={'100%'}>
        <Flag/>
        {(hf?.header ?? true) ? <Header/> : null}
        <Body
          sideBar={sideBar}
          rightBar={rightBar}
          title={title}
          error={error}
        >
          {children}
        </Body>

        {(hf?.footer ?? true) ? <Footer/> : null}
      </Box>
    );
  };

export default Layout;
