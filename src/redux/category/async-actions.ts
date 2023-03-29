import { CATEGORIES_ENDPOINT } from './../../api/endpoint';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Category } from './types';

import axiosInstance from '../../api/';

import { setItems } from './slice';

export const fetchCategory = createAsyncThunk<Category[] | undefined>(
  'category/fetchBooksStatus',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<Category[]>(CATEGORIES_ENDPOINT);
      dispatch(setItems(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
