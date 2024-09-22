import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalBottom: false,
};

export const componentSlice = createSlice({
  name: "component",
  initialState: initialState,
  reducers: {
    setModalBottom: (state, action) => {
      state.modalBottom = action.payload;
    },
  },
});

export const { setModalBottom } = componentSlice.actions;
export default componentSlice.reducer;
