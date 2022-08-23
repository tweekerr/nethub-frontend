import {useDispatch} from 'react-redux';
import {bindActionCreators} from '@reduxjs/toolkit';
import {createArticlesActions} from '../store/createArticleSlice';
import {createArticlePlugActions} from "../store/plugArticleSlice";
import {generalActions} from "../store/generalSlice";

const allActions = {
  ...createArticlesActions,
  ...createArticlePlugActions,
  ...generalActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
