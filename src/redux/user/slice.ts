import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, fetchUploadUser, fetchEditUser, fetchEditDataUser } from './async-actions';
import { User, UserSliceState, Status } from './types';

const initialState: UserSliceState = {
  data: null,
  statusUpdate: '',
  commentModal: false,
  bookId: null,
  isSearchComment: false,
  commentText: '',
  commentRating: null,
  status: Status.SECCESS,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<User>) {
      state.data = action.payload;
    },
    setStatusUpdate(state, action: PayloadAction<string>) {
      state.statusUpdate = action.payload;
    },
    setCommentModal(state, action: PayloadAction<boolean>) {
      state.commentModal = action.payload;
    },
    setBookId(state, action: PayloadAction<number>) {
      state.bookId = action.payload;
    },
    setIsSearchComment(state, action: PayloadAction<boolean>) {
      state.isSearchComment = action.payload;
    },
    setCommentText(state, action: PayloadAction<string>) {
      state.commentText = action.payload;
    },
    setCommentRating(state, action: PayloadAction<number>) {
      state.commentRating = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = Status.LOADING;
      state.data = null;
    });
    builder.addCase(fetchUser.fulfilled, (state) => {
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = Status.ERROR;
      state.data = null;
    });
    builder.addCase(fetchUploadUser.pending, (state) => {
      state.statusUpdate = '';
      state.status = Status.LOADING;
    });
    builder.addCase(fetchUploadUser.fulfilled, (state) => {
      state.statusUpdate = 'ok';
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchUploadUser.rejected, (state) => {
      state.statusUpdate = 'error';
      state.status = Status.ERROR;
    });
    builder.addCase(fetchEditUser.pending, (state) => {
      state.status = Status.LOADING;
      state.data = null;
    });
    builder.addCase(fetchEditUser.fulfilled, (state) => {
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchEditUser.rejected, (state) => {
      state.status = Status.ERROR;
      state.data = null;
    });
    builder.addCase(fetchEditDataUser.pending, (state) => {
      state.status = Status.LOADING;
      state.data = null;
    });
    builder.addCase(fetchEditDataUser.fulfilled, (state) => {
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchEditDataUser.rejected, (state) => {
      state.status = Status.ERROR;
      state.data = null;
    });
  },
});

export const {
  setItems,
  setStatusUpdate,
  setCommentModal,
  setBookId,
  setIsSearchComment,
  setCommentText,
  setCommentRating,
} = userSlice.actions;

export default userSlice.reducer;
