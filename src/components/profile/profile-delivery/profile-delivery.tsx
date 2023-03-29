/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable complexity */
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { HOST_ENDPOINT } from '../../../api/endpoint';
import bookNot from '../../../assets/content/book-not.png';
import { selectCategoryData } from '../../../redux/category/selectors';
import { DeliveryUser } from '../../../redux/user/types';
import { formatDate } from '../../../utils/date/format-date';
import { Cover } from '../../common/cover';
import { Rating } from '../../common/rating';

import styles from './profile-delivery.module.scss';

type ProfileDeliveryProps = {
  items: DeliveryUser;
};

export const ProfileDelivery: FC<ProfileDeliveryProps> = ({ items }) => {
  const { items: categoryData } = useSelector(selectCategoryData);
  const location = useLocation();

  const getCategoryBook = categoryData?.find((item) => item.path === location.pathname.split('/')[2]);
  const isCheckingCategory = () => (getCategoryBook ? getCategoryBook?.path : 'all');

  const currentDate = new Date();

  const bookedDate = new Date(items.dateHandedTo);

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

          <div className={styles.cardDate}>{`возврат ${formatDate(new Date(items.dateHandedTo), 'DD.MM')}`}</div>
        </div>
      </div>
    </Link>
  );

  if (isOverdue) {
    return (
      <Cover expires={true} dataId='expired' title='Вышел срок пользования книги' subtitle='Верните книгу, пожалуйста'>
        {content}
      </Cover>
    );
  }

  return <div>{content}</div>;
};
