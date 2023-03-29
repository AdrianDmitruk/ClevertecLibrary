import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOKEN_JWT } from '../../constans';
import { fetchLogin, fetchRegistration, fetchForgotPassword, fetchResetPassword } from './async-actions';
import { Token, AuthSliceState, Status, dataRegister, dataAuth, dataReset } from './types';

const initialState: AuthSliceState = {
  data: {
    jwt: localStorage.getItem(TOKEN_JWT) || null,
  },
  dataRegister: {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  },
  dataAuth: {
    identifier: '',
    password: '',
  },
  dataReset: {
    password: '',
    passwordConfirmation: '',
    code: '',
  },
  status: Status.SECCESS,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Token>) {
      state.data.jwt = action.payload.jwt;
    },
    setDataRegister(state, action: PayloadAction<dataRegister>) {
      state.dataRegister = action.payload;
    },
    setDataAuth(state, action: PayloadAction<dataAuth>) {
      state.dataAuth = action.payload;
    },
    setDataReset(state, action: PayloadAction<dataReset>) {
      state.dataReset = action.payload;
    },
    logout: (state) => {
      state.data.jwt = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegistration.pending, (state) => {
      state.status = Status.LOADING;
      state.data = {
        jwt: null,
      };
    });
    builder.addCase(fetchRegistration.fulfilled, (state) => {
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchRegistration.rejected, (state) => {
      state.status = Status.ERROR;
      state.data = {
        jwt: null,
      };
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = Status.LOADING;
      state.data = {
        jwt: null,
      };
    });
    builder.addCase(fetchLogin.fulfilled, (state) => {
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = Status.ERROR;
      state.data = {
        jwt: null,
      };
    });
    builder.addCase(fetchForgotPassword.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchForgotPassword.fulfilled, (state) => {
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchForgotPassword.rejected, (state) => {
      state.status = Status.ERROR;
    });
    builder.addCase(fetchResetPassword.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchResetPassword.fulfilled, (state) => {
      state.status = Status.SECCESS;
    });
    builder.addCase(fetchResetPassword.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setItems, setDataRegister, setDataAuth, setDataReset, logout } = authSlice.actions;

export default authSlice.reducer;
