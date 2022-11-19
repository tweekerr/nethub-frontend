import create from 'zustand';
import Localizations from "../constants/localizations";
import {JWTStorage} from "../utils/localStorageProvider";
import {ILanguage} from "../react-app-env";
import {IReduxUser} from "../types/IReduxUser";

interface IStoreInitialState {
  isLogin: boolean | null,
  user: IReduxUser,
  language: ILanguage
  login: (reduxUser: IReduxUser) => void,
  logout: () => void,
  updateProfile: (reduxUser: IReduxUser) => void,
  setLanguage: (language: ILanguage) => void
}

export const useAppStore = create<IStoreInitialState>(set => ({
  isLogin: null,
  user: {id: '', username: '', profilePhotoLink: null, firstName: ''},
  language: Localizations.Ukrainian,
  login: (reduxUser: IReduxUser) => set({
    isLogin: true,
    user: reduxUser
  }),
  logout: () => {
    JWTStorage.clearTokensData();
    set({isLogin: false, user: {} as IReduxUser})
  },
  updateProfile: (reduxUser: IReduxUser) => set({user: reduxUser}),
  setLanguage: (language: ILanguage) => set({language})
}));
