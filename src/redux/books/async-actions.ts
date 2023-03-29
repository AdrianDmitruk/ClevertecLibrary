import { ADD_BOOKING } from './../../api/endpoint';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { BookingData, Books } from './types';

import axiosInstance from '../../api/';
import { BOOKS_ENDPOINT } from '../../api/endpoint';
import { setItems } from './slice';
import { ICardBlockData } from '../../components/common/card-block/card-block';

export const fetchBooks = createAsyncThunk<Books[] | undefined>(
  'books/fetchBooksStatus',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<Books[]>(BOOKS_ENDPOINT);
      dispatch(setItems(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAddBooking = createAsyncThunk(
  'booking/fetchAddBookingStatus',
  async (data: ICardBlockData, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.post<BookingData>(ADD_BOOKING, { data });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchReceivesBooking = createAsyncThunk(
  'booking/fetchReceivesBookingStatus',
  async ({ data, id }: { data: ICardBlockData; id: string }, { rejectWithValue }) => {
    try {
      await axiosInstance.put<BookingData>(`${ADD_BOOKING}${id}/`, { data });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRemoveBooking = createAsyncThunk(
  'booking/fetchRemoveBookingStatus',
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete<BookingData>(`${ADD_BOOKING}${id}/`);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
