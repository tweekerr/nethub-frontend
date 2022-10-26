import React, {FC, useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import classes from './Header.module.sass';
import {Typography} from '@mui/material';
import {useActions, useAppSelector} from "../../../store/storeConfiguration";
import {createImageFromInitials} from "../../../utils/logoGenerator";
import {useNavigate} from "react-router-dom";

const LoggedUserBar: FC = () => {
    const {user} = useAppSelector((state) => state.generalReducer);
    const {logout} = useActions();
    const navigate = useNavigate();
    const getImage = () => user.profilePhotoLink ?? createImageFromInitials(500, user.username);
    const [image, setImage] = useState<string>(getImage());

    useEffect(() => {
      setImage(getImage())
    }, [user.profilePhotoLink])

    function handleLogout() {
      logout();
      navigate('/');
    }

    return (
      <div className={classes.loggedBar}>
        <div className={classes.avatarBlock}>
          <Avatar
            src={image}
            onError={() => setImage(createImageFromInitials(500, user.username))}
          />
          <Typography variant="subtitle1" color={'primary'}>
            {user.username}
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
