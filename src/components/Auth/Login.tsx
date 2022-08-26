import React, {useState} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledFirstStep, StyledRoot,
  StyledSecondStep
} from "./styled";
import GoogleAuthButton from "./Buttons/GoogleAuthButton";
import {ProviderType, sso} from "../../utils/sso";
import TelegramAuthButton from "./Buttons/TelegramAuthButton";
import TitleInput from "../basisComps/titleInput/TitleInput";
import ISsoRequest from "../../types/api/Sso/ISsoRequest";
import {useActions} from "../../utils";

const Login = () => {
  const [secondExpanded, setSecondExpanded] = useState(false);
  const [request, setRequest] = useState<ISsoRequest>({} as ISsoRequest);
  const {setUser} = useActions();

  const expandSecondStep = () => setSecondExpanded(true);
  const setReduxUser = (username: string, photoLink: string | null) => setUser({username, profilePhoto: photoLink});

  const updateRequest = (key: string, value: string) => {
    setRequest((prev) => {
      console.log({...prev, [key]: value})
      return {...prev, [key]: value}
    })
  }

  const submitLogin = (e: React.MouseEvent, provider: ProviderType) => {
    e.preventDefault();
    sso(setRequest, setReduxUser, expandSecondStep, provider).catch((e) => console.log(e));
  };

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
          1. Оберіть спосіб авторизації
        </Typography>
        <Grid mt={2} container>
          <GoogleAuthButton onClick={(e) => submitLogin(e, ProviderType.GOOGLE)}/>
          <button onClick={() => setSecondExpanded(!secondExpanded)}>expand</button>
          <TelegramAuthButton onClick={(e) => submitLogin(e, ProviderType.TELEGRAM)}/>
        </Grid>
      </StyledFirstStep>
      <Box margin={'10px'}></Box>
      <StyledAccordion disableGutters expanded={secondExpanded} disabled={!secondExpanded}>
        <StyledAccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color={'secondary'} fontWeight={700}>2. Уточніть інформацію</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <StyledSecondStep>
            <TitleInput title={'Username'} placeholder={'Ім\'я користувача'} value={request.username}
                        setValue={(username: string) => updateRequest('username', username)}
                        width={'100%'}/>
            <TitleInput title={'Firstname'} placeholder={'Iм\'я'} value={request.firstname}
                        setValue={(firstname: string) => updateRequest('firstname', firstname)}
                        width={'100%'}/>
            <TitleInput title={'Lastname'} placeholder={'Прізвище'} value={request.lastname}
                        setValue={(lastname: string) => updateRequest('lastname', lastname)}
                        width={'100%'}/>
            <TitleInput title={'Middlename'} placeholder={'По-батькові'} value={request.middlename}
                        setValue={(middlename: string) => updateRequest('middlename', middlename)}
                        width={'100%'}/>
          </StyledSecondStep>
        </StyledAccordionDetails>
      </StyledAccordion>
    </StyledRoot>
  );
};

export default Login;
