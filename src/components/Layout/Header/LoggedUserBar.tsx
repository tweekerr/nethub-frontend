import React, {FC} from 'react';
import Avatar from '@mui/material/Avatar';
import classes from './Header.module.scss';
import {Typography} from '@mui/material';
import {useActions} from "../../../utils";
import {useAppSelector} from "../../../store";
import {createImageFromInitials} from "../../../utils/logoGenerator";
import {useNavigate} from "react-router-dom";

const LoggedUserBar: FC = () => {
    const {user} = useAppSelector((state) => state.generalReducer);
    const {logout} = useActions();
    const navigate = useNavigate();

    function handleLogout() {
      logout();
      navigate('/');
    }

    return (
      <div className={classes.loggedBar}>
        <div className={classes.avatarBlock}>
          <Avatar
            src={!user.profilePhotoLink
              ? createImageFromInitials(500, user.username ?? 'NetHub')
              : user.profilePhotoLink}/>
          <Typography variant="subtitle1" color={'primary'}>
            {user.username}
            {/*tweeker*/}
          </Typography>
        </div>

        <Typography className={classes.logOut} onClick={handleLogout} color={'primary'}>
          Log out
        </Typography>
      </div>
    );
  }
;

export default LoggedUserBar;
