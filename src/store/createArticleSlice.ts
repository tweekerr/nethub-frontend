import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import IArticle from "../types/IArticle";

const initialState: IArticle = {
  title: '',
  subTitle: '',
  body: '',
  tags: [],
  originalLink: null
}


export const createArticleSlice = createSlice({
  name: 'createArticle',
  initialState: initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateSubTitle: (state, action: PayloadAction<string>) => {
      state.subTitle = action.payload;
    },
    updateBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload;
    },
    updateTags: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.concat(action.payload);
    },
    updateOriginalLink: (state, action: PayloadAction<string | null>) => {
      state.originalLink = action.payload;
    },
  },
});

export const createArticlesActions = createArticleSlice.actions;
export default createArticleSlice.reducer;
