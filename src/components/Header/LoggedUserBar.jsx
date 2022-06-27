import React from 'react';
import Avatar from '@mui/material/Avatar';
import classes from "./Header.module.css"

const LoggedUserBar = () => {
    return (
        <div className={classes.userNameAvatar}>
            <div className={classes.avatarBlock}>
                <Avatar sx={{ bgcolor: "black" }}>N</Avatar>
                <a href="#">tweeker</a>
            </div>

            <a href="#">Log out</a>
        </div>
    );
};

export default LoggedUserBar;
