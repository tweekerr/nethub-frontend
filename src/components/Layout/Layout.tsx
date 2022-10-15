import {Box} from '@mui/material';
import React, {FC, PropsWithChildren, ReactNode} from 'react';
import Header from './Header/Header';
import Body from "./Body";
import Flag from "./Flag";

export interface ILayoutProps extends PropsWithChildren {
  showSidebar?: boolean,
  customSidebar?: ReactNode,
  rightBar?: ReactNode
  titles?: { left?: ReactNode, center?: ReactNode, right?: ReactNode },
  showHeader?: boolean,
  showFooter?: boolean
}

const Layout: FC<ILayoutProps> =
  ({
     children, showSidebar = true, customSidebar, rightBar,
     titles, showHeader = true, showFooter = true
   }) => {

    return (
      <Box sx={{bgcolor: 'background.default'}}>
        <Flag/>
        {showHeader && <Header/>}
        <Body showSidebar={showSidebar}
              customSidebar={customSidebar}
              rightBar={rightBar}
              titles={titles}
        >
          {children}
        </Body>

        {/*{showFooter && 'Footer'}*/}
      </Box>
    );
  };

export default Layout;
