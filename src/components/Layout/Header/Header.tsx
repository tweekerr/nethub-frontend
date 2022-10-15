import React from 'react';
import SvgSelector from '../../basisComps/SvgSelector/SvgSelector';
import UiInput from '../../UI/input/UiInput';
import classes from './Header.module.sass'
import layoutClasses from '../Layout.module.sass'
import LoggedUserBar from './LoggedUserBar';
import TextLinker from '../../basisComps/TextLinker';
import {Box, Switch} from '@mui/material';
import UnloggedUserBar from './UnloggedUserBar';
import {useActions, useAppSelector} from "../../../store/storeConfiguration";
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {
  const {switchTheme} = useActions();
  const {isLogin} = useAppSelector((state) => state.generalReducer);
  const navigate = useNavigate();

  return (
    <Box bgcolor={'header.main'}  className={classes.header}>
      <div className={layoutClasses.left}>
        <a onClick={() => navigate('/')}>
          <SvgSelector className={classes.logo} id="navbarLogo"/>
        </a>
      </div>
      <div className={layoutClasses.center} style={{justifyContent: 'center'}}>
        <div className={classes.headerCenter}>
          <UiInput
            placeholder={'Пошук'}
            value={''}
            setValue={() => console.log(' ')}
            width={"70%"}
          />
          <TextLinker
            onClick={() => {
            }}
            placeholder={'Створити'}
            link={'/article/20037/ua'}
            svgId={'DriveFileRenameOutlineIcon'}
          />
          <Switch onClick={() => switchTheme()}/>
        </div>
      </div>
      <div className={layoutClasses.right}>
        <div className={classes.userEntry}>
          {isLogin ? <LoggedUserBar/> : <UnloggedUserBar/>}
        </div>
      </div>
    </Box>
  );
};
export default Header;
