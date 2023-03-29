import { Image } from './../fullBook/types';
import { Authors } from './../books/types';
export type Role = {
  id: number;
  name: string;
  description: string;
  type: string;
};

export type CommentsUser = [
  {
    id: number;
    rating: number | null;
    text: string | null;
    bookId: number;
  }
];

export type BookUser = {
  id: number;
  title: string;
  rating: number;
  issueYear: string;
  authors: Authors[];
  image: Image;
};

export type BookingUser = {
  id: number;
  order: boolean;
  dateOrder: Date;
  book: BookUser;
};

export type DeliveryUser = {
  id: number;
  handed: boolean;
  dateHandedFrom: Date;
  dateHandedTo: Date;
  book: BookUser;
};

export type HistoryBookUser = {
  id: number;
  title: string;
  rating: number;
  issueYear: string | null;
  authors: string[];
  image: string | null;
};

export type HistoryUser = {
  id: number;
  books: HistoryBookUser[];
};

export type User = {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  phone: string;
  role: Role;
  comments: CommentsUser | null;
  avatar: string | null;
  booking: BookingUser | null;
  delivery: DeliveryUser | null;
  history: HistoryUser | null;
};

export enum Status {
  LOADING = 'loading',
  SECCESS = 'seccess',
  ERROR = 'error',
}

export type UserSliceState = {
  data: User | null;
  statusUpdate: string;
  commentText: string;
  commentModal: boolean;
  isSearchComment: boolean;
  bookId: number | null;
  commentRating: number | null;
  status: Status;
};
