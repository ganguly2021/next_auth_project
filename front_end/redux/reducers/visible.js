import { createSlice } from "@reduxjs/toolkit";

export const visibleSlice = createSlice({
  name: "visible",
  initialState: {
    isNavbarHidden: false,
    isFooterHidden: false,
    animateSidebar: true,
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
    stopSidebarAnimate: (state) => {
      state.animateSidebar = false
    }
  },
});

// Action creators are generated for each case reducer function
export const { hideNavbar, showNavbar, hideFooter, showFooter, stopSidebarAnimate } =
  visibleSlice.actions;

export default visibleSlice.reducer;
