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

}

