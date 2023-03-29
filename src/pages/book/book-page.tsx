import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Arrow } from '../../assets/icon/arrow';
import { CommentBook } from '../../components/blocks/full-book/comment-book';
import { InfoBook } from '../../components/blocks/full-book/info-book';
import { ProfileBook } from '../../components/blocks/full-book/profile-book';
import { CommentModal } from '../../components/blocks/modal/comment-modal';
import { PrimaryButton } from '../../components/common/buttons/primary-button';
import { HandlerError } from '../../components/common/handler-error';
import { NotificationBooking } from '../../components/common/notification-booking';
import { Rating } from '../../components/common/rating';
import { Spiner } from '../../components/common/spiner';
import { NavigationMap } from '../../components/navigation-map';
import { STATUS } from '../../constans';
import { selectBooksData } from '../../redux/books/selectors';
import { setStatusBooking, setStatusReceivesBooking, setStatusRemoveBooking } from '../../redux/books/slice';
import { fetchCategory } from '../../redux/category/async-actions';
import { selectCategoryData } from '../../redux/category/selectors';
import { fetchAddCommentBook, fetchEditCommentBook, fetchFullBook } from '../../redux/fullBook/async-actions';
import { selectFullBookData } from '../../redux/fullBook/selectors';
import { setStatusComment, setStatusEditComment } from '../../redux/fullBook/slice';
import { useAppDispatch } from '../../redux/store';
import { fetchUser } from '../../redux/user/async-actions';
import { selectUserData } from '../../redux/user/selectors';

import styles from './book-page.module.scss';

export type IBookPageData = {
  rating: number;
  text: string;
  book: string;
  user: string;
};

export const BookPage: FC = () => {
  const [isFocus, setIsFocus] = useState(false);
  const { id: idPage } = useParams();
  const { status, items } = useSelector(selectFullBookData);
  const { status: statusCategory } = useSelector(selectCategoryData);
  const {
    status: statusBooks,
    statusBooking,
    statusReceivesBooking,
    statusRemoveBooking,
  } = useSelector(selectBooksData);

  const { status: statusFullBook } = useSelector(selectFullBookData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRate, setSelectedRate] = useState<number | undefined>(undefined);
  const [value, setValue] = useState<string>('');
  const { data: user } = useSelector(selectUserData);
  const serchComment = items?.comments?.find((elem) => elem.user.commentUserId === user?.id);

  const handleSelectedRateChange = (rate: number | undefined) => {
    setSelectedRate(rate);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (serchComment) {
      setValue(serchComment.text);
      setSelectedRate(serchComment.rating ?? 5);
    } else {
      setSelectedRate(5);
    }
  }, [serchComment, isModalOpen]);

  useEffect(() => {
    if (idPage) {
      dispatch(fetchFullBook(idPage));
    }

    dispatch(fetchCategory());
    dispatch(fetchUser());
  }, [dispatch, idPage]);

  useEffect(() => {
    dispatch(setStatusBooking(''));
    dispatch(setStatusReceivesBooking(''));
    dispatch(setStatusRemoveBooking(''));
    dispatch(setStatusComment(''));
    dispatch(setStatusEditComment(''));
  }, [dispatch]);

  const onSubmitComment = () => {
    if (selectedRate && idPage && user?.id) {
      const data = {
        rating: selectedRate,
        text: value,
        book: idPage,
        user: user.id.toString(),
      };

      dispatch(fetchAddCommentBook(data)).then((result) => {
        if (fetchAddCommentBook.fulfilled.match(result)) {
          dispatch(fetchFullBook(idPage));
          setIsModalOpen(false);
          setValue('');
        } else {
          dispatch(fetchFullBook(idPage));
          setIsModalOpen(false);
          setValue('');
        }
      });
    }
  };

  const onEditComment = () => {
    if (selectedRate && idPage && user?.id && serchComment?.user) {
      const data = {
        rating: selectedRate,
        text: value,
        book: idPage,
        user: user.id.toString(),
      };

      dispatch(fetchEditCommentBook({ data, id: serchComment.id.toString() })).then((result) => {
        if (fetchAddCommentBook.fulfilled.match(result)) {
          dispatch(fetchFullBook(idPage));
          setIsModalOpen(false);
          setValue('');
        } else {
          dispatch(fetchFullBook(idPage));
          setIsModalOpen(false);
          setValue('');
        }
      });
    }
  };

  const isStatus = statusBooks === STATUS.ERROR || statusCategory === STATUS.ERROR || statusFullBook === STATUS.ERROR;

  const isStatusBookin =
    statusBooking !== STATUS.ERROR && statusReceivesBooking !== STATUS.ERROR && statusRemoveBooking !== STATUS.ERROR;

  if (status === STATUS.LOADING) {
    return <Spiner />;
  }

  return (
    <section className={styles.book}>
      <NotificationBooking />
      {isStatus && isStatusBookin && <HandlerError err={true} />}
      <NavigationMap title={items?.title} />
      {status === STATUS.ERROR ? null : <ProfileBook onDataBook={items} />}
      {status === STATUS.ERROR ? null : (
        <div className={styles.bookContainer}>
          <div className={styles.bookRating}>
            <h3 className={styles.bookRatingTitle}>Рейтинг</h3>
            <div className={styles.bookRatingBorder} />
            <Rating
              className={styles.bookStar}
              isNotRating={!items?.rating}
              count={items?.rating ?? 0}
              number={!!items?.rating}
              gap={true}
            />
          </div>
          <InfoBook onDataInfo={items} />
          <div className={styles.comment}>
            <div className={styles.commentWrap}>
              <h3 className={styles.commentTitle}>Отзывы</h3>
              {items?.comments ? (
                <span className={styles.commentCount}>{items?.comments?.length}</span>
              ) : (
                <span className={styles.commentCount}>0</span>
              )}
              {items?.comments && (
                <button
                  data-test-id='button-hide-reviews'
                  type='button'
                  className={styles.commentArrow}
                  onClick={() => setIsFocus(!isFocus)}
                >
                  <Arrow className={classNames(isFocus ? styles.commentArrowIcon : styles.commentArrowIconActive)} />
                </button>
              )}
            </div>
            <div data-test-id='reviews'>
              {items?.comments && (
                <div className={classNames(isFocus ? styles.commentBorderActive : styles.commentBorder)} />
              )}
              {items?.comments && <CommentBook onDataComments={items?.comments} isFocus={isFocus} />}
              {serchComment ? (
                <PrimaryButton
                  handleBtnModal={() => setIsModalOpen(true)}
                  showDefault={true}
                  dataId='button-rate-book'
                  className={styles.commentBtn}
                  fill='secondary'
                >
                  Изменить оценку
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  handleBtnModal={() => setIsModalOpen(true)}
                  showDefault={true}
                  dataId='button-rate-book'
                  className={styles.commentBtn}
                  fill='primary'
                >
                  оценить книгу
                </PrimaryButton>
              )}
            </div>
          </div>
        </div>
      )}

      <CommentModal
        onSubmitComment={onSubmitComment}
        onEditComment={onEditComment}
        value={value}
        handleChange={handleChange}
        selectedRate={selectedRate}
        handleSelectedRateChange={handleSelectedRateChange}
        rating={!!items?.rating}
        serchComment={!!serchComment}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};
