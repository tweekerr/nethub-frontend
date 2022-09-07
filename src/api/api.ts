import axios, {AxiosResponse} from 'axios';
import {IReduxUser} from "../store/generalSlice";
import IAuthResult from "../types/api/Refresh/IAuthResult";
import IRefreshRequest from "../types/api/Refresh/IRefreshRequest";
import ISsoRequest from "../types/api/Sso/ISsoRequest";
import ICheckEmailResponse from "../types/api/CheckEmail/ICheckEmailRequest";
import {ProviderType} from "../types/ProviderType";

export const _api = axios.create({
  //TODO: must be general link
  baseURL: process.env.REACT_APP_IS_DEVELOPMENT ? process.env.REACT_APP_TEST_BACK_POINT : process.env.REACT_APP_GENERAL_BACK_POINT,
  withCredentials: true
});

//TODO: token must be saved in storage
_api.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
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
            accessToken: localStorage.getItem('token'),
            refreshToken: localStorage.getItem('refreshToken'),
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
      return _api
        .post('/articles', {
          name: 'string',
          tags: ['string', 'string1', 'string2'],
          translatedArticleLink: 'string',
        })
        .then((res) => res.data);
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
      const {token, refreshToken, profilePhotoLink, username} = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      console.log('response', response.data)
      return {username, profilePhoto: profilePhotoLink}
    },
    checkIfExists: async (key: string, provider: ProviderType): Promise<ICheckEmailResponse> => {
      const response: AxiosResponse<ICheckEmailResponse> = await _api.post('/user/check-user-exists', {key, provider})
      return response.data;
    },
  }
;
