export const TOKEN_JWT = 'jwt';
export const PHONE_VALID = /^\+375\s\((29|33|25|44)\)\s\d{3}-\d{2}-\d{2}$/;
export const USERNAME_REGEX = /^(?=.*[a-z])(?!.*\s).*$/;
export const USERNAME_REQUIRED_NUMBER_REGEX = /^(?=.*\d).*$/;
export const PASSWORD_CAPITAL_LETTER_REGEX = /^(?=.*[А-ЯA-Z]).*$/;
export const PASSWORD_DIGITS_REGEX = /.*[0-9].*/;
export const PASSWORD_ALPHABET_REGEX = /.{8,}/;
export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export const PHONE_MASK = [
  '+',
  '3',
  '7',
  '5',
  ' ',
  '(',
  /\d/,
  /\d/,
  ')',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
];

export const ERROR_EMPTY_FIELD = 'Поле не может быть пустым';
export const ERROR_PASSWORD_MISMATCH = 'Пароли не совпадают';
export const ERROR_EMAIL_MISMATCH = 'Введите корректный e-mail';
export const ERROR_LOGIN_FORMAT = 'Используйте для логина латинский алфавит и цифры';
export const ERROR_PASSWORD_FORMAT = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';
export const ERROR_REQUIRED_FIELD = 'обязательное';

export const ERRORS_VALID = {
  [ERROR_EMPTY_FIELD]: 'Поле не может быть пустым',
  [ERROR_PASSWORD_MISMATCH]: 'Пароли не совпадают',
  [ERROR_EMAIL_MISMATCH]: 'Введите корректный e-mail',
  [ERROR_LOGIN_FORMAT]: 'Используйте для логина латинский алфавит и цифры',
  [ERROR_PASSWORD_FORMAT]: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
  [ERROR_REQUIRED_FIELD]: 'обязательное',
};

export const STATUS = {
  ERROR: 'error',
  OK: 'ok',
  LOADING: 'loading',
};

export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  REGISTRATION: '/registration',
  FORGOT_PASS: '/forgot-pass',
  BOOKS_CATEGORY: '/books/:category',
  BOOKS_CATEGORY_ID: '/books/:category/:id',
  TERMS: '/rules',
  CONTRACT: '/contract',
  PROFILE: '/profile',
};
