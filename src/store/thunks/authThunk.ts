import {createAsyncThunk} from '@reduxjs/toolkit';
import {_api} from "../../api/api";
import {APIError} from "../../react-app-env";

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
      return thunkApi.fulfillWithValue(response.data);
    } catch (error: APIError | any) {
      console.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
