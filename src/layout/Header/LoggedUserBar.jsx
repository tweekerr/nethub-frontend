import React from 'react';
import Avatar from '@mui/material/Avatar';
import classes from './Header.module.css';
import { Typography } from '@mui/material';

const LoggedUserBar = () => {
  return (
    <div className={classes.userNameAvatar}>
      <div className={classes.avatarBlock}>
        <Avatar sx={{ bgcolor: 'black' }}>N</Avatar>
        <Typography variant="subtitle1" color={'primary'}>
          tweeker
        </Typography>
      </div>

      <Typography color={'primary'}>Log out</Typography>
    </div>
  );
};

export default LoggedUserBar;
