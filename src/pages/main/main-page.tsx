/* eslint-disable complexity */
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { CheckButton } from '../../components/common/buttons/check-button';
import { SelectButton } from '../../components/common/buttons/select-button';
import { CardBlock } from '../../components/common/card-block';
import { HandlerError } from '../../components/common/handler-error';
import { NotificationBooking } from '../../components/common/notification-booking';
import { SearchInput } from '../../components/common/serch-input';
import { Spiner } from '../../components/common/spiner';
import { STATUS } from '../../constans';
import { fetchBooks } from '../../redux/books/async-actions';
import { selectBooksData } from '../../redux/books/selectors';
import { setStatusBooking, setStatusReceivesBooking, setStatusRemoveBooking } from '../../redux/books/slice';
import { selectCategoryData } from '../../redux/category/selectors';
import { selectFilterData } from '../../redux/filter/selectors';
import { selectFullBookData } from '../../redux/fullBook/selectors';
import { setStatusComment } from '../../redux/fullBook/slice';
import { useAppDispatch } from '../../redux/store';

import styles from './main-page.module.scss';

export const MainPage: FC = () => {
  const [isFocus, setIsFocus] = useState('active');
  const [state, setState] = useState('');
  const [isSort, setIsSort] = useState(false);
  const location = useLocation();
  const updateData = (value: string) => {
    setState(value);
  };
  const dispatch = useAppDispatch();
  const { status, items: data } = useSelector(selectBooksData);
  const { status: statusCategory, items: categoryData } = useSelector(selectCategoryData);
  const { searchValue } = useSelector(selectFilterData);
  const {
    status: statusBooks,
    statusBooking,
    statusReceivesBooking,
    statusRemoveBooking,
  } = useSelector(selectBooksData);

  const { status: statusFullBook } = useSelector(selectFullBookData);

  useEffect(() => {
    if (statusCategory === 'seccess' || statusCategory === STATUS.ERROR) {
      dispatch(fetchBooks());
    }
  }, [dispatch, statusCategory]);

  useEffect(() => {
    dispatch(setStatusBooking(''));
    dispatch(setStatusReceivesBooking(''));
    dispatch(setStatusRemoveBooking(''));
    dispatch(setStatusComment(''));
  }, [dispatch]);

  const sortData =
    data &&
    [...data].sort((a, b) => (isSort ? +(a.rating ?? 0) - +(b.rating ?? 0) : +(b.rating ?? 0) - +(a.rating ?? 0)));

  const getCategory = categoryData?.find((item) => item.path === location.pathname.split('/')[2]);

  const filterBook = sortData?.filter((item) => item.categories?.find((elem) => elem === getCategory?.name));

  const searchBook = filterBook?.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));

  const searchBookAll = sortData?.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));

  const isStatus = statusBooks === STATUS.ERROR || statusCategory === STATUS.ERROR || statusFullBook === STATUS.ERROR;

  const isStatusBookin =
    statusBooking !== STATUS.ERROR && statusReceivesBooking !== STATUS.ERROR && statusRemoveBooking !== STATUS.ERROR;

  if (status === STATUS.LOADING || statusCategory === STATUS.LOADING) {
    return <Spiner />;
  }

  return (
    <section className={styles.main}>
      <NotificationBooking />
      {isStatus && isStatusBookin && <HandlerError err={true} />}
      <div className={styles.mainHeader}>
        <div className={styles.mainFirstBlock}>
          <SearchInput placeholder='Поиск книги или автора…' updateData={updateData} />
          <div className={classNames({ [styles.mainSecondBlockHide]: state === 'clear' })}>
            <SelectButton onClick={() => setIsSort(!isSort)} isSort={isSort} />
          </div>
        </div>
        <div
          className={classNames(styles.mainSecondBlock, {
            [styles.mainSecondBlockHide]: state === 'clear',
          })}
        >
          <CheckButton onClick={() => setIsFocus('active')} icon='block' active={isFocus === 'active' ? true : false} />

          <CheckButton
            onClick={() => setIsFocus('notActive')}
            icon='list'
            active={isFocus === 'notActive' ? true : false}
          />
        </div>
      </div>

      <div
        data-test-id='content'
        // className={classNames(isFocus === 'active' ? styles.mainContent : styles.mainContentList)}
        className={classNames(styles.mainContent, {
          [styles.mainContentList]: isFocus !== 'active',
          [styles.mainContentSearch]: isFocus === 'active' && searchValue.length,
        })}
      >
        {!searchValue && !filterBook?.length && location.pathname !== '/books/all' ? (
          <div data-test-id='empty-category' className={styles.mainNotContent}>
            В этой категории книг ещё нет
          </div>
        ) : null}

        {(searchValue && !searchBook?.length && location.pathname !== '/books/all') ||
        (!searchBookAll?.length && location.pathname === '/books/all') ? (
          <div data-test-id='search-result-not-found' className={styles.mainNotContent}>
            По запросу ничего не найдено
          </div>
        ) : null}

        {(getCategory ? (!searchValue ? filterBook : searchBook) : !searchValue ? sortData : searchBookAll)?.map(
          (items) => (
            <CardBlock filter={searchValue} items={items} key={items.id} view={isFocus === 'active' ? true : false} />
          )
        )}
      </div>
    </section>
  );
};
