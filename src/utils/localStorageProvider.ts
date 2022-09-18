import IAuthResult from "../types/api/Refresh/IAuthResult";

export class JWTStorage {
  static getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  static getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  static getAccessTokenExpires() {
    return localStorage.getItem('accessTokenExpires');
  }

  static getRefreshTokenExpires() {
    return localStorage.getItem('refreshTokenExpires');
  }

  static setTokensData(data: IAuthResult) {
    localStorage.setItem('accessToken', data.token);
    localStorage.setItem('accessTokenExpires', data.tokenExpires);
    localStorage.setItem('refreshToken', data.refreshToken);
  }

  static clearTokensData() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('accessTokenExpires')
    localStorage.removeItem('refreshTokenExpires')
  }
}

export class ArticleStorage {
  static setTitle(value: string) {
    localStorage.setItem('title', value)
  }

  static setSubTitle(value: string) {
    localStorage.setItem('subTitle', value)
  }

  static setBody(value: string) {
    localStorage.setItem('body', value)
  }

  static setTags(value: string) {
    localStorage.setItem('tags', value)
  }

  static setLink(value: string) {
    localStorage.setItem('link', value)
  }

  static getTitle() {
    return localStorage.getItem('title')
  }

  static getSubTitle() {
    return localStorage.getItem('subTitle')
  }

  static getBody() {
    return localStorage.getItem('body')
  }

  static getTags() {
    return localStorage.getItem('tags')
  }

  static getLink() {
    return localStorage.getItem('link')
  }

  static clearArticleData() {
    localStorage.removeItem('title');
    localStorage.removeItem('subTitle');
    localStorage.removeItem('body');
    localStorage.removeItem('tags');
    localStorage.removeItem('link');
  }
}

