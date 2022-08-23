import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import createArticleSlice from './createArticleSlice';
import generalSlice from './generalSlice';
import createArticlePlugSlice from './plugArticleSlice';

const rootReducer = combineReducers({
  articleReducer: createArticleSlice,
  plugArticleReducer: createArticlePlugSlice,
  generalReducer: generalSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): typeof store.dispatch =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
