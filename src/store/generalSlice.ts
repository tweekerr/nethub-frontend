import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
};

const generalSlice = createSlice({
  name: 'generalSlice',
  initialState: initialState,
  reducers: {
    switchTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export default generalSlice.reducer;
export const generalActions = generalSlice.actions;
