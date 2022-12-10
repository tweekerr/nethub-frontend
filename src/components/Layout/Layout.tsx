import React, {FC, PropsWithChildren, ReactElement} from 'react';
import Header from './Header/Header';
import Body from "./Body";
import Flag from "./Flag";
import {Box} from "@chakra-ui/react";
import Footer from "./Footer/Footer";
import cl from './Layout.module.sass';

export interface ISectionConfig {
  showError?: boolean
}

export interface ISideBarConfig extends ISectionConfig {
  showSidebar?: boolean
}

export interface IMainConfig {
  header?: {show?: boolean, custom?: ReactElement}
  footer?: {show?: boolean, custom?: ReactElement}
}

export interface ILayoutProps extends PropsWithChildren{
  children: [ReactElement, ReactElement, ReactElement] | [ReactElement, ReactElement],
  Config?: { Left?: ISideBarConfig, Center?: ISectionConfig, Right?: ISectionConfig, Main?: IMainConfig}
  Titles?: {left?: ReactElement, center?: ReactElement, right?: ReactElement}
}

const Layout: FC<ILayoutProps> =
  ({children, Config, Titles}) => {
    const left = children.length === 3 ? children[0] : undefined;
    const center = children.length === 3 ? children[1] : children[0];
    const right = children.length === 3 ? children[2] : children[1];

    return (
      <Box className={cl.mainBody} minH={'100%'}>
        <Flag/>
        {(Config?.Main?.header?.show ?? true) ? <Header/> : null}
        <Body
          Left={left}
          Center={center}
          Right={right}
          Titles={Titles}
          Config={Config}
        />

        {(Config?.Main?.footer?.show ?? true) ? <Footer/> : null}
      </Box>
    );
  };

export type Page = FC & { Provider: FC<PropsWithChildren> }

export default Layout;
