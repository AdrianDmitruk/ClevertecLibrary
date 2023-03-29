import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import books from './books/slice';
import category from './category/slice';
import fullBook from './fullBook/slice';
import filter from './filter/slice';
import auth from './auth/slice';
import user from './user/slice';

export const store = configureStore({
  reducer: {
    books,
    category,
    fullBook,
    filter,
    auth,
    user,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
