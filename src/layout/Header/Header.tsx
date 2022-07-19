import React from 'react';
import SvgSelector from '../../components/basisComps/SvgSelector/SvgSelector';
import BasicInput from '../../components/basisComps/BasicInput/BasicInput';
//@ts-ignore
import classes from './Header.module.css';
import LoggedUserBar from './LoggedUserBar';
import BasicLinker from '../../components/basisComps/BasicLinker';
import { api } from '../../api';
import { useActions } from 'utils';
import { Switch } from '@mui/material';
import { useAppSelector } from 'store';
import UnloggedUserBar from './UnloggedUserBar';

const Header: React.FC = () => {
  const { updateArticleId, switchTheme } = useActions();
  const { isLogin } = useAppSelector((state) => state.generalReducer);

  const createArticlePlug = () => {
    api.createArticles({}).then((res) => {
      updateArticleId(res.id);
    });
  };

  return (
    <header>
      <div className="headerContainer">
        <div className={classes.headerContainer}>
          <SvgSelector id="navbarLogo" />
          <div className={classes.inputWithLink}>
            <BasicInput
              placeholder={'Пошук'}
              value={''}
              setValue={() => console.log(' ')}
              width={470}
            />
            <BasicLinker
              onClick={createArticlePlug}
              linktxt={'Створити статтю'}
              svgid={'DriveFileRenameOutlineIcon'}
            />
            <Switch onClick={() => switchTheme()} />
          </div>
          <div className={classes.userEntry}>
            {isLogin ? <LoggedUserBar /> : <UnloggedUserBar />}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
