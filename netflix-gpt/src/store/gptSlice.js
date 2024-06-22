import { createSlice } from '@reduxjs/toolkit';

const gptSlice = createSlice({
  name: 'gpt',
  initialState: {
    showGptSearchPage: false,
  },
  reducers: {
    toggleGptSearch: state => {
      state.showGptSearchPage = !state.showGptSearchPage;
    },
  },
});

export const { toggleGptSearch } = gptSlice.actions;

export default gptSlice.reducer;
