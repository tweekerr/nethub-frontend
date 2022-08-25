import {signInWithPopup} from "firebase/auth";
import {auth, provider} from "../api/firebase";
import ISsoRequest from "../types/api/Sso/ISsoRequest";
import React from "react";

export enum ProviderType {
  TELEGRAM = 'telegram',
  GOOGLE = 'google'
}

export async function sso(setUser: React.Dispatch<ISsoRequest>,
                          setPhoto: (photoLink: string) => void,
                          provider: ProviderType) {
  switch (provider) {
    case ProviderType.GOOGLE:
      const photoLink = await ssoGoogle(setUser);
      setPhoto(photoLink ?? '');
      break;
    case ProviderType.TELEGRAM:
      await ssoTelegram(setUser)
      break;
  }
}

async function ssoGoogle(setUser: React.Dispatch<ISsoRequest>): Promise<string | null> {
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

  setUser(userInfo);
  return user.photoURL;
}

async function ssoTelegram(setUser: React.Dispatch<ISsoRequest>) {
  //@ts-ignore
  window.Telegram.Login.auth(
    {bot_id: '5533270293', request_access: true},
    (data: any) => {
      if (!data) {
        // authorization failed
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
          last_name: data.last_name ?? undefined,
          photo_url: data.photo_url ?? undefined,
        },
        provider: ProviderType.TELEGRAM,
      };

      setUser(userInfo);
      // Here you would want to validate data like described there https://core.telegram.org/widgets/login#checking-authorization
      // doWhateverYouWantWithData(data);
      console.log(data)
    }
  );

}

