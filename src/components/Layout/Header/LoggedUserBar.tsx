import React, {FC, useEffect, useState} from 'react';
import {Avatar, Text, useColorModeValue} from '@chakra-ui/react';
import classes from './Header.module.sass';
import {createImageFromInitials} from "../../../utils/logoGenerator";
import {useNavigate} from "react-router-dom";
import {useAppStore} from "../../../store/config";

const LoggedUserBar: FC = () => {
    const {user, logout} = useAppStore();

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
            size={'md'}
            maxW={40}
            maxH={40}
            src={image}
            onError={() => setImage(createImageFromInitials(500, user.username))}
          />
          <Text
            as={'b'}
          >
            {user.username}
          </Text>
        </div>

        <Text
          className={classes.logOut}
          as={'b'}
          color={useColorModeValue('#838383', '#EFEFEF')}
          onClick={handleLogout}
        >
          Log out
        </Text>
      </div>
    );
  }
;

export default LoggedUserBar;
