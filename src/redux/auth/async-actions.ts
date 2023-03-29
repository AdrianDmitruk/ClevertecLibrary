import { AUTH_FORGOT, AUTH_RESET } from './../../api/endpoint';
import { IRegistrationPage } from './../../pages/authorization/registration/registration-page';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Token } from './types';

import axiosInstance from '../../api';
import { AUTH_LOGIN, AUTH_REGISTRATION } from '../../api/endpoint';
import { setItems } from './slice';
import { IAuthPage } from '../../pages/authorization/auth/auth-page';
import { IForgotPassPage } from '../../pages/authorization/forgot-pass/forgot-pass-page';
import { TOKEN_JWT } from '../../constans';

export const fetchRegistration = createAsyncThunk(
  'registration/fetchRegistrationStatus',
  async (params: IRegistrationPage, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<Token>(AUTH_REGISTRATION, params);

      dispatch(setItems(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  'login/fetchLoginStatus',
  async (params: IAuthPage, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<Token>(AUTH_LOGIN, params);
      if (data.jwt) {
        localStorage.setItem(TOKEN_JWT, data.jwt);
      }
      dispatch(setItems(data));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchForgotPassword = createAsyncThunk(
  'forgot/fetchforgotPasswordStatus',
  async (params: IForgotPassPage, { rejectWithValue }) => {
    try {
      await axiosInstance.post(AUTH_FORGOT, params);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchResetPassword = createAsyncThunk(
  'reset/fetchResetPasswordStatus',
  async (params: IForgotPassPage, { rejectWithValue }) => {
    try {
      await axiosInstance.post(AUTH_RESET, params);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
