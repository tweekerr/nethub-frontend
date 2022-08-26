import {signInWithPopup} from "firebase/auth";
import {auth, provider} from "../api/firebase";
import ISsoRequest from "../types/api/Sso/ISsoRequest";
import React from "react";
import {IReduxUser} from "../store/generalSlice";

export enum ProviderType {
  TELEGRAM = 'telegram',
  GOOGLE = 'google'
}

export async function sso(setRequest: React.Dispatch<ISsoRequest>,
                          setReduxUser: (username: string, photoLink: string | null) => void,
                          expandSecondStep: () => void,
                          provider: ProviderType) {
  switch (provider) {
    case ProviderType.GOOGLE:
      const {username: googleUsername, profilePhoto: googlePhotoLink} = await ssoGoogle(setRequest);
      setReduxUser(googleUsername, googlePhotoLink);
      break;
    case ProviderType.TELEGRAM:
      const {username: telegramUsername, profilePhoto: telegramPhotoLink} = await ssoTelegram(setRequest)
      setReduxUser(telegramUsername, telegramPhotoLink);
      break;
  }

  expandSecondStep();
}

async function ssoGoogle(setRequest: React.Dispatch<ISsoRequest>): Promise<IReduxUser> {
  const credential = await signInWithPopup(auth, provider);

  const {user} = credential;

  const userInfo: ISsoRequest = {

    username: '',
    firstname: user.displayName ?? '',
    lastname: '',
    middlename: '',
    email: user.email ?? '',
    providerMetadata: {
      //@ts-ignore
      token: credential._tokenResponse.oauthIdToken,
    },
    provider: ProviderType.GOOGLE,
  };

  setRequest(userInfo);
  return {username: user.displayName ?? user.email!, profilePhoto: user.photoURL};
}

async function ssoTelegram(setRequest: React.Dispatch<ISsoRequest>): Promise<IReduxUser> {

  return new Promise((resolve, reject) => {
    // @ts-ignore
    window.Telegram.Login.auth(
      {bot_id: '5533270293', request_access: true},
      (data: any) => {
        if (!data) {
          console.log('error')
          reject('Telegram login failed')
        }

        const userInfo: ISsoRequest = {
          username: data.username ?? '',
          firstname: data.first_name ?? '',
          lastname: data.last_name ?? '',
          middlename: '',
          email: data.email ?? '',
          providerMetadata: {
            id: data.id,
            username: data.username,
            auth_date: data.auth_date,
            hash: data.hash,
            last_name: data.last_name ?? null,
            photo_url: data.photo_url ?? null,
          },
          provider: ProviderType.TELEGRAM,
        };

        setRequest(userInfo);
        // Here you would want to validate data like described there https://core.telegram.org/widgets/login#checking-authorization
        // doWhateverYouWantWithData(data);

        resolve({username: data.username ?? data.first_name ?? data.last_name, profilePhoto: data.photo_url});
      }
    );
  })
}

