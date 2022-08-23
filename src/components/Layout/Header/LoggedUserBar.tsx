import React, {FC} from 'react';
import Avatar from '@mui/material/Avatar';
import classes from './Header.module.scss';
import {Typography} from '@mui/material';
import {useAppSelector} from "../../../store";
import {useActions} from "../../../utils";

// const {user} = useAppSelector(state => state.generalReducer)
const LoggedUserBar: FC = () => {
    const {user} = useAppSelector((state) => state.generalReducer);
    const {logout} = useActions();
    return (
      <div className={classes.userNameAvatar}>
        <div className={classes.avatarBlock}>
          <Avatar sx={{bgcolor: 'black'}}>N</Avatar>
          <Typography variant="subtitle1" color={'primary'}>
            {/*{user?.username}*/}
            tweeker
          </Typography>
        </div>

        <Typography onClick={() => logout()} color={'primary'}>
          Log out
        </Typography>
      </div>
    );
  }
;

export default LoggedUserBar;
