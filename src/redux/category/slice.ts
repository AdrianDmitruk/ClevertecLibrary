import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategory } from './async-actions';
import { Category, CategorySliceState, Status } from './types';

const initialState: CategorySliceState = {
  items: [],
  status: Status.LOADING,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Category[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchCategory.fulfilled, (state) => {
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchCategory.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = categorySlice.actions;

export default categorySlice.reducer;
