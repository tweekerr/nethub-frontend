import IAuthResult from "../types/api/Refresh/IAuthResult";

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

export function getAccessTokenExpires() {
  return localStorage.getItem('accessTokenExpires');
}

export function getRefreshTokenExpires() {
  return localStorage.getItem('refreshTokenExpires');
}

export function setTokensData(data: IAuthResult) {
  localStorage.setItem('accessToken', data.token);
  localStorage.setItem('accessTokenExpires', data.tokenExpires);
  localStorage.setItem('refreshToken', data.refreshToken);
}

export function clearTokensData() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('accessTokenExpires')
  localStorage.removeItem('refreshTokenExpires')
}
