export const getWeekDays = (date: Date): boolean => {
  const dayOfWeek = date.getDay();

  return dayOfWeek === 0 || dayOfWeek === 6;
};
