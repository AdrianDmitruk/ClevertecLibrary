export const getAvailableBookingDates = (date: Date): boolean => {
  const today = new Date();
  const todayDay = today.getDay();

  if (todayDay === 5) {
    const monday = new Date(today);

    monday.setDate(today.getDate() + 3);

    return (
      (date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()) ||
      (date.getDate() === monday.getDate() &&
        date.getMonth() === monday.getMonth() &&
        date.getFullYear() === monday.getFullYear())
    );
  }

  if (todayDay === 0 || todayDay === 6) {
    const monday = new Date(today);

    monday.setDate(today.getDate() + ((1 + 7 - todayDay) % 7));

    return (
      date.getDate() === monday.getDate() &&
      date.getMonth() === monday.getMonth() &&
      date.getFullYear() === monday.getFullYear()
    );
  }

  const tomorrow = new Date(today);

  tomorrow.setDate(today.getDate() + 1);

  return (
    (date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()) ||
    (date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear())
  );
};
