import React from "react";
import ISsoRequest from "../types/api/Sso/ISsoRequest";
import {auth, facebookProvider, googleProvider} from "../api/firebase";
import {signInWithPopup} from "firebase/auth";
import IProviderTokenResponse from "../types/IProviderTokenResponse";
import {ProviderType} from "../types/ProviderType";

type ProviderResult = { request: ISsoRequest, photoUrl: string | null }

export default class LoginService {
  static async ProviderHandle(setReduxUser: (username: string, photoLink: string | null) => void,
                              provider: ProviderType): Promise<ISsoRequest> {
    let providerResult: ProviderResult = {} as ProviderResult;
    let usedProvider: ProviderType;

    switch (provider) {
      case ProviderType.GOOGLE:
        providerResult = await LoginService.googleHandle();
        usedProvider = ProviderType.GOOGLE;
        break;
      case ProviderType.TELEGRAM:
        providerResult = await LoginService.telegramHandle()
        usedProvider = ProviderType.TELEGRAM;
        break;
      case ProviderType.FACEBOOK:
        providerResult = await LoginService.facebookHandle()
        usedProvider = ProviderType.FACEBOOK
        break;
    }

    setReduxUser(providerResult.request.username!, providerResult.photoUrl);

    return providerResult.request;
  }

  private static async googleHandle(): Promise<ProviderResult> {
    googleProvider.addScope('profile')
    googleProvider.addScope('email')
    const credential = await signInWithPopup(auth, googleProvider);
    //@ts-ignore
    const tokenResponse: IProviderTokenResponse = credential._tokenResponse;
    console.log('token', credential);

    const request: ISsoRequest = {
      username: tokenResponse.email.replace(/@.*$/, ""),
      firstName: tokenResponse.firstName,
      lastName: tokenResponse.lastName,
      middleName: '',
      email: tokenResponse.email,
      providerMetadata: {
        //@ts-ignore
        token: credential._tokenResponse.oauthIdToken,
      },
      providerKey: tokenResponse.localId,
      provider: ProviderType.GOOGLE,
    }

    return {request, photoUrl: tokenResponse.photoUrl}
  }

  private static async telegramHandle(): Promise<ProviderResult> {

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
            firstName: data.first_name ?? '',
            lastName: data.last_name ?? '',
            middleName: '',
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
            providerKey: data.id
          };

          // setRequest(userInfo);
          // Here you would want to validate data like described there https://core.telegram.org/widgets/login#checking-authorization
          // doWhateverYouWantWithData(data);

          resolve({
            request: userInfo,
            photoUrl: data.photo_url,
          })
          // resolve({username: data.username ?? data.first_name ?? data.last_name, profilePhoto: data.photo_url});
        }
      );
    })
  }

  private static async facebookHandle(): Promise<ProviderResult> {
    const credential = await signInWithPopup(auth, facebookProvider);

    console.log('credential', credential)
    //@ts-ignore
    const tokenResponse: IProviderTokenResponse = credential._tokenResponse;
    const userInfo: ISsoRequest = {
      username: tokenResponse.email.replace(/@.*$/, ""),
      firstName: tokenResponse.firstName,
      lastName: tokenResponse.lastName,
      middleName: '',
      email: tokenResponse.email,
      providerMetadata: {
        //@ts-ignore
        token: credential._tokenResponse.idToken,
      },
      providerKey: tokenResponse.localId,
      provider: ProviderType.FACEBOOK,
    }

    console.log('facebook', userInfo)
    return {request: userInfo, photoUrl: tokenResponse.photoUrl}
  }
}
