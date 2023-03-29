import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFullBook, fetchAddCommentBook, fetchEditCommentBook } from './async-actions';
import { Book, FullBookSliceState, Status } from './types';

const initialState: FullBookSliceState = {
  items: null,
  statusComment: '',
  statusEditComment: '',
  status: Status.SECCESS,
};

export const fullBookSlice = createSlice({
  name: 'fullBook',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Book>) {
      state.items = action.payload;
    },
    setStatusComment(state, action: PayloadAction<string>) {
      state.statusComment = action.payload;
    },
    setStatusEditComment(state, action: PayloadAction<string>) {
      state.statusEditComment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFullBook.pending, (state) => {
      state.status = Status.LOADING;
      state.items = null;
    });
    builder.addCase(fetchFullBook.fulfilled, (state) => {
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchFullBook.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = null;
    });
    builder.addCase(fetchAddCommentBook.pending, (state) => {
      state.statusComment = '';
      state.statusEditComment = '';
      state.status = Status.LOADING;
    });
    builder.addCase(fetchAddCommentBook.fulfilled, (state) => {
      state.statusComment = 'ok';
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchAddCommentBook.rejected, (state) => {
      state.statusComment = 'error';
      state.status = Status.ERROR;
    });
    builder.addCase(fetchEditCommentBook.pending, (state) => {
      state.statusEditComment = '';
      state.statusComment = '';
      state.status = Status.LOADING;
    });
    builder.addCase(fetchEditCommentBook.fulfilled, (state) => {
      state.statusEditComment = 'ok';
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchEditCommentBook.rejected, (state) => {
      state.statusEditComment = 'error';
      state.status = Status.ERROR;
    });
  },
});

export const { setItems, setStatusComment, setStatusEditComment } = fullBookSlice.actions;

export default fullBookSlice.reducer;
