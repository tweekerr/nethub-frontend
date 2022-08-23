import {Box} from '@mui/material';
import React, {FC, PropsWithChildren} from 'react';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

interface ILayoutProps extends PropsWithChildren {
  //TODO: ASK
  aside: boolean
}

const Layout: FC<ILayoutProps> = ({aside, children}) => {
  return (
    <Box sx={{bgcolor: 'background.default'}}>
      <Header/>
      <div className={'mainContainer'}>
        <Sidebar/>
        {children}
        {aside ? aside : null}
      </div>
      //Footer
    </Box>
  );
};

export default Layout;
