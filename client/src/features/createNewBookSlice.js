import { createSlice } from "@reduxjs/toolkit";

// Declaring initial state
const initialState = {
  sideBarState: false,
  triggerToggle: false,
  toggleWishedSider: false,
  triggerMenu: false,
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

    // action to open or close the sideBar to create a wished book
    triggerMenu: (state, action) => {
      state.triggerMenu = !state.triggerMenu;
    },
    // stiil on settting menu
    setMenuState: (state, action) => {
      state.triggerMenu = action.payload;
    },
  },
});

export const {
  toggleSideBar,
  triggerReload,
  toggleWishedBookSider,
  triggerMenu,
  setMenuState,
} = createBookSlice.actions;

export default createBookSlice.reducer;
