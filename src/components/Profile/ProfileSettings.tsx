import React, {forwardRef, ForwardRefRenderFunction, useImperativeHandle, useMemo, useRef} from 'react';
import TitleInput from "../UI/TitleInput/TitleInput";
import useValidator from "../../hooks/useValidator";
import SvgSelector from "../UI/SvgSelector/SvgSelector";
import cl from './Profile.module.sass'
import {ProfileChangesType} from "./Profile";
import {useDebounce} from "../../hooks/useDebounce";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import {usernameDebounce} from "../../utils/debounceHelper";
import {isNotNullOrWhiteSpace} from "../../utils/validators";
import {Accordion, AccordionButton, AccordionItem, AccordionPanel, Text, useColorModeValue} from "@chakra-ui/react";
import FilledDiv from "../UI/FilledDiv";
import {useAppStore} from "../../store/config";

type RequestType = {
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  middleName?: string,
  description?: string,
};

interface IProfileSettingsProps {
  request: RequestType,
  setRequest: (request: any) => void,
  changes: { add: (value: ProfileChangesType) => void, remove: (value: ProfileChangesType) => void },
  lockFlag: boolean,
  expanded: boolean,
  setExpanded: (value: boolean) => void,
}

interface IProfileSettingsErrors {
  username: boolean,
  email: boolean,
  firstName: boolean,
  lastName: boolean,
  middleName: boolean,
  description: boolean
}

interface IProfileSettingsHandle {
  validateUpdate: () => Promise<boolean>
}

const ProfileSettings: ForwardRefRenderFunction<IProfileSettingsHandle, IProfileSettingsProps> =
  ({request, setRequest, changes, lockFlag, expanded, setExpanded}, ref) => {
    const {enqueueError, enqueueSuccess} = useCustomSnackbar();
    const user = useAppStore(state => state.user);
    const accordionButtonRef = useRef<HTMLButtonElement>(null);

    const debounceLogic = async (username: string | null, showMessage?: boolean) => {
      if (username === user.username) {
        setErrors({...errors, username: false});
        changes.remove('username');
        return true;
      }

      const result = await usernameDebounce(username, setErrors, errors, enqueueError);
      if (result && showMessage) enqueueSuccess('Ім\'я користувача доступне')

      return result;
    }

    const {
      subscribeValidator,
      unsubscribeValidator,
      validateAll,
      errors,
      setErrors
    } = useValidator<IProfileSettingsErrors>();
    const debounce = useDebounce(debounceLogic, 1000);


    useImperativeHandle(ref, () => ({
      validateUpdate() {
        return handleValidateUpdate()
      }
    }), []);

    const handleUpdateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRequest({...request, username: event.target.value});
      changes.add('username');
      debounce(event.target.value, true);
    }

    const handleUpdateProfileInfo = useMemo(() => {
      const lockedRequest = request;

      return (newRequest: RequestType) => {
        setRequest(newRequest);
        if (lockedRequest.firstName === newRequest.firstName && lockedRequest.lastName === newRequest.lastName &&
          lockedRequest.middleName === newRequest.middleName && lockedRequest.description === newRequest.description) {
          changes.remove('profile')
          return;
        }
        changes.add('profile');
      }
    }, [lockFlag]);

    const handleValidateUpdate = async (): Promise<boolean> => {
      if (request.username === user.username) unsubscribeValidator('username');

      subscribeValidator({
        value: request.username,
        field: 'username',
        validators: [isNotNullOrWhiteSpace, debounceLogic]
      });
      subscribeValidator({
        value: request.firstName,
        field: 'firstName',
        validators: [isNotNullOrWhiteSpace],
        message: "Невірно введене ім'я"
      });
      subscribeValidator({
        value: request.lastName,
        field: 'lastName',
        validators: [isNotNullOrWhiteSpace],
        message: "Невірно введене прізвище"
      });

      const {isSuccess, errors} = await validateAll();
      if (!isSuccess) errors.forEach(enqueueError)

      return isSuccess;
    }

    const handleSettingsButton = async () => {
      setExpanded(!expanded)
      accordionButtonRef?.current!.click();
      // isExpanded
      //   ? window.scrollTo({top: 0, behavior: 'smooth'})
      //   : accordionDetailsRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    return (
      <Accordion allowToggle>
        <AccordionItem>
          <FilledDiv>
            <div className={cl.settingsTitle}>
              <div>
                <div>
                  <SvgSelector id={'Settings'}/>
                </div>
                <Text fontWeight={700} fontSize={20} as={'p'}>Уточніть інформацію</Text>
              </div>
              <AccordionButton
                ref={accordionButtonRef}
                width={'fit-content'}
                bg={useColorModeValue('#896DC8', '#835ADF')}
                borderRadius={'12px'}
                minW={'120px'}
                minH={'40px'}
                justifyContent={'center'}
                onClick={handleSettingsButton}
                _hover={{bg: '#BBAFEA'}}
                // bg={useColorModeValue('#896DC8', '#896DC8')}
              >
                <Text
                  as={'b'}
                  color={useColorModeValue('#FFFFFF', '#EFEFEF')}
                  fontWeight={'semibold'}
                  fontSize={14}
                >
                  Змінити
                </Text>
              </AccordionButton>
            </div>
          </FilledDiv>
          <AccordionPanel paddingInlineStart={0} paddingInlineEnd={0}>
            <FilledDiv
              width={'100%'}
            >
              <TitleInput
                title={'Username*'} placeholder={'Ім\'я користувача'} value={request.username}
                isInvalid={errors.username}
                onChange={handleUpdateUsername}
                width={'100%'}
              />
              <TitleInput
                title={'Email'} placeholder={'Електронна пошта'} defaultValue={request.email}
                isInvalid={errors.email}
                width={'100%'}
              />
              <TitleInput
                title={'Firstname*'} placeholder={'Iм\'я'} value={request.firstName}
                isInvalid={errors.firstName}
                onChange={(e) => handleUpdateProfileInfo({...request, firstName: e.target.value})}
                width={'100%'}
              />
              <TitleInput
                title={'Lastname*'} placeholder={'Прізвище'} value={request.lastName}
                isInvalid={errors.lastName}
                onChange={(e) => handleUpdateProfileInfo({...request, lastName: e.target.value})}
                width={'100%'}
              />
              <TitleInput
                title={'Middlename'} placeholder={'По-батькові'} value={request.middleName ?? ''}
                isInvalid={errors.middleName}
                onChange={(e) => handleUpdateProfileInfo({...request, middleName: e.target.value})}
                width={'100%'}
              />
              <TitleInput
                title={'Description'} placeholder={'Опис'} value={request.description ?? ''}
                isInvalid={errors.description}
                onChange={(e) => handleUpdateProfileInfo({
                  ...request,
                  description: e.target.value === '' ? undefined : e.target.value
                })}
                width={'100%'}
              />
            </FilledDiv>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  };

export default forwardRef(ProfileSettings);
