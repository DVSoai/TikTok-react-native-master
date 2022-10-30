import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  data: null,
  modalType: -1,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalOpenCommentSection: (state, action) => {
      state.open = action.payload.open;
      state.data = action.payload.data;
    },
    clearModal: (state) => {
      state.open = false;
      state.data = null;
      state.modalType = -1;
    },
  },
});

export const { clearModal, modalOpenCommentSection } = modalSlice.actions;

export default modalSlice.reducer;
