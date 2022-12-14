import React, {useMemo} from 'react';
import SvgSelector from '../../UI/SvgSelector/SvgSelector';
import cl from './Header.module.sass'
import layoutClasses from '../Layout.module.sass'
import LoggedUserBar from './LoggedUserBar';
import UnloggedUserBar from './UnloggedUserBar';
import {useNavigate} from "react-router-dom";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Switch,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {useAppStore} from "../../../store/config";

const Header: React.FC = () => {

  const {toggleColorMode, colorMode} = useColorMode();
  const isLogin = useAppStore(state => state.isLogin);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState<string>('');
  const headerBackgroundColor = useColorModeValue("#FFFFFF", '#323232')

  const isSwitched = useMemo(() => colorMode !== 'light', [colorMode]);

  return (
    <header className={cl.header} style={{backgroundColor: headerBackgroundColor}}>
      <Box className={layoutClasses.left}>
        <Link onClick={() => navigate('/')}>
          <SvgSelector className={cl.logo} id={colorMode === 'light' ? 'LightLogo' : 'DarkLogo'}/>
        </Link>
      </Box>
      <Box className={layoutClasses.center} style={{justifyContent: 'center'}}>
        <Box className={cl.headerCenter}>

          <InputGroup width={'70%'}>
            <InputLeftElement
              pointerEvents='none'
              children={<SearchIcon color={useColorModeValue('#B1BAC5', '#757575')}/>}
            />
            <Input
              variant={'outline'}
              value={searchValue}
              placeholder={'Пошук'}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </InputGroup>

          <Button
            onClick={() => navigate('/article/20037/ua')}
          >
            Створити
            <SvgSelector id={'DriveFileRenameOutlineIcon'}/>

          </Button>
          {/*<Switch id="email-alerts" />*/}
          <Switch onChange={toggleColorMode} defaultChecked={isSwitched} size='md'/>
        </Box>
      </Box>
      <Box className={layoutClasses.right}>
        <Box className={cl.userEntry}>
          {isLogin ? <LoggedUserBar/> : <UnloggedUserBar/>}
        </Box>
      </Box>
    </header>
  );
};

export default Header;
