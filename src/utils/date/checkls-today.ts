import { checkDateIsEqual } from './check-datei-equal';

export const checkIsToday = (date: Date) => {
  const today = new Date();

  return checkDateIsEqual(today, date);
};
