import React, {forwardRef, ForwardRefRenderFunction, useImperativeHandle, useMemo} from 'react';
import classes from "../Auth/Login.module.sass";
import {StyledAccordion, StyledAccordionDetails, StyledAccordionSummary} from "../Auth/styled";
import {Typography} from "@mui/material";
import TitleInput from "../basisComps/titleInput/TitleInput";
import UiButton from "../UI/button/UiButton";
import useValidator from "../../hooks/useValidator";
import SvgSelector from "../basisComps/SvgSelector/SvgSelector";
import cl from './Profile.module.sass'
import './ProfileStyles.css'
import {ProfileChangesType} from "./Profile";
import {useDebounce} from "../../hooks/useDebounce";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import {usernameDebounce} from "../../utils/debounceHelper";
import {useAppSelector} from "../../store/storeConfiguration";
import {isNotNullOrWhiteSpace} from "../../utils/validators";

type RequestType = {
  username: string,
  firstName: string,
  lastName: string,
  middleName?: string,
  description: string | null
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
    const {user} = useAppSelector(state => state.generalReducer)

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

    const handleUpdateUsername = (username: string) => {
      setRequest({...request, username});
      changes.add('username');
      debounce(username, true);
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
      // isExpanded
      //   ? window.scrollTo({top: 0, behavior: 'smooth'})
      //   : accordionDetailsRef.current?.scrollIntoView({behavior: 'smooth'})
    }

    return (
      <>
        <StyledAccordion
          className={classes.accordionActive}
          disableGutters
          expanded={expanded}
        >
          <StyledAccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className={cl.settingsTitle}>
              <div>
                <div>
                  <SvgSelector id={'Settings'}/>
                </div>
                <Typography fontWeight={700} fontSize={20}>Уточніть інформацію</Typography>
              </div>
              <UiButton
                padding={'12px 35px'}
                onClick={handleSettingsButton}
              >
                Змінити
              </UiButton>
            </div>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <div>
              <TitleInput
                title={'Username*'} placeholder={'Ім\'я користувача'} value={request.username}
                error={errors.username}
                setValue={handleUpdateUsername}
                width={'100%'}
              />
              <TitleInput
                title={'Firstname*'} placeholder={'Iм\'я'} value={request.firstName}
                error={errors.firstName}
                setValue={(firstName: string) => handleUpdateProfileInfo({...request, firstName})}
                width={'100%'}
              />
              <TitleInput
                title={'Lastname*'} placeholder={'Прізвище'} value={request.lastName}
                error={errors.lastName}
                setValue={(lastName: string) => handleUpdateProfileInfo({...request, lastName})}
                width={'100%'}
              />
              <TitleInput
                title={'Middlename'} placeholder={'По-батькові'} value={request.middleName ?? ''}
                error={errors.middleName}
                setValue={(middleName: string) => handleUpdateProfileInfo({...request, middleName})}
                width={'100%'}
              />
              <TitleInput
                title={'Description'} placeholder={'Опис'} value={request.description ?? null}
                error={errors.description}
                setValue={(description: string) => handleUpdateProfileInfo({
                  ...request,
                  description: description === '' ? null : description
                })}
                width={'100%'}
                type={'textarea'}
                rows={5}
              />
            </div>
          </StyledAccordionDetails>
        </StyledAccordion>
        <div id='end'></div>
      </>
    );
  };

export default forwardRef(ProfileSettings);
