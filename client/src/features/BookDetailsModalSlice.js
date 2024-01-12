import { createSlice } from "@reduxjs/toolkit";

// Declaring initial state
const initialState = {
  modalOpen: false,
  bookDetails: null,
  updateBookModalState: false,
  wishedBookUpdateModal: false,
};

const BookDetailsModalSlice = createSlice({
  name: "BookDetailsModalSlice",
  initialState,
  reducers: {
    // action to open or close the modal
    toggleModal: (state, action) => {
      state.modalOpen = !state.modalOpen;
      if (!state.modalOpen) {
        state.bookDetails = null;
      } else {
        state.bookDetails = action.payload;
      }
    },
    // toggle modal to update book details
    toggleUpdateBooksModal: (state, action) => {
      state.updateBookModalState = !state.updateBookModalState;
    },

    // toggle wish book transfer modal
    toggleWishedBookUpdateModal: (state, action) => {
      state.wishedBookUpdateModal = !state.wishedBookUpdateModal;
    },
  },
});

export const {
  toggleModal,
  toggleUpdateBooksModal,
  toggleWishedBookUpdateModal,
} = BookDetailsModalSlice.actions;

export default BookDetailsModalSlice.reducer;
