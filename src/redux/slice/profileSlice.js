import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileUserIdDisplay: null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileUserIdDisplay: (state, action) => {
      state.profileUserIdDisplay = action.payload;
    },
  },
});

export const { setProfileUserIdDisplay } = profileSlice.actions;

export default profileSlice.reducer;
