import { RootState } from '../store';

export const selectBooksData = (state: RootState) => state.books;
