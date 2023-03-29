import { ADD_COMMENT } from './../../api/endpoint';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Book, CommentData } from './types';

import axiosInstance from '../../api';
import { BOOKS_ENDPOINT } from '../../api/endpoint';
import { setItems } from './slice';
import { IBookPageData } from '../../pages/book/book-page';

export const fetchFullBook = createAsyncThunk<Book | undefined, string>(
  'fullBook/fetchFullBookStatus',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<Book>(`${BOOKS_ENDPOINT}/${params}`);
      dispatch(setItems(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAddCommentBook = createAsyncThunk(
  'comment/fetchAddCommentBookStatus',
  async (data: IBookPageData, { rejectWithValue }) => {
    try {
      await axiosInstance.post<CommentData>(ADD_COMMENT, { data });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEditCommentBook = createAsyncThunk(
  'comment/fetchEditCommentBookStatus',
  async ({ data, id }: { data: IBookPageData; id: string }, { rejectWithValue }) => {
    try {
      await axiosInstance.put<CommentData>(`${ADD_COMMENT}${id}/`, { data });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
