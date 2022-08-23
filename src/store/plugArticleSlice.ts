import { createSlice } from '@reduxjs/toolkit';

//TODO: ASK

const createArticlePlugSlice = createSlice({
  name: 'plugArticleId',
  initialState: {
    plugArticleId: 0,
  },
  reducers: {
    updateArticleId: (state, action) => {
      state.plugArticleId = action.payload;
    },
  },
});

export const { updateArticleId } = createArticlePlugSlice.actions;
export const createArticlePlugActions = createArticlePlugSlice.actions;

export default createArticlePlugSlice.reducer;
