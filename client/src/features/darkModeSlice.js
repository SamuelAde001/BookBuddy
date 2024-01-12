import { createSlice } from "@reduxjs/toolkit";

// Declaring initial state
const initialState = {
  darkMode: false,
};

const darkModeSlice = createSlice({
  name: "darkModeSlice",
  initialState,
  reducers: {
    // toggle Dark mode
    toggleDarkMode: (state, action) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
