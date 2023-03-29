export type Token = {
  jwt: string | null;
};

export type dataRegister = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};
export type dataAuth = {
  identifier: string;
  password: string;
};
export type dataReset = {
  password: string | undefined;
  passwordConfirmation: string | undefined;
  code: string | undefined;
};

export enum Status {
  LOADING = 'loading',
  SECCESS = 'seccess',
  ERROR = 'error',
}

export type AuthSliceState = {
  data: Token;
  dataRegister: dataRegister;
  dataAuth: dataAuth;
  dataReset: dataReset;
  status: Status;
};
