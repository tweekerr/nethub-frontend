import {Box, Grid, Typography} from '@mui/material';
import React, {useState} from 'react';
import {
  StyledAccordion,
  StyledAccordionDetails,
  StyledAccordionSummary,
  StyledFirstStep,
  StyledRoot,
  StyledSecondStep
} from './styled';
import Header from "../Layout/Header/Header";
import {ProviderType, sso} from "../../utils/sso";
import {useActions} from '../../utils';
import ISsoRequest from "../../types/api/Sso/ISsoRequest";
import GoogleAuthButton from "./Buttons/GoogleAuthButton";
import TitleInput from "../basisComps/titleInput/TitleInput";
import {useAppDispatch, useAppSelector} from "../../store";
import {generalActions} from "../../store/generalSlice";
import Test from "./Buttons/Test";

export const AuthSpace = () => {
  const dispatch = useAppDispatch();
  const {user: reduxUser} = useAppSelector(state => state.generalReducer);

  const {login} = useActions();
  const [request, setRequest] = useState<ISsoRequest>({
    username: 'tweeker',
    firstname: '',
    lastname: '',
    middlename: '',
    email: ''
  } as ISsoRequest);
  const [secondExpanded, setSecondExpanded] = useState(false);

  const setProfileImageToRedux = (photoLink: string) => dispatch(generalActions.setUser({
    ...reduxUser,
    profilePhotoLink: photoLink
  }));

  console.log(reduxUser, request);

  const submitLogin = (e: React.MouseEvent, provider: ProviderType) => {
    e.preventDefault();
    sso(setRequest, setProfileImageToRedux, provider).then((res) => {
      setSecondExpanded(true);
    });
  };

  return (
    <Box sx={{backgroundColor: 'background.default'}}>
      <Header/>
      <div className={'layoutContainer'}>
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
              <button onClick={() => setSecondExpanded(!secondExpanded)}>set</button>
              <Test botName={'nethub_official_bot'}
                    buttonSize={'large'}
                    widgetVersion={19}
              />



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
                            setValue={(username: string) => setRequest({...request, username})}
                            width={'100%'}/>
                <TitleInput title={'Firstname'} placeholder={'Iм\'я'} value={request.firstname}
                            setValue={(firstname: string) => setRequest({...request, firstname})}
                            width={'100%'}/>
                <TitleInput title={'Lastname'} placeholder={'Прізвище'} value={request.lastname}
                            setValue={(lastname: string) => setRequest({...request, lastname})}
                            width={'100%'}/>
                <TitleInput title={'Middlename'} placeholder={'По-батькові'} value={request.middlename}
                            setValue={(middlename: string) => setRequest({...request, middlename})}
                            width={'100%'}/>
              </StyledSecondStep>
            </StyledAccordionDetails>
          </StyledAccordion>
        </StyledRoot>
      </div>
    </Box>
  );
};
