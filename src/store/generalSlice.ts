import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {checkAuth} from './thunks/authThunk';
import {ILanguage} from "../react-app-env";
import Localizations from "../constants/localizations";

export interface IReduxUser {
  username: string,
  profilePhoto: string | null
}

interface IGeneralInitialState {
  theme: string,
  isLogin: boolean | null,
  user: IReduxUser,
  language: ILanguage
}

const initialState: IGeneralInitialState = {
  theme: 'light',
  isLogin: null,
  user: {username: '', profilePhoto: null},
  language: Localizations.Ukrainian
};

const generalSlice = createSlice({
  name: 'generalSlice',
  initialState: initialState,
  reducers: {
    switchTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    login: (state, action: PayloadAction<IReduxUser>) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      state.isLogin = false;
      state.user = {} as IReduxUser;
    },
    setLanguage: (state, action: PayloadAction<ILanguage>) => {
      state.language = action.payload
    },
    setUser: (state, action: PayloadAction<IReduxUser>) => {
      state.user = action.payload
    },
    setIsLoginFalse: (state) => {
      state.isLogin = false
    }
  },
  extraReducers: {
    [checkAuth.fulfilled.type]: (state, action: PayloadAction<IReduxUser>) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    [checkAuth.rejected.type]: (state, action: PayloadAction<string>) => {
      state.user = {} as IReduxUser;
      state.isLogin = false;
    },
  },
});

export default generalSlice.reducer;
export const generalActions = generalSlice.actions;
