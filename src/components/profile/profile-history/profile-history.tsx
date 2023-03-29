/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable complexity */

import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { HOST_ENDPOINT } from '../../../api/endpoint';
import bookNot from '../../../assets/content/book-not.png';
import { selectCategoryData } from '../../../redux/category/selectors';
import { fetchFullBook } from '../../../redux/fullBook/async-actions';
import { useAppDispatch } from '../../../redux/store';
import { selectUserData } from '../../../redux/user/selectors';
import {
  setBookId,
  setCommentModal,
  setCommentRating,
  setCommentText,
  setIsSearchComment,
} from '../../../redux/user/slice';
import { HistoryBookUser } from '../../../redux/user/types';
import { PrimaryButton } from '../../common/buttons/primary-button';
import { Rating } from '../../common/rating';

import styles from './profile-history.module.scss';

type ProfileHistoryProps = {
  items: HistoryBookUser;
  view?: boolean;
};

export const ProfileHistory: FC<ProfileHistoryProps> = ({ view, items }) => {
  const { items: categoryData } = useSelector(selectCategoryData);
  const { data: user } = useSelector(selectUserData);

  const location = useLocation();
  const dispatch = useAppDispatch();
  const getCategoryBook = categoryData?.find((item) => item.path === location.pathname.split('/')[2]);
  const isCheckingCategory = () => (getCategoryBook ? getCategoryBook?.path : 'all');

  const serchComment = user?.comments && user?.comments.find((elem) => elem.bookId === items.id);

  useEffect(() => {
    if (serchComment && serchComment.text && serchComment.rating) {
      dispatch(setIsSearchComment(true));
      dispatch(setCommentText(serchComment.text));
      dispatch(setCommentRating(serchComment.rating));
    }
    dispatch(setIsSearchComment(false));
  }, [dispatch, serchComment]);

  return (
    <div>
      <Link data-test-id='card' to={`/books/${isCheckingCategory()}/${items?.id.toString()}`} className={styles.card}>
        <img className={styles.cardImg} src={items.id ? `${HOST_ENDPOINT}${items.image}` : bookNot} alt='book' />

        <div>
          {items?.rating ? (
            <div className={styles.cardScore}>
              <Rating count={items.rating} />
            </div>
          ) : (
            <div className={styles.cardScore}>ещё нет оценок</div>
          )}
        </div>

        <div className={styles.cardTitleWrap}>
          <p className={styles.cardTitle}>{items.title}</p>
        </div>
        <div className={styles.cardAuthWrap}>
          <p className={styles.cardAuthor}>
            {items.authors}, {items.issueYear}
          </p>
        </div>

        <div className={styles.cardWrapButton}>
          {serchComment ? (
            <PrimaryButton
              showDefault={true}
              handleBtnModal={() => {
                dispatch(fetchFullBook(items.id.toString()));
                dispatch(setCommentModal(true));
                dispatch(setIsSearchComment(true));
                dispatch(setBookId(serchComment.id));
              }}
              size='xs'
              className={classNames(view ? styles.cardButton : styles.cardButtonList)}
              fill='secondary'
              dataId='history-review-button'
            >
              изменить оценку
            </PrimaryButton>
          ) : (
            <PrimaryButton
              showDefault={true}
              handleBtnModal={() => {
                dispatch(setCommentModal(true));
                dispatch(setIsSearchComment(false));
                dispatch(setBookId(items.id));
                dispatch(fetchFullBook(items.id.toString()));
              }}
              size='xs'
              className={classNames(view ? styles.cardButton : styles.cardButtonList)}
              fill='primary'
              dataId='history-review-button'
            >
              Оставить отзыв
            </PrimaryButton>
          )}
        </div>
      </Link>
    </div>
  );
};
