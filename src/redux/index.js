import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import chatSlice from './slice/chatSlice';
import modalSlice from './slice/modalSlice';
import postSlice from './slice/postSlice';
import profileSlice from './slice/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
    modal: modalSlice,
    post: postSlice,
    profile: profileSlice,
  },
});
