import { Authors, Booking, Categories, Delivery, Histories } from '../books/types';
export type Image = [
  {
    url: string;
  }
];

export type userComments = {
  commentUserId: number;
  firstName: string;
  lastName: string;
  avatarUrl: string;
};

export type Comments = [
  {
    id: number;
    rating: number | null;
    text: string;
    createdAt: string;
    user: userComments;
  }
];

export type CommentData = {
  id: number;
  attributes: {
    rating: number;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
};

export type Book = {
  issueYear: string;
  rating: number | null;
  title: string;
  authors: Authors;
  images: Image;
  categories: Categories;
  id: number;
  description: string;
  booking: Booking | null;
  delivery: Delivery | null;
  histories: Histories | null;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  comments: Comments | null;
};

export enum Status {
  LOADING = 'loading',
  SECCESS = 'seccess',
  ERROR = 'error',
}

export type FullBookSliceState = {
  items: Book | null;
  statusComment: string;
  statusEditComment: string;
  status: Status;
};
