import { createSlice } from '@reduxjs/toolkit'

export const visibleSlice = createSlice({
  name: 'visible',
  initialState: {
    isNavbarHidden: false
  },
  reducers: {
    hideNavbar: (state) => {
      state.isNavbarHidden = true
    },
    showNavbar: (state) => {
      state.isNavbarHidden = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { hideNavbar, showNavbar } = visibleSlice.actions

export default visibleSlice.reducer