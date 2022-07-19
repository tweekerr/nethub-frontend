import { createAsyncThunk } from '@reduxjs/toolkit';
import { _api } from 'api';
import { APIError } from 'types';

export const checkAuth = createAsyncThunk(
  'general/checkAuth',
  async (_, thunkApi) => {
    try {
      const response = await _api.post('user/refresh-tokens', {
        accessToken: localStorage.getItem('token'),
      });
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      thunkApi.fulfillWithValue(response);
    } catch (error: APIError | any) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
