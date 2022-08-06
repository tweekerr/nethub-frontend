import React from 'react';
import Avatar from '@mui/material/Avatar';
import classes from './Header.module.css';
import { Typography } from '@mui/material';
import { useAppSelector } from 'store';
import { useActions } from 'utils';

const LoggedUserBar = () => {
  const { user } = useAppSelector((state) => state.generalReducer);
  const { logout } = useActions();
  return (
    <div className={classes.userNameAvatar}>
      <div className={classes.avatarBlock}>
        <Avatar sx={{ bgcolor: 'black' }}>N</Avatar>
        <Typography variant="subtitle1" color={'primary'}>
          {user?.username}
        </Typography>
      </div>

      <Typography onClick={() => logout()} color={'primary'}>
        Log out
      </Typography>
    </div>
  );
};

export default LoggedUserBar;
