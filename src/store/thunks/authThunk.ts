import {createAsyncThunk} from '@reduxjs/toolkit';
import {_api} from "../../api/api";
import {APIError} from "../../react-app-env";
import {getAccessToken, getRefreshToken, setTokensData} from "../../utils/localStorageProvider";
import {AxiosResponse} from "axios";
import IAuthResult from "../../types/api/Refresh/IAuthResult";

export const checkAuth = createAsyncThunk(
  'general/checkAuth',
  async (_, thunkApi) => {
    try {
      const response = await _api.post('user/refresh-tokens', {
        accessToken: localStorage.getItem('token'),
        refreshToken: localStorage.getItem('refreshToken'),
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      console.log('refresh', response.data)
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: APIError | any) {
      console.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);


export async function checkAuth2() {
  try {
    const response: AxiosResponse<IAuthResult> = await _api.post('user/refresh-tokens', {
      refreshToken: getRefreshToken(),
    });

    setTokensData(response.data)
    console.log('refresh', response.data)

    return true;
  } catch (error: APIError | any) {
    console.error(error.message);
    return false;
  }
}
