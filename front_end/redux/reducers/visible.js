import { createSlice } from "@reduxjs/toolkit";

export const visibleSlice = createSlice({
  name: "visible",
  initialState: {
    isNavbarHidden: false,
    isFooterHidden: false,
  },
  reducers: {
    hideNavbar: (state) => {
      state.isNavbarHidden = true;
    },
    showNavbar: (state) => {
      state.isNavbarHidden = false;
    },
    hideFooter: (state) => {
      state.isFooterHidden = true;
    },
    showFooter: (state) => {
      state.isFooterHidden = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { hideNavbar, showNavbar, hideFooter, showFooter } =
  visibleSlice.actions;

export default visibleSlice.reducer;
