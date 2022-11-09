import {JWTStorage} from "./utils/localStorageProvider";
import {isAccessTokenExpired, isAuthorized, isRefreshTokenExpired} from "./utils/JwtHelper";
import jwtDecode from "jwt-decode";
import IJwtPayload from "./types/IJwtPayload";
import {userApi} from "./api/api";

export async function check() {
  if (isAuthorized()) {
    return jwtDecode<IJwtPayload>(JWTStorage.getAccessToken()!);
    // login({username: data.username, profilePhotoLink: data.image})
  } else if (isAccessTokenExpired()) {
    if (!isRefreshTokenExpired()) {
      if (await userApi.refresh()) {
        return jwtDecode<IJwtPayload>(JWTStorage.getAccessToken()!);
        // login({username: data.username, profilePhotoLink: data.image})
      }
    }
  } else {
    return null;
  }
}
