import React, {FC} from 'react';
import cl from "../Profile.module.sass";
import PublicDashboard from "./PublicDashboard";
import IDashboardResponse from "../../../types/api/Dashboard/IDashboardResponse";
import IUserInfoResponse from "../../../types/api/User/IUserInfoResponse";
import SvgSelector from "../../UI/SvgSelector/SvgSelector";
import {Button, Text} from "@chakra-ui/react";
import FilledDiv from "../../UI/FilledDiv";
import {useNavigate} from "react-router-dom";

interface IProfileProps {
  user: IUserInfoResponse,
  dashboard: IDashboardResponse
}

const PublicProfile: FC<IProfileProps> = ({dashboard, user}) => {
  const navigate = useNavigate();

  return (
    <div className={cl.profileWrapper}>
      <PublicDashboard dashboard={dashboard} user={user}/>
      {dashboard.articlesCount !== 0
        ? <FilledDiv
          className={cl.profileButton}
          width={'100%'}
        >
          <div className={cl.buttonInside}>
            <div>
              <div>
                <SvgSelector id={'ProfileCreated'}/>
              </div>
              <Text as={'p'}>
                Статті, створені {user.userName}
              </Text>
            </div>
            <Button
              fontSize={'14px'}
              onClick={async () => navigate('/articles/by/' + user.id)}
              minW={'120px'}
            >
              Показати
            </Button>
          </div>
        </FilledDiv>
        : null
      }
    </div>
  );
};

export default PublicProfile;
