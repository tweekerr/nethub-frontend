import axios, {Axios, AxiosResponse} from 'axios';
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
import IArticleLocalizationResponse, {ISavedLocalization} from "../types/api/Article/IArticleLocalizationResponse";
import IUserInfoResponse from "../types/api/User/IUserInfoResponse";
import qs from 'qs';
import {RateVariants} from "../components/Article/Shared/ArticlesRateCounter";
import IDashboardResponse from "../types/api/Dashboard/IDashboardResponse";
import IExtendedArticle from "../types/IExtendedArticle";
import INewsResponse from "../types/api/News/INewsResponse";

const a = process.env.REACT_APP_IS_DEVELOPMENT ? process.env.REACT_APP_TEST_BACK_POINT : process.env.REACT_APP_GENERAL_BACK_POINT;

export const _api = axios.create({
  //TODO: must be general link
  baseURL: a,
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

export const articlesApi = {
  createArticle: async () => {
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
  getArticles: async (code: string) => {
    const result: AxiosResponse<IExtendedArticle[]> = await _api.get(`articles/${code}/get-thread?page=1&perPage=20`)
    return result.data
  },
  getNews: async () => {
    const response: AxiosResponse<INewsResponse[]> = await _api.get('/news?Page=1&PerPage=3');
    return response.data;
  },
  getArticle: async (id: string): Promise<IArticleResponse> => {
    const response: AxiosResponse<IArticleResponse> = await _api.get(`articles/${id}`);
    return response.data;
  },
  createLocalization: async (articleId: string, code: string, request: any): Promise<IArticleLocalizationResponse> => {
    const response: AxiosResponse<IArticleLocalizationResponse> = await _api.post(`articles/${articleId}/${code}`, request);
    return response.data;
  },
  getLocalization: async (id: string, code: string): Promise<IArticleLocalizationResponse> => {
    const response: AxiosResponse<IArticleLocalizationResponse> = await _api.get(`articles/${id}/${code}`);
    return response.data;
  },
  isArticleSavedByUser: async (id: string, code: string): Promise<boolean> => {
    const result: AxiosResponse<{ isSaved: boolean }> = await _api.get(`articles/${id}/${code}/get-localization-saving`);
    return result.data.isSaved;
  },
  toggleSavingLocalization: async (id: number, code: string) => {
    await _api.get(`articles/${id}/${code}/toggle-saving`);
  },
  getSavedArticlesByUser: async () => {
    const result: AxiosResponse<IExtendedArticle[]> = await _api.get('articles/saved');
    return result.data;
  },
  getRate: async (id: string): Promise<{ rating: RateVariants }> => {
    const result: AxiosResponse<{ rating: RateVariants }> = await _api.get(`articles/${id}/get-rate`);
    return result.data;
  },
  setRate: async (id: string | number, rate: RateVariants) => {
    await _api.get(`articles/${id}/rate?rating=${rate}`);
  }
}

export const userApi = {
  getUsersInfo: async (ids: number[]) => {
    const result: AxiosResponse<IUserInfoResponse[]> = await _api.get('/user/users-info', {
      params: {
        Ids: ids
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
    return result.data;
  },
  getUserDashboard: async (userId: number): Promise<IDashboardResponse> => {
    const result: AxiosResponse<IDashboardResponse> = await _api.get(`user/${userId}/dashboard`)
    return result.data
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
  },
  me: async (): Promise<IUserInfoResponse> => {
    const result: AxiosResponse<IUserInfoResponse> = await _api.get('user/me');
    return result.data;
  },
  myDashboard: async (): Promise<IDashboardResponse> => {
    const result: AxiosResponse<IDashboardResponse> = await _api.get('user/me/dashboard')
    return result.data
  },
  setUserImage: async (link?: string) => {
    if (!link) return

    let url = 'user/profile-photo'
    if (link) url += `?link=${link}`
    const response: AxiosResponse<{ link: string }> = await _api.post(url);
    return response.data.link;
  }
};
