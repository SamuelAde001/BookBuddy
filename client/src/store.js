import { configureStore } from "@reduxjs/toolkit";
import createBookReducer from "./features/createNewBookSlice";
import BookDetailsModalReducer from "./features/BookDetailsModalSlice";
import darkModeReducer from "./features/darkModeSlice";

export const store = configureStore({
  reducer: {
    createBookReducer: createBookReducer,
    BookDetailsModalReducer: BookDetailsModalReducer,
    darkModeReducer: darkModeReducer,
  },
});
