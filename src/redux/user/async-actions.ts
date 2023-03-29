import { EDIT_USER, GET_USER, UPLOAD_USER } from './../../api/endpoint';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from './types';
import axiosInstance from '../../api';

import { setItems } from './slice';
import { number } from 'yup';
import { IEditInfoPage } from '../../components/profile/profile-info/profile-info';

export const fetchUser = createAsyncThunk('user/fetchUserStatus', async (_, { dispatch, rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get<User>(GET_USER);

    dispatch(setItems(data));
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchUploadUser = createAsyncThunk(
  'user/fetchUploadUserStatus',
  async (file: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<{ id: number }>(UPLOAD_USER, file);
      return { data };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEditUser = createAsyncThunk(
  'user/fetchEditUserStatus',
  async ({ avatar, id }: { avatar: number; id: number }, { rejectWithValue }) => {
    try {
      await axiosInstance.put<User>(`${EDIT_USER}${id}/`, { avatar });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEditDataUser = createAsyncThunk(
  'user/fetchEditDataUserStatus',
  async ({ params, id }: { params: IEditInfoPage; id: number }, { rejectWithValue }) => {
    try {
      await axiosInstance.put<User>(`${EDIT_USER}${id}/`, params);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
