import axios, {AxiosResponse} from 'axios';
import {IReduxUser} from "../store/generalSlice";
import IAuthResult from "../types/api/Refresh/IAuthResult";
import IRefreshRequest from "../types/api/Refresh/IRefreshRequest";
import ISsoRequest from "../types/api/Sso/ISsoRequest";
import ICheckEmailResponse from "../types/api/CheckEmail/ICheckEmailRequest";
import {ProviderType} from "../types/ProviderType";
import ICheckUsernameResponse from "../types/api/CheckUsername/ICheckUsernameResponse";
import {APIError} from "../react-app-env";
import {ArticleStorage, JWTStorage} from "../utils/localStorageProvider";
import IArticleResponse from "../types/api/Article/IArticleResponse";

export const _api = axios.create({
  //TODO: must be general link
  baseURL: process.env.REACT_APP_IS_DEVELOPMENT ? process.env.REACT_APP_TEST_BACK_POINT : process.env.REACT_APP_GENERAL_BACK_POINT,
  withCredentials: true
});

//TODO: token must be saved in storage
_api.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${JWTStorage.getAccessToken()}`,
  };
  return config;
});

_api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post(
          `${
            process.env.REACT_APP_GENERAL_BACK_POINT
          }/user/refresh-tokens`,
          {
            accessToken: JWTStorage.getAccessToken(),
            refreshToken: JWTStorage.getRefreshToken(),
          },
          {headers: {'Content-Type': 'application/json'}}
        );
        console.log('response', response);
        localStorage.setItem('token', response.data.accessToken);
        return _api.request(originalRequest);
      } catch (e) {
        localStorage.removeItem('token');
        console.log('НЕ АВТОРИЗОВАНИЙ');
      }
    }
    throw error;
  }
);

export const api = {
  createArticles: async () => {
    const result: AxiosResponse<IArticleResponse> = await _api
      .post('/articles', {
        name: ArticleStorage.getTitle()!,
        tags: JSON.parse(ArticleStorage.getTags()!),
        originalArticleLink: ArticleStorage.getLink() ? ArticleStorage.getLink() : null,
      });
    return result.data;
  },
  getArticleImages: async () => {
    return ['https://upload.wikimedia.org/wikipedia/commons/e/ed/Gibson_Les_Paul%28sg%29_1962.jpg', 'https://ru.wargaming.net/clans/media/clans/emblems/cl_1/1/emblem_195x195.png', 'https://ru-wotp.wgcdn.co/dcont/fb/image/wgfest_ps__006.jpg']
  },
  addImagesToArticle: (id: string, formdata: FormData) => {
    return _api
      .post(`/articles/${id}/images`, formdata)
      .then((res) => res.data);
  },
  getArticles: async () => {
    return _api
      .get('/articles?code=ua&page=1&perPage=20')
      .then((res) => res.data);
  },
  getNews: async () => {
    return _api.get('/news?Page=1&PerPage=3').then((res) => res.data);
  },
  authenticate: async (request: ISsoRequest): Promise<IReduxUser> => {
    const response: AxiosResponse<IAuthResult> = await _api.post('/user/sso', request);
    const {profilePhotoLink, username} = response.data;
    JWTStorage.setTokensData(response.data);

    console.log('response', response.data)
    return {username, profilePhotoLink: profilePhotoLink}
  },
  checkIfExists: async (key: string, provider: ProviderType): Promise<ICheckEmailResponse> => {
    const response: AxiosResponse<ICheckEmailResponse> = await _api.post('/user/check-user-exists', {key, provider})
    return response.data;
  },
  checkUsername: async (username: string): Promise<boolean> => {
    const response: AxiosResponse<ICheckUsernameResponse> = await _api.post('/user/check-username', {username})
    return response.data.isAvailable;
  },
  checkAuth: async (): Promise<boolean> => {
    try {
      const response: AxiosResponse<IAuthResult> = await _api.post('user/refresh-tokens', {refreshToken: JWTStorage.getRefreshToken()});
      JWTStorage.setTokensData(response.data)
      return true;
    } catch (error: APIError | any) {
      return false;
    }
  }
};
