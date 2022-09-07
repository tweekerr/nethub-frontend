import {Box} from '@mui/material';
import React, {FC, PropsWithChildren, ReactNode} from 'react';
import Header from './Header/Header';
import Body from "./Body";
import Flag from "./Flag";

export interface ILayoutProps extends PropsWithChildren {
  showSidebar?: boolean,
  customSidebar?: ReactNode,
  rightBar?: ReactNode
}

const Layout: FC<ILayoutProps> = ({children, showSidebar = true, customSidebar, rightBar}) => {

  return (
    <Box sx={{bgcolor: 'background.default'}}>
      <Flag/>
      <Header/>
      <Body showSidebar={showSidebar}
            customSidebar={customSidebar}
            rightBar={rightBar}
      >
        {children}
      </Body>

      //Footer
    </Box>
  );
};

export default Layout;
