import axios from 'axios';
import { BACKLINK } from '../constants/backend';

export const _api = axios.create({
  //TODO: must be general link
  baseURL: process.env.REACT_APP_GENERAL_BACK_POINT || BACKLINK,
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
            process.env.REACT_APP_GENERAL_BACK_POINT || BACKLINK
          }/user/refresh-tokens`,
          localStorage.getItem('token'),
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('response', response);
        localStorage.setItem('token', response.data.accessToken);
        return _api.request(originalRequest);
      } catch (e) {
        // localStorage.removeItem('token');
        console.log('НЕ АВТОРИЗОВАНИЙ');
      }
    }
    throw error;
  }
);

export const api = {
  createArticles: async (articles: any) => {
    return _api.post('').then((res) => res.data);
  },
  getArticles: async () => {
    return _api
      .get('/articles?code=ua&page=1&perPage=20')
      .then((res) => res.data);
  },
  getNews: async () => {
    return _api.get('/news?Page=1&PerPage=3').then((res) => res.data);
  },
  authenticate: async (user: any) => {
    return _api.post('/user/sso', user).then((res) => {
      const { token } = res.data;
      console.log('token saved');
      localStorage.setItem('token', token);
    });
  },
};
