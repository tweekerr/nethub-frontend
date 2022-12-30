import axios, {AxiosError, AxiosResponse} from 'axios';
import IAuthResult from "../types/api/Refresh/IAuthResult";
import ICheckEmailResponse from "../types/api/CheckEmail/ICheckEmailRequest";
import {ProviderType} from "../types/ProviderType";
import ICheckUsernameResponse from "../types/api/CheckUsername/ICheckUsernameResponse";
import {JWTStorage} from "../utils/localStorageProvider";
import IArticleResponse from "../types/api/Article/IArticleResponse";
import IArticleLocalizationResponse from "../types/api/Article/IArticleLocalizationResponse";
import IUserInfoResponse, {IPrivateUserInfoResponse} from "../types/api/User/IUserInfoResponse";
import qs from 'qs';
import {RateVariants} from "../components/Article/Shared/ArticlesRateCounter";
import IDashboardResponse from "../types/api/Dashboard/IDashboardResponse";
import IExtendedArticle from "../types/IExtendedArticle";
import INewsResponse from "../types/api/News/INewsResponse";
import IUpdateProfileRequest from "../types/api/Profile/IUpdateProfileRequest";
import ICurrencyResponse from "../types/api/Currency/ICurrencyResponse";
import {IReduxUser} from "../types/IReduxUser";
import {Operator} from "../types/Operators";
import {ApiError} from "../types/ApiError";
import {isAccessTokenValid} from "../utils/JwtHelper";
import {SsoRequest} from "../types/api/Sso/SsoRequest";

// export const baseApiUrl = import.meta.env.VITE_IS_DEVELOPMENT === 'true'
//   ? import.meta.env.VITE_TEST_BACK_POINT
//   : import.meta.env.VITE_GENERAL_BACK_POINT;


export const baseApiUrl = 'https://localhost:7002/v1';
export const _api = axios.create({
  baseURL: baseApiUrl,
});

const _authApi = axios.create({
  baseURL: baseApiUrl,
  withCredentials: true
})

_api.interceptors.request.use(async (config) => {

  const accessToken = JWTStorage.getAccessToken();

  if (accessToken !== null)
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  return config;
});

_api.interceptors.request.use(
  async (config) => {
    if (window.isRefreshing) {
      while (window.isRefreshing)
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    if (!JWTStorage.getAccessToken() || isAccessTokenValid()) {
      return config;
    }

    try {
      window.isRefreshing = true

      const response: AxiosResponse<IAuthResult> = await _authApi.post('user/refresh-tokens');
      JWTStorage.setTokensData(response.data);

      return config;
    } catch (e) {
      JWTStorage.clearTokensData();
      return window.location.href = '/login';
    } finally {
      window.isRefreshing = false
    }
  },
  async (error: AxiosError) => {
    throw new ApiError(error.message, error.response?.status);
  }
);

export const articlesApi = {
  createArticle: async (title: string, tags: string[], originalArticleLink: string) => {
    const result: AxiosResponse<IArticleResponse> = await _api
      .post('/articles', {
        name: title,
        tags,
        originalArticleLink: originalArticleLink === '' ? undefined : originalArticleLink,
      });
    return result.data;
  },
  getArticleImages: async () => {
    return ['https://upload.wikimedia.org/wikipedia/commons/e/ed/Gibson_Les_Paul%28sg%29_1962.jpg', 'https://ru.wargaming.net/clans/media/clans/emblems/cl_1/1/emblem_195x195.png', 'https://ru-wotp.wgcdn.co/dcont/fb/image/wgfest_ps__006.jpg']
  },
  addImagesToArticle: (id: string, formData: FormData) => {
    return _api
      .post(`/articles/${id}/images`, formData)
      .then((res) => res.data);
  },
  getArticles: async (code: string) => {
    const result: AxiosResponse<IExtendedArticle[]> =
      await _api.get(`articles/${code}/get-thread?page=1&pageSize=20&Filters=languageCode` + Operator.Equals + code
        + ',contributorRole' + Operator.Equals + 'Author')
    return result.data;
  },
  getUserArticles: async (id: string | number, code: string) => {
    const result: AxiosResponse<IExtendedArticle[]> =
      await _api.get(`articles/${code}/get-thread?page=1&pageSize=20&Filters=languageCode` + Operator.Equals + code
        + ',contributorId' + Operator.Equals + id);
    return result.data;
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
    await _api.get(`articles/${id}/rate?vote=${rate}`);
  }
}

export const userApi = {
  getUsersInfo: async (usernames: number[] | string[]) => {
    const result: AxiosResponse<IUserInfoResponse[]> = await _api.get('/user/users-info', {
      params: {
        userNames: usernames
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    })
    return result.data;
  },
  getUserDashboard: async (username: string): Promise<IDashboardResponse> => {
    const result: AxiosResponse<IDashboardResponse> = await _api.get(`user/${username}/dashboard`)
    return result.data
  },
  authenticate: async (request: SsoRequest): Promise<IReduxUser> => {
    const response: AxiosResponse<IAuthResult> = await _authApi.post('/user/sso', request);
    JWTStorage.setTokensData(response.data);

    return response.data;
  },
  checkIfExists: async (key: string, provider: ProviderType): Promise<ICheckEmailResponse> => {
    const response: AxiosResponse<ICheckEmailResponse> = await _api.post('/user/check-user-exists', {key, provider})
    return response.data;
  },
  checkUsername: async (username: string): Promise<boolean> => {
    const response: AxiosResponse<ICheckUsernameResponse> = await _api.post('/user/check-username', {username})
    return response.data.isAvailable;
  },
  refresh: async (): Promise<IAuthResult> => {
    const response: AxiosResponse<IAuthResult> = await _authApi.post('user/refresh-tokens');
    return response.data;
  },
  logout: async () => {
    await _authApi.delete('user/logout');
  },
  me: async (): Promise<IUserInfoResponse> => {
    const result: AxiosResponse<IUserInfoResponse> = await _api.get('user/me');
    return result.data;
  },
  myDashboard: async (): Promise<IDashboardResponse> => {
    const result: AxiosResponse<IDashboardResponse> = await _api.get('user/me/dashboard')
    return result.data
  },
  setUserImage: async (photo: string | File) => {
    const url = 'user/profile-photo'
    if (typeof (photo) === 'string') {
      const response: AxiosResponse<{ link: string }> = await _api.post(url + '?link=' + photo);
      return response.data.link;
    } else {
      const data = new FormData();
      data.append('file', photo);
      const response: AxiosResponse<{ link: string }> = await _api.post(
        url,
        data,
        {
          headers: {'Content-Type': 'multipart/form-data'}
        });
      return response.data.link;
    }
  },
  updateUserProfile: async (request: IUpdateProfileRequest) => {
    await _api.put('user/profile', request);
  },
  updateUserName: async (username: string) => {
    await _api.put('user/username', {username});
  }
};

export const infoApi = {
  getCurrenciesRate: async () => {
    const response: AxiosResponse<ICurrencyResponse> = await _api.get('/currency');
    return response.data;
  }
}

export const searchApi = {
  searchUsersByUsername: async (searchValue: string) => {
    const response: AxiosResponse<IPrivateUserInfoResponse[]> = await _api.get('/search/users?username=' + searchValue);
    return response.data;
  }
}
