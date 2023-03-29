import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBooks, fetchAddBooking, fetchReceivesBooking, fetchRemoveBooking } from './async-actions';
import { Books, BooksSliceState, Status } from './types';

const initialState: BooksSliceState = {
  items: [],
  statusBooking: '',
  statusReceivesBooking: '',
  statusRemoveBooking: '',
  status: Status.SECCESS,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Books[]>) {
      state.items = action.payload;
    },
    setStatusBooking(state, action: PayloadAction<string>) {
      state.statusBooking = action.payload;
    },
    setStatusReceivesBooking(state, action: PayloadAction<string>) {
      state.statusReceivesBooking = action.payload;
    },
    setStatusRemoveBooking(state, action: PayloadAction<string>) {
      state.statusRemoveBooking = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchBooks.fulfilled, (state) => {
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchBooks.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    builder.addCase(fetchAddBooking.pending, (state) => {
      state.statusBooking = '';
      state.statusReceivesBooking = '';
      state.statusRemoveBooking = '';
      state.status = Status.LOADING;
    });
    builder.addCase(fetchAddBooking.fulfilled, (state) => {
      state.statusBooking = 'ok';
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchAddBooking.rejected, (state) => {
      state.statusBooking = 'error';
      state.status = Status.ERROR;
    });
    builder.addCase(fetchReceivesBooking.pending, (state) => {
      state.statusReceivesBooking = '';
      state.statusBooking = '';
      state.statusRemoveBooking = '';
      state.status = Status.LOADING;
    });
    builder.addCase(fetchReceivesBooking.fulfilled, (state) => {
      state.statusReceivesBooking = 'ok';
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchReceivesBooking.rejected, (state) => {
      state.statusReceivesBooking = 'error';
      state.status = Status.ERROR;
    });
    builder.addCase(fetchRemoveBooking.pending, (state) => {
      state.statusReceivesBooking = '';
      state.statusBooking = '';
      state.statusRemoveBooking = '';
      state.status = Status.LOADING;
    });
    builder.addCase(fetchRemoveBooking.fulfilled, (state) => {
      state.statusRemoveBooking = 'ok';
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchRemoveBooking.rejected, (state) => {
      state.statusRemoveBooking = 'error';
      state.status = Status.ERROR;
    });
  },
});

export const { setItems, setStatusBooking, setStatusReceivesBooking, setStatusRemoveBooking } = booksSlice.actions;

export default booksSlice.reducer;
