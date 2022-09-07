import React, {useCallback, useState} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledFirstStep,
  StyledRoot,
  StyledSecondStep
} from "./styled";
import GoogleAuthButton from "./Buttons/GoogleAuthButton";
import TelegramAuthButton from "./Buttons/TelegramAuthButton";
import TitleInput from "../basisComps/titleInput/TitleInput";
import ISsoRequest from "../../types/api/Sso/ISsoRequest";
import {useActions} from "../../utils";
import UiButton from "../UI/button/UiButton";
import {api} from "../../api/api";
import {useLocation} from "react-router-dom";
import classes from './Login.module.sass'
import FacebookAuthButton from "./Buttons/FacebookAuthButton";
import LoginService from "../../utils/LoginService";
import {ProviderType} from "../../types/ProviderType";

const Login = () => {
  const [secondExpanded, setSecondExpanded] = useState(false);
  const [request, setRequest] = useState<ISsoRequest>({} as ISsoRequest);
  const {setUser, login} = useActions();
  const location = useLocation()

  const setReduxUser = (username: string, photoLink: string | null) => setUser({username, profilePhoto: photoLink});

  const updateRequest = (key: string, value: string) => {
    setRequest((prev) => {
      console.log({...prev, [key]: value})
      return {...prev, [key]: value}
    })
  }

  const firstStep = async (e: React.MouseEvent, provider: ProviderType) => {
    e.preventDefault();
    const providerRequest = await LoginService.ProviderHandle(setReduxUser, provider);
    setRequest(providerRequest);
    const {isProviderRegistered} = await api.checkIfExists(providerRequest.providerKey, provider);
    if (!isProviderRegistered) {
      setSecondExpanded(true);
      return;
    }
    const user = await api.authenticate({...providerRequest, type: "login"});
    login(user);
  }

  const secondStep = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('request', request)
    const user = await api.authenticate(request);
    login(user);
  }

  return (
    <StyledRoot>
      <Typography
        mb={2}
        display={'initial'}
        color={'secondary.contrastText'}
        fontWeight={700}
        variant="h4"
      >
        Вітаємо на{' '}
      </Typography>
      <Typography
        display={'initial'}
        variant="h4"
        fontWeight={700}
        color={'primary.contrastText'}
      >
        NetHub!
      </Typography>

      <StyledFirstStep>
        <Typography color={'secondary'} fontWeight={700}>
          Оберіть спосіб авторизації
        </Typography>
        <Grid mt={2} container>
          <GoogleAuthButton onClick={(e) => firstStep(e, ProviderType.GOOGLE)}/>
          {/*<button onClick={() => setSecondExpanded(!secondExpanded)}>expand</button>*/}
          {/*<button onClick={() => console.log('button', request)}>expand</button>*/}
          <TelegramAuthButton onClick={(e) => firstStep(e, ProviderType.TELEGRAM)}/>
          <FacebookAuthButton onClick={(e) => firstStep(e, ProviderType.FACEBOOK)}/>
        </Grid>
      </StyledFirstStep>
      <Box margin={'10px'}></Box>
      <StyledAccordion className={secondExpanded ? classes.accordionActive : classes.accordionDisabled} disableGutters
                       expanded={secondExpanded} disabled={!secondExpanded}>
        <StyledAccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color={'secondary'} fontWeight={700}>Уточніть інформацію</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <StyledSecondStep>
            <TitleInput title={'Username'} placeholder={'Ім\'я користувача'} value={request.username}
                        setValue={(username: string) => updateRequest('username', username)}
                        width={'100%'}/>
            <TitleInput title={'Firstname'} placeholder={'Iм\'я'} value={request.firstName}
                        setValue={(firstname: string) => updateRequest('firstname', firstname)}
                        width={'100%'}/>
            <TitleInput title={'Lastname'} placeholder={'Прізвище'} value={request.lastName}
                        setValue={(lastname: string) => updateRequest('lastname', lastname)}
                        width={'100%'}/>
            <TitleInput title={'Middlename'} placeholder={'По-батькові'} value={request.middleName}
                        setValue={(middlename: string) => updateRequest('middlename', middlename)}
                        width={'100%'}/>
            <UiButton onClick={secondStep}>Зареєструватись</UiButton>
          </StyledSecondStep>
        </StyledAccordionDetails>
      </StyledAccordion>
    </StyledRoot>
  );
};

export default Login;
