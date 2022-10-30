import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setChats } = chatSlice.actions;

export default chatSlice.reducer;
