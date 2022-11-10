import React, {useRef, useState} from 'react';
import GoogleAuthButton from "./Buttons/GoogleAuthButton";
import TelegramAuthButton from "./Buttons/TelegramAuthButton";
import TitleInput from "../UI/TitleInput/TitleInput";
import ISsoRequest from "../../types/api/Sso/ISsoRequest";
import {userApi} from "../../api/api";
import {useNavigate} from "react-router-dom";
import FacebookAuthButton from "./Buttons/FacebookAuthButton";
import LoginService from "../../utils/LoginService";
import {ProviderType} from "../../types/ProviderType";
import {isNotNullOrWhiteSpace} from "../../utils/validators";
import {useDebounce} from "../../hooks/useDebounce";
import useValidator from "../../hooks/useValidator";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import {useActions} from "../../store/storeConfiguration";
import {usernameDebounce} from '../../utils/debounceHelper';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Text,
  useColorModeValue
} from "@chakra-ui/react";

interface ISecondStep {
  isExpanded: boolean,
  enableEmail: boolean
}

const Login = () => {
  const [registrationStep, setRegistrationStep] = useState<ISecondStep>({isExpanded: false, enableEmail: false});
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
  const accordionButtonRef = useRef<HTMLButtonElement | null>(null);

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
    let isExpanded = registrationStep.isExpanded;

    if (isExpanded) {
      accordionButtonRef.current?.click();
      isExpanded = !isExpanded;
    }
    setRegistrationStep({isExpanded: false, enableEmail: false});

    const providerRequest = await LoginService.ProviderHandle(provider);
    setRequest(providerRequest);

    const {isProviderRegistered} = await userApi.checkIfExists(providerRequest.providerKey, provider);
    if (!isProviderRegistered) {
      if (!isExpanded) {
        accordionButtonRef.current?.click();
        isExpanded = !isExpanded
      }
      setRegistrationStep({isExpanded, enableEmail: !providerRequest.email});
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
    <>
      <Accordion allowToggle>
        <AccordionItem bg={useColorModeValue('#F3EEFF', '#333439')} padding={'20px'} borderRadius={'12px'}>
          <Text as={'b'} color={useColorModeValue('#757575', 'whiteDark')}>
            Оберіть спосіб авторизації
          </Text>
          <Box margin={'10px'}/>
          <Box display={'flex'} gap={6} mt={'5px'}>
            <GoogleAuthButton onClick={async () => await firstStep(ProviderType.GOOGLE)}/>
            {/*<GoogleAuthButton onClick={() => accordionButtonRef.current?.click()}/>*/}
            <TelegramAuthButton onClick={async () => await firstStep(ProviderType.TELEGRAM)}/>
            <FacebookAuthButton onClick={async () => await firstStep(ProviderType.FACEBOOK)}/>
          </Box>
          <AccordionButton ref={accordionButtonRef} display={'none'}/>
          <AccordionPanel paddingInlineStart={0} paddingInlineEnd={0}>
            <Box margin={'10px'}/>
            <Text as={'p'} fontWeight={700}>Уточніть інформацію</Text>
            <Box margin={'10px'}/>
            <TitleInput
              title={'Username*'} placeholder={'Ім\'я користувача'} value={request.username!}
              isInvalid={errors.username}
              onChange={(e) => {
                updateRequest('username', e.target.value);
                if (e.target.value !== null && e.target.value !== '')
                  debounce(e.target.value)
              }}
              width={'100%'}
            />
            <TitleInput
              title={'Email*'} placeholder={'Електронна пошта'} value={request.email!}
              isInvalid={errors.email}
              onChange={(e) => updateRequest('email', e.target.value)}
              width={'100%'}
              isDisabled={!registrationStep.enableEmail}
            />
            <TitleInput
              title={'Firstname*'} placeholder={'Iм\'я'} value={request.firstName!}
              isInvalid={errors.firstName}
              onChange={(e) => updateRequest('firstName', e.target.value)}
              width={'100%'}
            />
            <TitleInput
              title={'Lastname*'} placeholder={'Прізвище'} value={request.lastName!}
              isInvalid={errors.lastName}
              onChange={(e) => updateRequest('lastName', e.target.value)}
              width={'100%'}
            />
            <TitleInput
              title={'Middlename'} placeholder={'По-батькові'} value={request.middleName}
              isInvalid={errors.middleName}
              onChange={(e) => updateRequest('middleName', e.target.value)}
              width={'100%'}
            />
            <Button onClick={secondStep}>Зареєструватись</Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

interface ILoginErrors {
  username: boolean,
  email: boolean,
  firstName: boolean,
  lastName: boolean,
  middleName: boolean,
}

export default Login;
