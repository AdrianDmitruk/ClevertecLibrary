/* eslint-disable no-unsafe-optional-chaining */
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { HOST_ENDPOINT } from '../../../../api/endpoint';
import notBook from '../../../../assets/content/book-not.png';
import { fetchAddBooking, fetchReceivesBooking, fetchRemoveBooking } from '../../../../redux/books/async-actions';
import { fetchFullBook } from '../../../../redux/fullBook/async-actions';
import { Book } from '../../../../redux/fullBook/types';
import { useAppDispatch } from '../../../../redux/store';
import { selectUserData } from '../../../../redux/user/selectors';
import { formatDate } from '../../../../utils/date/format-date';
import { Calendar } from '../../../calendar';
import { PrimaryButton } from '../../../common/buttons/primary-button';
import { BookingModal } from '../../modal/booking-modal';

import styles from './profile-book.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

type ProfileBookProps = {
  onDataBook: Book | null;
};

export const ProfileBook: FC<ProfileBookProps> = ({ onDataBook }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bookingDate = onDataBook?.booking ? new Date(onDataBook.booking.dateOrder) : null;
  const [selectedDate, selectDate] = useState<Date | null>(bookingDate);
  const { data: user } = useSelector(selectUserData);
  const { id: idPage } = useParams();
  const dispatch = useAppDispatch();

  const date = new Date(selectedDate ?? 0);

  date.setHours(date.getHours() + 3);
  const sendDate = date.toISOString();

  const handleFetchFullBook = () => {
    if (idPage) {
      dispatch(fetchFullBook(idPage));
    }
  };

  const handleSubmit = () => {
    if (user?.id && idPage) {
      const params = {
        order: true,
        dateOrder: sendDate,
        book: idPage,
        customer: user.id.toString(),
      };

      dispatch(fetchAddBooking(params)).then((result) => {
        if (fetchAddBooking.fulfilled.match(result)) {
          handleFetchFullBook();
        }
      });
    }
  };

  const handleSubmitReceives = () => {
    if (user?.id && idPage && onDataBook?.booking?.id) {
      const params = {
        order: true,
        dateOrder: sendDate,
        book: idPage,
        customer: user.id.toString(),
      };

      dispatch(fetchReceivesBooking({ data: params, id: onDataBook.booking.id })).then((result) => {
        if (fetchReceivesBooking.fulfilled.match(result)) {
          handleFetchFullBook();
        }
      });
    }
  };

  const handleSubmitRemove = () => {
    dispatch(fetchRemoveBooking(onDataBook?.booking?.id ?? '')).then((result) => {
      if (fetchRemoveBooking.fulfilled.match(result)) {
        handleFetchFullBook();
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.book}>
      <div className={styles.bookWrap}>
        {onDataBook?.images?.length ? (
          <div className={styles.bookImgWrap}>
            <div className={styles.bookImgFirst}>
              <Swiper
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className={styles.bookImgSwiper}
                data-test-id='slide-big'
                pagination={{
                  clickable: true,
                }}
              >
                {onDataBook?.images?.map((slideContent, index) => (
                  <SwiperSlide key={slideContent.url} virtualIndex={index}>
                    <img className={styles.bookImg} src={`${HOST_ENDPOINT}${slideContent.url}`} alt='bookImg' />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div
              className={classNames(styles.bookImgSecond, {
                [styles.bookImgSecondNon]: onDataBook?.images?.length === 1,
              })}
            >
              {onDataBook?.images?.length === 1 ? null : (
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={30}
                  modules={[FreeMode, Navigation, Pagination, Thumbs]}
                >
                  {onDataBook?.images?.map((slideContent, index) => (
                    <SwiperSlide
                      data-test-id='slide-mini'
                      className={styles.bookImgTset}
                      key={slideContent.url}
                      virtualIndex={index}
                    >
                      <img className={styles.bookImgSec} src={`${HOST_ENDPOINT}${slideContent.url}`} alt='bookImgSec' />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>
        ) : (
          <img data-test-id='slide-big' className={styles.bookImg} src={notBook} alt='book' />
        )}

        <div className={styles.bookRight}>
          <h3 data-test-id='book-title' className={styles.bookTitle}>
            {onDataBook?.title}
          </h3>
          <span className={styles.bookAuthr}>{onDataBook?.authors}</span>

          {!onDataBook?.booking && !onDataBook?.delivery && (
            <PrimaryButton
              handleBtnModal={() => setIsModalOpen(true)}
              showDefault={true}
              className={styles.bookBtn}
              fill='primary'
              dataId='booking-button'
            >
              Забронировать
            </PrimaryButton>
          )}

          {onDataBook?.booking?.customerId && +onDataBook?.booking?.customerId !== user?.id && (
            <PrimaryButton
              dataId='booking-button'
              showDefault={true}
              className={styles.bookBtn}
              disabled={true}
              fill='secondary'
            >
              Забронирована
            </PrimaryButton>
          )}

          {onDataBook?.booking?.customerId && +onDataBook?.booking?.customerId === user?.id && (
            <PrimaryButton
              handleBtnModal={() => setIsModalOpen(true)}
              showDefault={true}
              className={styles.bookBtn}
              fill='secondary'
              dataId='booking-button'
            >
              Забронирована
            </PrimaryButton>
          )}

          {onDataBook?.delivery?.dateHandedTo && (
            <PrimaryButton
              dataId='booking-button'
              showDefault={true}
              className={styles.bookBtn}
              disabled={true}
              fill='secondary'
            >
              {`Занята до ${formatDate(new Date(onDataBook.delivery.dateHandedTo), 'DD.MM')}`}
            </PrimaryButton>
          )}

          <div className={styles.bookAbout}>
            <h3 className={styles.bookAboutHeader}>О книге</h3>
            <div className={styles.bookAboutBorder} />
            <p className={styles.bookAboutMain}>{onDataBook?.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.bookAboutMobile}>
        <h3 className={styles.bookAboutHeader}>О книге</h3>
        <div className={styles.bookAboutBorder} />
        <p className={styles.bookAboutMain}>{onDataBook?.description}</p>
      </div>

      {onDataBook?.booking?.customerId && +onDataBook?.booking?.customerId === user?.id && selectedDate ? (
        <BookingModal isOpen={isModalOpen} onClose={handleCloseModal} title='Изменение даты бронирования'>
          <div className={styles.modal}>
            <Calendar selectDate={selectDate} selectedDate={selectedDate} />
            <div className={styles.modalBtnWrap}>
              <PrimaryButton
                showDefault={true}
                handleBtnModal={() => handleSubmitReceives()}
                fill='primary'
                disabled={
                  formatDate(new Date(selectedDate), 'DD.MM') ===
                  formatDate(new Date(onDataBook?.booking.dateOrder), 'DD.MM')
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
                showDefault={true}
                handleBtnModal={() => handleSubmit()}
                fill='primary'
                disabled={!selectedDate}
                className={styles.modalBtn}
                dataId='booking-button'
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
