import React, {FC} from 'react';
import Avatar from '@mui/material/Avatar';
import classes from './Header.module.scss';
import {Typography} from '@mui/material';
import {useActions} from "../../../utils";
import {useAppSelector} from "../../../store";
import {createImageFromInitials} from "../../../utils/logoGenerator";

// const {user} = useAppSelector(state => state.generalReducer)
const LoggedUserBar: FC = () => {
    const {user} = useAppSelector((state) => state.generalReducer);
    const {logout} = useActions();
    return (
      <div className={classes.loggedBar}>
        <div className={classes.avatarBlock}>
          <Avatar src={createImageFromInitials(500, user.username ?? 'NetHub')}></Avatar>
          <Typography variant="subtitle1" color={'primary'}>
            {/*{user?.username}*/}
            tweeker
          </Typography>
        </div>

        <Typography className={classes.logOut} onClick={logout} color={'primary'}>
          Log out
        </Typography>
      </div>
    );
  }
;

export default LoggedUserBar;
