import ISsoRequest from "../types/api/Sso/ISsoRequest";
import {auth, facebookProvider, googleProvider} from "../api/firebase";
import {signInWithPopup} from "firebase/auth";
import IProviderTokenResponse from "../types/IProviderTokenResponse";
import {ProviderType} from "../types/ProviderType";


export default class LoginService {
  static async ProviderHandle(provider: ProviderType): Promise<ISsoRequest> {
    switch (provider) {
      case ProviderType.GOOGLE:
        return await LoginService.googleHandle();
      case ProviderType.TELEGRAM:
        return await LoginService.telegramHandle()
      case ProviderType.FACEBOOK:
        return await LoginService.facebookHandle()
    }
  }

  private static async googleHandle(): Promise<ISsoRequest> {
    googleProvider.addScope('profile')
    googleProvider.addScope('email')
    const credential = await signInWithPopup(auth, googleProvider);
    //@ts-ignore
    const tokenResponse: IProviderTokenResponse = credential._tokenResponse;
    console.log('token', tokenResponse.photoUrl);

    return {
      username: tokenResponse.email.replace(/@.*$/, ""),
      firstName: tokenResponse.firstName,
      lastName: tokenResponse.lastName,
      middleName: '',
      profilePhotoUrl: tokenResponse.photoUrl,
      email: tokenResponse.email,
      providerMetadata: {
        //@ts-ignore
        token: credential._tokenResponse.oauthIdToken,
      },
      providerKey: tokenResponse.localId,
      provider: ProviderType.GOOGLE,
    };
  }

  private static async telegramHandle(): Promise<ISsoRequest> {

    return new Promise((resolve, reject) => {
      window.Telegram.Login.auth(
        {bot_id: '5533270293', request_access: true},
        (data: any) => {
          console.log(data)
          if (!data) {
            console.log('error')
            reject('Telegram login failed')
          }

          setTimeout(() => {
            const request: ISsoRequest = {
              username: data.username,
              firstName: data.first_name,
              lastName: data.last_name,
              middleName: '',
              profilePhotoUrl: data.photo_url,
              email: data.email ?? '',
              providerMetadata: {
                id: data.id.toString(),
                username: data.username,
                auth_date: data.auth_date.toString(),
                hash: data.hash,
                first_name: data.first_name ?? null,
                last_name: data.last_name ?? null,
                photo_url: data.photo_url ?? null,
              },
              provider: ProviderType.TELEGRAM,
              providerKey: data.id.toString()
            };
            resolve(request)
          }, 100)

          // resolve({username: data.username ?? data.first_name ?? data.last_name, profilePhoto: data.photo_url});
        }
      );
    })
  }

  private static async facebookHandle(): Promise<ISsoRequest> {
    const credential = await signInWithPopup(auth, facebookProvider);

    //@ts-ignore
    const tokenResponse: IProviderTokenResponse = credential._tokenResponse;
    return {
      username: tokenResponse.email?.replace(/@.*$/, ""),
      firstName: tokenResponse.firstName,
      lastName: tokenResponse.lastName,
      middleName: '',
      profilePhotoUrl: tokenResponse.photoUrl,
      email: tokenResponse.email ?? null,
      providerMetadata: {
        //@ts-ignore
        token: credential._tokenResponse.oauthAccessToken,
      },
      providerKey: tokenResponse.localId,
      provider: ProviderType.FACEBOOK,
    };
  }
}
