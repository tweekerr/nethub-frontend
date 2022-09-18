import {JWTStorage} from "./localStorageProvider";

export function isAuthorized() {
  return JWTStorage.getAccessToken() && new Date(JWTStorage.getAccessTokenExpires()!) > new Date();
}

export function isAccessTokenExpired() {
  return JWTStorage.getAccessToken() && new Date(JWTStorage.getAccessTokenExpires()!) < new Date();
}

export function isRefreshTokenExpired() {
  return JWTStorage.getRefreshToken() && new Date(JWTStorage.getRefreshTokenExpires()!) < new Date();
}
