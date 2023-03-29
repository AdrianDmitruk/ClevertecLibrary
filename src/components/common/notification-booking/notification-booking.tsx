import { FC } from 'react';
import { useSelector } from 'react-redux';

import { STATUS } from '../../../constans';
import { selectBooksData } from '../../../redux/books/selectors';
import { selectFullBookData } from '../../../redux/fullBook/selectors';
import { HandlerError } from '../handler-error';

export const NotificationBooking: FC = (): JSX.Element => {
  const { statusBooking, statusReceivesBooking, statusRemoveBooking } = useSelector(selectBooksData);
  const { statusComment, statusEditComment } = useSelector(selectFullBookData);

  if (statusBooking === STATUS.OK) {
    return (
      <HandlerError
        err={true}
        seccess={true}
        title='Книга забронирована. Подробности можно посмотреть на странице Профиль'
      />
    );
  }

  if (statusReceivesBooking === STATUS.OK) {
    return <HandlerError err={true} seccess={true} title='Изменения успешно сохранены!' />;
  }

  if (statusRemoveBooking === STATUS.OK) {
    return <HandlerError err={true} seccess={true} title='Бронирование книги успешно отменено!' />;
  }

  if (statusComment === STATUS.OK) {
    return <HandlerError err={true} seccess={true} title='Спасибо, что нашли время оценить книгу!' />;
  }

  if (statusEditComment === STATUS.OK) {
    return <HandlerError err={true} seccess={true} title='Спасибо, что нашли время изменить оценку!' />;
  }

  if (statusBooking === STATUS.ERROR) {
    return <HandlerError err={true} title='Что-то пошло не так, книга не забронирована. Попробуйте позже!' />;
  }

  if (statusReceivesBooking === STATUS.ERROR) {
    return <HandlerError err={true} title='Изменения не были сохранены. Попробуйте позже!' />;
  }

  if (statusRemoveBooking === STATUS.ERROR) {
    return <HandlerError err={true} title='Не удалось снять бронирование книги. Попробуйте позже!' />;
  }

  if (statusComment === STATUS.ERROR) {
    return <HandlerError err={true} title='Оценка не была отправлена. Попробуйте позже!' />;
  }

  if (statusEditComment === STATUS.ERROR) {
    return <HandlerError err={true} title='Изменения не были сохранены. Попробуйте позже!' />;
  }

  return <div />;
};
