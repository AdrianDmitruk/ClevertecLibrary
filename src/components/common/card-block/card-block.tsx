/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable complexity */
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { HOST_ENDPOINT } from '../../../api/endpoint';
import bookNot from '../../../assets/content/book-not.png';
import {
  fetchAddBooking,
  fetchBooks,
  fetchReceivesBooking,
  fetchRemoveBooking,
} from '../../../redux/books/async-actions';
import { Books } from '../../../redux/books/types';
import { selectCategoryData } from '../../../redux/category/selectors';
import { useAppDispatch } from '../../../redux/store';
import { selectUserData } from '../../../redux/user/selectors';
import { formatDate } from '../../../utils/date/format-date';
import { BookingModal } from '../../blocks/modal/booking-modal';
import { Calendar } from '../../calendar';
import { PrimaryButton } from '../buttons/primary-button';
import { Hightlight } from '../hightlight';
import { Rating } from '../rating';

import styles from './card-block.module.scss';

type CardBlockProps = {
  items: Books;
  view?: boolean;
  filter?: string;
};

export type ICardBlockData = {
  order: boolean;
  dateOrder: string;
  book: string;
  customer: string;
};

export const CardBlock: FC<CardBlockProps> = ({ view, items, filter }) => {
  const { id, title, issueYear, authors, booking, delivery, image, rating } = items;
  const { items: categoryData } = useSelector(selectCategoryData);
  const { data: user } = useSelector(selectUserData);
  const bookingDate = booking ? new Date(booking.dateOrder) : null;
  const [selectedDate, selectDate] = useState<Date | null>(bookingDate);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();

  const dispatch = useAppDispatch();

  const date = new Date(selectedDate ?? 0);

  date.setHours(date.getHours() + 3);
  const sendDate = date.toISOString();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getCategoryBook = categoryData?.find((item) => item.path === location.pathname.split('/')[2]);

  const isCheckingCategory = () => (getCategoryBook ? getCategoryBook?.path : 'all');

  const handleSubmit = () => {
    if (user?.id) {
      const params = {
        order: true,
        dateOrder: sendDate,
        book: id,
        customer: user.id.toString(),
      };

      dispatch(fetchAddBooking(params)).then((result) => {
        if (fetchAddBooking.fulfilled.match(result)) {
          dispatch(fetchBooks());
        }
      });
    }
  };

  const handleSubmitReceives = () => {
    if (user?.id && booking?.id) {
      const params = {
        order: true,
        dateOrder: sendDate,
        book: id,
        customer: user.id.toString(),
      };

      dispatch(fetchReceivesBooking({ data: params, id: booking.id })).then((result) => {
        if (fetchReceivesBooking.fulfilled.match(result)) {
          dispatch(fetchBooks());
        }
      });
    }
  };

  const handleSubmitRemove = () => {
    dispatch(fetchRemoveBooking(booking?.id ?? '')).then((result) => {
      if (fetchRemoveBooking.fulfilled.match(result)) {
        dispatch(fetchBooks());
      }
    });
  };

  return (
    <div>
      <Link
        data-test-id='card'
        to={`/books/${isCheckingCategory()}/${id}`}
        className={classNames(view ? styles.card : styles.cardList)}
      >
        <img
          className={classNames(view ? styles.cardImg : styles.cardImgList)}
          src={image ? `${HOST_ENDPOINT}${image.url}` : bookNot}
          alt='book'
        />

        <div className={classNames(view ? '' : styles.cardMainWrapList)}>
          <div className={classNames(view ? '' : styles.cardMainList)}>
            {view && (
              <div>
                {rating ? (
                  <div className={classNames(view ? styles.cardScore : styles.cardScoreList)}>
                    <Rating count={rating} />
                  </div>
                ) : (
                  <div className={classNames(view ? styles.cardScore : styles.cardScoreList)}>ещё нет оценок</div>
                )}
              </div>
            )}

            <div className={classNames(view ? styles.cardTitleWrap : styles.cardTitleWrapList)}>
              <p className={classNames(view ? styles.cardTitle : styles.cardTitleList)}>
                <Hightlight str={title} filter={filter ?? ''} />
              </p>
            </div>
            <div className={classNames(view ? styles.cardAuthWrap : styles.cardAuthWrapList)}>
              <p className={classNames(view ? styles.cardAuthor : styles.cardAuthorList)}>
                {authors}, {issueYear}
              </p>
            </div>
          </div>
          <div className={classNames(view ? styles.cardWrapButton : styles.cardWrapButtonList)}>
            {!view && (
              <div>
                {rating ? (
                  <div className={classNames(view ? styles.cardScore : styles.cardScoreList)}>
                    <Rating className={classNames(view ? '' : styles.cardScoreListIcon)} count={rating} />
                  </div>
                ) : (
                  <div className={classNames(view ? styles.cardScore : styles.cardScoreList)}>ещё нет оценок</div>
                )}
              </div>
            )}

            {!booking && !delivery && (
              <PrimaryButton
                handleBtnModal={() => setIsModalOpen(true)}
                showDefault={true}
                size='xs'
                className={classNames(view ? styles.cardButton : styles.cardButtonList)}
                fill='primary'
                dataId='booking-button'
              >
                Забронировать
              </PrimaryButton>
            )}

            {booking?.customerId && +booking?.customerId !== user?.id && (
              <PrimaryButton
                showDefault={true}
                size='xs'
                className={classNames(view ? styles.cardButton : styles.cardButtonList)}
                disabled={true}
                fill='secondary'
                dataId='booking-button'
              >
                Забронирована
              </PrimaryButton>
            )}

            {booking?.customerId && +booking?.customerId === user?.id && (
              <PrimaryButton
                handleBtnModal={() => setIsModalOpen(true)}
                showDefault={true}
                size='xs'
                className={classNames(view ? styles.cardButton : styles.cardButtonList)}
                fill='secondary'
                dataId='booking-button'
              >
                Забронирована
              </PrimaryButton>
            )}

            {delivery?.dateHandedTo && (
              <PrimaryButton
                showDefault={true}
                size='xs'
                className={classNames(view ? styles.cardButton : styles.cardButtonList)}
                disabled={true}
                fill='secondary'
                dataId='booking-button'
              >
                {`Занята до ${formatDate(new Date(delivery.dateHandedTo), 'DD.MM')}`}
              </PrimaryButton>
            )}
          </div>
        </div>
      </Link>

      {booking?.customerId && +booking?.customerId === user?.id && selectedDate ? (
        <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} title='Изменение даты бронирования'>
          <div className={styles.modal}>
            <Calendar selectDate={selectDate} selectedDate={selectedDate} />
            <div className={styles.modalBtnWrap}>
              <PrimaryButton
                showDefault={true}
                handleBtnModal={() => handleSubmitReceives()}
                fill='primary'
                disabled={
                  formatDate(new Date(selectedDate), 'DD.MM') === formatDate(new Date(booking.dateOrder), 'DD.MM')
                }
                className={styles.modalBtn}
                dataId='booking-button'
              >
                забронировать
              </PrimaryButton>
              <PrimaryButton
                showDefault={true}
                handleBtnModal={() => handleSubmitRemove()}
                fill='secondary'
                className={styles.modalBtn}
                dataId='booking-cancel-button'
              >
                отменить бронь
              </PrimaryButton>
            </div>
          </div>
        </BookingModal>
      ) : (
        <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} title='Выбор даты бронирования'>
          <div className={styles.modal}>
            <Calendar selectDate={selectDate} selectedDate={selectedDate} />
            <div className={styles.modalBtnWrap}>
              <PrimaryButton
                dataId='booking-button'
                showDefault={true}
                handleBtnModal={() => handleSubmit()}
                fill='primary'
                disabled={!selectedDate}
                className={styles.modalBtn}
              >
                забронировать
              </PrimaryButton>
            </div>
          </div>
        </BookingModal>
      )}
    </div>
  );
};
