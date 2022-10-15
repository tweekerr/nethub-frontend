import React, {useState} from 'react';
import IUserInfoResponse from "../../types/api/User/IUserInfoResponse";
import classes from "../Auth/Login.module.sass";
import {StyledAccordion, StyledAccordionDetails, StyledAccordionSummary, StyledSecondStep} from "../Auth/styled";
import {Typography} from "@mui/material";
import TitleInput from "../basisComps/titleInput/TitleInput";
import UiButton from "../UI/button/UiButton";
import useValidator from "../../hooks/useValidator";
import TinyInput from "../Article/Create/TinyInput";
import SvgSelector from "../basisComps/SvgSelector/SvgSelector";
import cl from './Profile.module.sass'
import './ProfileStyles.css'

interface IProfileSettingsProps {
  user: IUserInfoResponse
}

interface IProfileSettingsErrors {
  username: boolean,
  email: boolean,
  firstName: boolean,
  lastName: boolean,
  middleName: boolean,
}


const ProfileSettings = () => {
  const {subscribeValidator, validateAll, errors, setErrors} = useValidator<IProfileSettingsErrors>();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [request, setRequest] = useState<any>({} as any);

  const updateRequest = (key: string, value: string) => {
    setRequest((prev: any) => {
      return {...prev, [key]: value}
    })
  }

  return (
    <StyledAccordion className={classes.accordionActive}
                     disableGutters
                     expanded={isExpanded}>
      <StyledAccordionSummary
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className={cl.settingsTitle}>
          <div>
            <SvgSelector id={'Settings'}/>
            <Typography fontWeight={700} fontSize={20}>Уточніть інформацію</Typography>
          </div>
          <UiButton onClick={() => {
            setIsExpanded(true)
          }}>
            Змінити
          </UiButton>
        </div>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <div>
          <TitleInput title={'Username*'} placeholder={'Ім\'я користувача'} value={request.username}
                      error={errors.username}
                      setValue={(username: string) => {
                        updateRequest('username', username);
                        // if (username !== null && username !== '')
                        //   debounce(username)
                      }}
                      width={'100%'}/>
          <TitleInput title={'Firstname*'} placeholder={'Iм\'я'} value={request.firstName}
                      error={errors.firstName}
                      setValue={(firstname: string) => updateRequest('firstName', firstname)}
                      width={'100%'}/>
          <TitleInput title={'Lastname*'} placeholder={'Прізвище'} value={request.lastName}
                      error={errors.lastName}
                      setValue={(lastname: string) => updateRequest('lastName', lastname)}
                      width={'100%'}/>
          <TitleInput title={'Middlename'} placeholder={'По-батькові'} value={request.middleName}
                      error={errors.middleName}
                      setValue={(middlename: string) => updateRequest('middleName', middlename)}
                      width={'100%'}/>
          <TinyInput data={''} setData={function (value: string): void {
            throw new Error('Function not implemented.');
          }} editorTitle={'Опис профілю'} error={false}></TinyInput>
        </div>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default ProfileSettings;
