import { createSlice } from "@reduxjs/toolkit";

// Declaring initial state
const initialState = {
  sideBarState: false,
  triggerToggle: false,
  toggleWishedSider: false,
};

const createBookSlice = createSlice({
  name: "createBookSlice",
  initialState,
  reducers: {
    // action to open or close the sideBar
    toggleSideBar: (state, action) => {
      state.sideBarState = !state.sideBarState;
    },

    // Trigger to reload page for new books to fetch

    triggerReload: (state, action) => {
      state.triggerToggle = !state.triggerToggle;
    },

    // action to open or close the sideBar to create a wished book
    toggleWishedBookSider: (state, action) => {
      state.toggleWishedSider = !state.toggleWishedSider;
    },
  },
});

export const { toggleSideBar, triggerReload, toggleWishedBookSider } =
  createBookSlice.actions;

export default createBookSlice.reducer;
