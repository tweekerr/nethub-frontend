import { Box, Grid, Typography } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import Header from 'layout/Header/Header';
import React, { useEffect } from 'react';
import { StyledButton, StyledForm, StyledRoot } from './styled';
import { auth, provider } from '../../api/firebase';
import { UserCredential } from '@firebase/auth';
import { api } from '../../api';
import { useActions } from 'utils';

export const AuthSpace: React.FC = () => {
  const { login } = useActions();

  const submitLogin = () => {
    signInWithPopup(auth, provider).then(async (cred: UserCredential) => {
      const { displayName: username, email } = cred.user;
      const userInfo = {
        username,
        firstname: username,
        email,
        providerMetadata: {
          //@ts-ignore
          token: cred._tokenResponse.oauthIdToken,
        },
        provider: 'google',
      };
      api.authenticate(userInfo).then(() => {
        login(userInfo);
      });
    });
  };

  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      <Header />
      <div className={'mainContainer'}>
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

          <StyledForm>
            <Typography color={'secondary'} fontWeight={700}>
              1. Оберіть спосіб авторизації
            </Typography>
            <Grid mt={2} container>
              <StyledButton onClick={submitLogin}>
                <img
                  style={{ height: '25px', width: '25px', marginRight: '10px' }}
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                  alt=""
                />
                Google
              </StyledButton>
            </Grid>
          </StyledForm>
        </StyledRoot>
      </div>
    </Box>
  );
};
