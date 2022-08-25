import React from 'react';
import SvgSelector from '../../basisComps/SvgSelector/SvgSelector';
import UiInput from '../../UI/input/UiInput';
import classes from './Header.module.scss'
import LoggedUserBar from './LoggedUserBar';
import BasicLinker from '../../basisComps/BasicLinker';
import {api} from '../../../api/api';
import {Switch} from '@mui/material';
import UnloggedUserBar from './UnloggedUserBar';
import {useActions} from "../../../utils";
import {useAppSelector} from "../../../store";

const Header: React.FC = () => {
  const { switchTheme} = useActions();
  const {isLogin} = useAppSelector((state) => state.generalReducer);

  // const createArticlePlug = () => {
  //   api.createArticles().then((res) => {
  //     updateArticleId(res.id);
  //   });
  // };

  return (
    <header className={classes.header}>
      {/*<div className="headerWrapper">*/}
      {/*//TODO: ASK*/}
      <div>
        <div className={classes.headerContainer}>
          <SvgSelector id="navbarLogo"/>
          <div className={classes.inputWithLink}>
            <UiInput
              placeholder={'Пошук'}
              value={''}
              setValue={() => console.log(' ')}
              width={"470px"}
            />
            <BasicLinker
              onClick={() => {}}
              linktxt={'Створити статтю'}
              svgid={'DriveFileRenameOutlineIcon'}
            />
            <Switch onClick={() => switchTheme()}/>
          </div>
          <div className={classes.userEntry}>
            {isLogin ? <LoggedUserBar/> : <UnloggedUserBar/>}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
