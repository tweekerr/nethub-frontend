import {Box} from '@mui/material';
import React, {FC, PropsWithChildren} from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

interface ILayoutProps extends PropsWithChildren {
  rightBar?: () => JSX.Element
}

const Layout: FC<ILayoutProps> = ({children, rightBar}) => {
  return (
    <Box sx={{bgcolor: 'background.default'}}>
      <Header/>
      <div className={'layoutContainer'}>
        <Sidebar/>
        {children}
      </div>
      //Footer
    </Box>
  );
};

export default Layout;
