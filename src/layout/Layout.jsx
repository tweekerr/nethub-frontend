import { Box } from '@mui/material';
import React from 'react';
import Header from './Header/Header';
import Sidebar from './sidebar/Sidebar';

const Layout = (props) => {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Header />
      <div className={'mainContainer'}>
        <Sidebar />
        {props.children}
        {props.aside ? props.aside : null}
      </div>
      //Footer
    </Box>
  );
};

export default Layout;
