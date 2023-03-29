/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable complexity */
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { HOST_ENDPOINT } from '../../../api/endpoint';
import bookNot from '../../../assets/content/book-not.png';
import { fetchRemoveBooking } from '../../../redux/books/async-actions';
import { selectCategoryData } from '../../../redux/category/selectors';
import { useAppDispatch } from '../../../redux/store';
import { fetchUser } from '../../../redux/user/async-actions';
import { BookingUser } from '../../../redux/user/types';
import { PrimaryButton } from '../../common/buttons/primary-button';
import { Cover } from '../../common/cover';
import { Rating } from '../../common/rating';
import { Spiner } from '../../common/spiner';

import styles from './profile-booking.module.scss';

type ProfileBookingProps = {
  items: BookingUser;
};

export const ProfileBooking: FC<ProfileBookingProps> = ({ items }) => {
  const { items: categoryData } = useSelector(selectCategoryData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const getCategoryBook = categoryData?.find((item) => item.path === location.pathname.split('/')[2]);
  const isCheckingCategory = () => (getCategoryBook ? getCategoryBook?.path : 'all');

  const dispatch = useAppDispatch();

  const handleSubmitRemove = () => {
    setIsLoading(true);
    dispatch(fetchRemoveBooking(items.id.toString())).then((result) => {
      if (fetchRemoveBooking.fulfilled.match(result)) {
        dispatch(fetchUser());
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  };

  const currentDate = new Date();

  const bookedDate = new Date(items.dateOrder);

  const isOverdue = bookedDate < currentDate;

  const content = (
    <Link
      data-test-id='card'
      to={`/books/${isCheckingCategory()}/${items?.book.id.toString()}`}
      className={styles.card}
    >
      <img
        className={styles.cardImgList}
        src={items.book.image ? `${HOST_ENDPOINT}${items.book.image}` : bookNot}
        alt='book'
      />

      <div className={styles.cardMainWrapList}>
        <div className={styles.cardMainList}>
          <div className={styles.cardTitleWrapList}>
            <p className={styles.cardTitleList}>{items.book.title}</p>
          </div>
          <div className={styles.cardAuthWrapList}>
            <p className={styles.cardAuthorList}>
              {items.book.authors}, {items.book.issueYear}
            </p>
          </div>
        </div>
        <div className={styles.cardWrapButtonList}>
          <div>
            {items?.book.rating ? (
              <div className={styles.cardScoreList}>
                <Rating className={styles.cardScoreListIcon} count={items.book.rating} />
              </div>
            ) : (
              <div className={styles.cardScoreList}>ещё нет оценок</div>
            )}
          </div>

          <PrimaryButton
            showDefault={true}
            handleBtnModal={() => handleSubmitRemove()}
            size='xs'
            className={styles.cardButtonList}
            fill='primary'
            dataId='cancel-booking-button'
          >
            Отменить бронь
          </PrimaryButton>
        </div>
      </div>
    </Link>
  );

  if (isOverdue) {
    return (
      <Cover
        expires={true}
        dataId='expired'
        title='Дата бронирования книги истекла'
        subtitle='Через 24 часа книга будет  доступна всем'
      >
        {content}
      </Cover>
    );
  }

  if (isLoading) {
    return <Spiner />;
  }

  return <div>{content}</div>;
};
