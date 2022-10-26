import React, {useState} from 'react';
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
import UiButton from "../UI/button/UiButton";
import {userApi} from "../../api/userApi";
import {useNavigate} from "react-router-dom";
import classes from './Login.module.sass'
import FacebookAuthButton from "./Buttons/FacebookAuthButton";
import LoginService from "../../utils/LoginService";
import {ProviderType} from "../../types/ProviderType";
import {isNotNullOrWhiteSpace} from "../../utils/validators";
import {useDebounce} from "../../hooks/useDebounce";
import useValidator from "../../hooks/useValidator";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import {useActions} from "../../store/storeConfiguration";
import {usernameDebounce} from '../../utils/debounceHelper';

interface ISecondStep {
  isActive: boolean,
  enableEmail: boolean
}

interface ILoginErrors {
  username: boolean,
  email: boolean,
  firstName: boolean,
  lastName: boolean,
  middleName: boolean,
}

const Login = () => {
  const [registrationStep, setRegistrationStep] = useState<ISecondStep>({isActive: false, enableEmail: false});
  const [request, setRequest] = useState<ISsoRequest>({
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  } as ISsoRequest);
  const {login} = useActions();
  const {enqueueError} = useCustomSnackbar();
  const {subscribeValidator, validateAll, errors, setErrors} = useValidator<ILoginErrors>();
  const navigate = useNavigate();

  const debounceLogic = async (username: string | null) => await usernameDebounce(username, setErrors, errors, enqueueError);
  const debounce = useDebounce(debounceLogic, 1000);

  const validate = async () => {
    subscribeValidator({
      value: request.username,
      field: 'username',
      validators: [isNotNullOrWhiteSpace, debounceLogic]
    })
    subscribeValidator({
      value: request.firstName,
      field: 'firstName',
      validators: [isNotNullOrWhiteSpace],
      message: "Невірно введене ім'я"
    })
    subscribeValidator({
      value: request.lastName,
      field: 'lastName',
      validators: [isNotNullOrWhiteSpace],
      message: "Невірно введене прізвище"
    })
    subscribeValidator({value: request.email, field: 'email', validators: [isNotNullOrWhiteSpace]})

    const {isSuccess, errors} = await validateAll();
    if (!isSuccess) errors.forEach(enqueueError)

    return isSuccess;
  }

  const updateRequest = (key: string, value: string) => {
    setRequest((prev) => {
      return {...prev, [key]: value}
    })
  }

  const firstStep = async (provider: ProviderType) => {
    setRegistrationStep({isActive: false, enableEmail: false});
    const providerRequest = await LoginService.ProviderHandle(provider);
    setRequest(providerRequest);

    const {isProviderRegistered} = await userApi.checkIfExists(providerRequest.providerKey, provider);
    if (!isProviderRegistered) {
      setRegistrationStep({isActive: true, enableEmail: !providerRequest.email});
      return;
    }
    const user = await userApi.authenticate({...providerRequest, type: "login"});
    login(user);
    navigate(-1);
  }

  const secondStep = async () => {
    if (!await validate())
      return;
    try {
      const user = await userApi.authenticate({...request, type: "register"});
      login(user);
    } catch (e: any) {
      if (e.response.data.message.includes('already taken')) {
        enqueueError('Користувач з такою електронною адресою вже зареєстрований')
      }
    }
  }

  return (
    <StyledRoot>
      <StyledFirstStep>
        <Typography color={'secondary'} fontWeight={700}>
          Оберіть спосіб авторизації
        </Typography>
        <Grid mt={2} container>
          <GoogleAuthButton onClick={async () => await firstStep(ProviderType.GOOGLE)}/>
          <TelegramAuthButton onClick={async () => await firstStep(ProviderType.TELEGRAM)}/>
          <FacebookAuthButton onClick={async () => await firstStep(ProviderType.FACEBOOK)}/>
        </Grid>
      </StyledFirstStep>
      <Box margin={'10px'}></Box>
      <StyledAccordion
        className={registrationStep.isActive ? classes.accordionActive : classes.accordionDisabled}
        disableGutters
        expanded={registrationStep.isActive} disabled={!registrationStep.isActive}
      >
        <StyledAccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color={'secondary'} fontWeight={700}>Уточніть інформацію</Typography>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <StyledSecondStep>
            <TitleInput
              title={'Username*'} placeholder={'Ім\'я користувача'} value={request.username}
              error={errors.username}
              setValue={(username: string) => {
                updateRequest('username', username);
                if (username !== null && username !== '')
                  debounce(username)
              }}
              width={'100%'}
            />
            <TitleInput
              title={'Email*'} placeholder={'Електронна пошта'} value={request.email}
              error={errors.email}
              setValue={(email: string) => updateRequest('email', email)}
              width={'100%'}
              disabled={!registrationStep.enableEmail}
            />
            <TitleInput
              title={'Firstname*'} placeholder={'Iм\'я'} value={request.firstName}
              error={errors.firstName}
              setValue={(firstname: string) => updateRequest('firstName', firstname)}
              width={'100%'}
            />
            <TitleInput
              title={'Lastname*'} placeholder={'Прізвище'} value={request.lastName}
              error={errors.lastName}
              setValue={(lastname: string) => updateRequest('lastName', lastname)}
              width={'100%'}
            />
            <TitleInput
              title={'Middlename'} placeholder={'По-батькові'} value={request.middleName}
              error={errors.middleName}
              setValue={(middlename: string) => updateRequest('middleName', middlename)}
              width={'100%'}
            />
            <UiButton onClick={secondStep}>Зареєструватись</UiButton>
          </StyledSecondStep>
        </StyledAccordionDetails>
      </StyledAccordion>
    </StyledRoot>
  );
};

export default Login;
