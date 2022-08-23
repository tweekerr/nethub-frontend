import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {checkAuth} from './thunks/authThunk';
import {ILanguage} from "../react-app-env";
import Localizations from "../constants/localizations";

const initialState = {
  theme: 'light',
  isLogin: false,
  user: {},
  loading: false,
  error: '',
  language: Localizations.Ukrainian
};

const generalSlice = createSlice({
  name: 'generalSlice',
  initialState: initialState,
  reducers: {
    switchTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    login: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      state.isLogin = false;
      state.user = {};
    },
    setLanguage: (state, action: PayloadAction<ILanguage>) => {
      state.language = action.payload
    }
  },
  extraReducers: {
    [checkAuth.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.isLogin = true;
      state.user = action.payload;
      state.error = '';
    },
    [checkAuth.pending.type]: (state, action) => {
      state.loading = true;
    },
    [checkAuth.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.user = {};
      state.isLogin = false;
    },
  },
});

export default generalSlice.reducer;
export const generalActions = generalSlice.actions;
