import React from 'react';
import SvgSelector from '../../components/basisComps/SvgSelector/SvgSelector';
import BasicInput from '../../components/basisComps/BasicInput/BasicInput';
import classes from './Header.module.css';
import LoggedUserBar from './LoggedUserBar';
import BasicLinker from '../../components/basisComps/BasicLinker';
import { updateArticleId } from '../../store/plugArticleSlice';
import { useDispatch } from 'react-redux';
import { api } from '../../api';
import UnloggedUserBar from "./UnloggedUserBar";

const Header = (config) => {
  const dispatch = useDispatch();

  const createArticlePlug = (e) => {
    api.createArticles({}).then((res) => {
      dispatch(updateArticleId(res.data.id));
    });
  };
  return (
    <header>
      <div className='mainContainer'>
        <div className={classes.headerContainer}>
          <SvgSelector className={classes.svgLogo} id='navbarLogo' />
          <div className={classes.inputWithLink}>
            <BasicInput placeholder={'Пошук'} width={470} />
            <BasicLinker
              onClick={createArticlePlug}
              linktxt={'Створити статтю'}
              svgid={'DriveFileRenameOutlineIcon'}
            />
          </div>
          <div className={classes.userEntry}>
            {/*<UnloggedUserBar/>*/}
            <LoggedUserBar />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
