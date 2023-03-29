export type Authors = [string];
export type Image = {
  url: string;
};
export type Categories = string[];
export type Booking = {
  id: string;
  order: boolean;
  dateOrder: Date;
  customerId: string;
  customerFirstName: string;
  customerLastName: string;
};
export type Delivery = {
  id: string;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: Date;
  recipientId: number;
  recipientFirstName: string;
  recipientLastName: string;
};
export type Histories = [{ id: string; userId: string }];

export type Books = {
  issueYear: string;
  rating: number | null;
  title: string;
  authors: Authors[];
  image: Image;
  categories: string[];
  id: string;
  booking: Booking | null;
  delivery: Delivery | null;
  histories: Histories[] | null;
};

export type BookingData = {
  id: number;
  attributes: {
    order: boolean;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    dateOrder: Date;
  };
};

export enum Status {
  LOADING = 'loading',
  SECCESS = 'seccess',
  ERROR = 'error',
}

export type BooksSliceState = {
  items: Books[] | undefined;
  statusBooking: string;
  statusReceivesBooking: string;
  statusRemoveBooking: string;
  status: Status;
};
