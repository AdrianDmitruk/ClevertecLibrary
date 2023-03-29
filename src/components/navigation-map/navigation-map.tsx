import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { Chevron } from '../../assets/icon/chevron';
import { selectCategoryData } from '../../redux/category/selectors';

import styles from './navigation-map.module.scss';

type NavigationMapProps = {
  title?: string | '';
};

export const NavigationMap: FC<NavigationMapProps> = ({ title }) => {
  const { items: categoryData } = useSelector(selectCategoryData);
  const location = useLocation();

  const getCategoryBook = categoryData?.find((item) => item.path === location.pathname.split('/')[2]);
  const isCheckingCategory = () => (getCategoryBook ? getCategoryBook?.path : 'all');

  return (
    <div className={styles.navigation}>
      <div className={styles.navigationWrap}>
        <div className={styles.navigationContainer}>
          <Link
            to={`/books/${isCheckingCategory()}`}
            data-test-id='breadcrumbs-link'
            className={styles.navigationCategory}
          >
            {getCategoryBook ? getCategoryBook.name : 'Все книги'}
          </Link>
          <Chevron width='16' height='16' className={styles.navigationChevron} />
          <span data-test-id='book-name' className={styles.navigationTitle}>
            {title}
          </span>
        </div>
      </div>
    </div>
  );
};
