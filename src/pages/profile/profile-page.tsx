import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CommentModal } from '../../components/blocks/modal/comment-modal';
import { Cover } from '../../components/common/cover';
import { NotificationBooking } from '../../components/common/notification-booking';
import { ProfileWrap } from '../../components/profile';
import { ProfileBooking } from '../../components/profile/profile-booking';
import { ProfileDelivery } from '../../components/profile/profile-delivery';
import { ProfileHistory } from '../../components/profile/profile-history';
import { ProfileInfo } from '../../components/profile/profile-info';
import { ProfilePhoto } from '../../components/profile/profile-photo';
import { fetchBooks } from '../../redux/books/async-actions';
import { setStatusBooking, setStatusReceivesBooking, setStatusRemoveBooking } from '../../redux/books/slice';
import { fetchCategory } from '../../redux/category/async-actions';
import { fetchAddCommentBook, fetchEditCommentBook } from '../../redux/fullBook/async-actions';
import { setStatusComment } from '../../redux/fullBook/slice';
import { useAppDispatch } from '../../redux/store';
import { fetchUser } from '../../redux/user/async-actions';
import { selectUserData } from '../../redux/user/selectors';
import { setCommentModal, setIsSearchComment, setStatusUpdate } from '../../redux/user/slice';

import styles from './profile-page.module.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

export const ProfilePage: FC = () => {
  const { data: user, commentModal, bookId, isSearchComment, commentRating, commentText } = useSelector(selectUserData);
  const dispatch = useAppDispatch();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchBooks());
    dispatch(fetchCategory());
    dispatch(setStatusBooking(''));
    dispatch(setStatusReceivesBooking(''));
    dispatch(setStatusRemoveBooking(''));
    dispatch(setStatusComment(''));
    dispatch(setStatusUpdate(''));
    dispatch(setIsSearchComment(false));
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookId, setIsBookId] = useState<number | null>(null);
  const [isComment, setIsComment] = useState<boolean>(false);
  const [selectedRate, setSelectedRate] = useState<number | undefined>(5);

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setIsModalOpen(commentModal);
    setIsBookId(bookId);
    setSelectedRate(5);
    if (isSearchComment) {
      setIsComment(isSearchComment);
      setSelectedRate(commentRating ?? 5);
      setValue(commentText ?? '');
    }
  }, [bookId, commentModal, commentRating, commentText, isSearchComment]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const handleSelectedRateChange = (rate: number | undefined) => {
    setSelectedRate(rate);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(setCommentModal(false));
  };

  const onSubmitComment = async () => {
    if (selectedRate && isBookId && user?.id) {
      const data = {
        rating: selectedRate,
        text: value,
        book: isBookId.toString(),
        user: user.id.toString(),
      };

      const res = await dispatch(fetchAddCommentBook(data));

      if (!res.payload) {
        await dispatch(fetchUser());
        setIsModalOpen(false);
        setValue('');
      }
      setIsModalOpen(false);
      await dispatch(fetchUser());
      setValue('');
    }
  };

  const onEditComment = async () => {
    if (selectedRate && isBookId && user?.id) {
      const data = {
        rating: selectedRate,
        text: value,
        book: isBookId.toString(),
        user: user.id.toString(),
      };

      const result = await dispatch(fetchEditCommentBook({ data, id: isBookId.toString() }));

      if (fetchEditCommentBook.fulfilled.match(result)) {
        await dispatch(fetchUser());
        setIsModalOpen(false);
        setValue('');
      }
      setIsModalOpen(false);
      await dispatch(fetchUser());
      setValue('');
    }
  };

  return (
    <section className={styles.profile}>
      <NotificationBooking />
      <ProfilePhoto />
      <ProfileWrap title='Учётные данные' subtitle='Здесь вы можете отредактировать информацию о себе'>
        <ProfileInfo />
      </ProfileWrap>
      <ProfileWrap
        title='Забронированная книга'
        subtitle='Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь'
      >
        {user?.booking?.id && <ProfileBooking items={user.booking} />}
        {!user?.booking?.id && <Cover dataId='empty-blue-card' title='Забронируйте книгу и она отобразится' />}
      </ProfileWrap>
      <ProfileWrap
        title='Книга которую взяли'
        subtitle='Здесь можете просмотреть информацию о книге и узнать сроки возврата'
      >
        {user?.delivery?.id && <ProfileDelivery items={user.delivery} />}
        {!user?.delivery?.id && <Cover dataId='empty-blue-card' title='Прочитав книгу, она отобразится в истории' />}
      </ProfileWrap>
      <ProfileWrap dataId='history' title='История' subtitle='Список прочитанных книг'>
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Pagination]}
          slidesPerView={4}
          className={classNames('', {
            [styles.profileSwiper]: user?.history?.id,
          })}
          spaceBetween={30}
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            1440: {
              slidesPerView: 4,
            },
            1000: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 3,
            },
            320: {
              slidesPerView: 1,
            },
          }}
        >
          {user?.history?.books &&
            user?.history.books.map((slideContent, index) => (
              <SwiperSlide data-test-id='history-slide' key={slideContent.id} virtualIndex={index}>
                <ProfileHistory items={slideContent} view={true} />
              </SwiperSlide>
            ))}
        </Swiper>

        {!user?.history?.id && <Cover dataId='empty-blue-card' title='Вы не читали книг из нашей библиотеки' />}
      </ProfileWrap>

      <CommentModal
        onSubmitComment={onSubmitComment}
        onEditComment={onEditComment}
        value={value}
        handleChange={handleChange}
        selectedRate={selectedRate}
        handleSelectedRateChange={handleSelectedRateChange}
        rating={true}
        serchComment={isComment}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};
