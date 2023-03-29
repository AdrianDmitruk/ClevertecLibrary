export type Category = {
  name: string;
  path: string;
  id: number;
};

export enum Status {
  LOADING = 'loading',
  SECCESS = 'seccess',
  ERROR = 'error',
}

export type CategorySliceState = {
  items: Category[] | undefined;
  status: Status;
};
