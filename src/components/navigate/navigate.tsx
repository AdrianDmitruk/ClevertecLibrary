import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { Arrow } from '../../assets/icon/arrow';
import { STATUS } from '../../constans';
import { selectBooksData } from '../../redux/books/selectors';
import { fetchCategory } from '../../redux/category/async-actions';
import { selectCategoryData } from '../../redux/category/selectors';
import { useAppDispatch } from '../../redux/store';
import { logoutUser } from '../../utils/logout-user';
import useIsBurger from '../../utils/use-is-burger';

import styles from './navigate.module.scss';

type NavigateProps = {
  isMobile?: boolean;
  handleMenuClose?: () => void;
};

export const Navigate: FC<NavigateProps> = ({ isMobile, handleMenuClose }) => {
  const location = useLocation();
  const activeLocation = ['/rules', '/contract'].includes(location.pathname);
  const [secondNav, setSecondNav] = useState(activeLocation);
  const { isBurger } = useIsBurger(770);

  const { items: dataBooks, status: statusBooksAll } = useSelector(selectBooksData);
  const { items, status } = useSelector(selectCategoryData);

  const errorStatus = status === STATUS.ERROR || statusBooksAll === STATUS.ERROR;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (items?.length) {
      return;
    }
    dispatch(fetchCategory());
  }, [dispatch, items?.length]);

  useEffect(() => {
    if (isBurger) {
      setSecondNav(false);
    }
  }, [isBurger]);

  const handleClick = () => {
    if (handleMenuClose) {
      handleMenuClose();
    }
    setSecondNav(true);
  };

  return (
    <nav
      className={classNames(styles.nav, {
        [styles.navMobile]: isMobile,
      })}
      data-test-id='burger-navigation'
    >
      <ul className={classNames(isMobile ? styles.navUlMob : styles.navUl)}>
        <li className={styles.navLi}>
          <button
            type='button'
            className={styles.navArrowWrap}
            onClick={() => {
              setSecondNav(!secondNav);
            }}
          >
            <div
              data-test-id={isMobile ? 'burger-showcase' : 'navigation-showcase'}
              className={activeLocation && secondNav ? styles.navLink : styles.navLinkActive}
            >
              Витрина книг
            </div>

            <Arrow
              className={classNames({
                [styles.navIconNotActiv]: !activeLocation,
                [styles.navIconUp]: secondNav,
                [styles.navIconActive]: !secondNav,
              })}
            />
          </button>
        </li>

        <div className={classNames(!secondNav && !errorStatus ? styles.navSecond : styles.navSecondHide)}>
          <ul className={styles.navUlSecond}>
            <li className={styles.navLiSecond}>
              <NavLink
                to='/books/all'
                data-test-id={isBurger ? 'burger-books' : 'navigation-books'}
                className={({ isActive }) => (isActive ? styles.navLinkActiveSec : styles.navLinkNonActiveSec)}
                onClick={handleMenuClose}
              >
                Все книги
              </NavLink>
            </li>
            {items?.map((item) => (
              <li className={styles.navLiSecond} key={item.id}>
                <NavLink
                  to={`/books/${item.path}`}
                  className={({ isActive }) => (isActive ? styles.navLinkActiveSec : '')}
                  data-test-id={isMobile ? `burger-${item.path}` : `navigation-${item.path}`}
                  onClick={handleMenuClose}
                >
                  {item.name}
                </NavLink>
                <span
                  data-test-id={
                    isMobile ? `burger-book-count-for-${item.path}` : `navigation-book-count-for-${item.path}`
                  }
                  className={styles.navLiSecondCount}
                >
                  {dataBooks?.filter((elem) => elem.categories?.find((count) => count === item.name)).length}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <li className={styles.navLi}>
          <NavLink
            data-test-id={isMobile ? 'burger-terms' : 'navigation-terms'}
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            to='/rules'
            onClick={handleClick}
          >
            Правила пользования
          </NavLink>
        </li>
        <li className={styles.navLi}>
          <NavLink
            data-test-id={isMobile ? 'burger-contract' : 'navigation-contract'}
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            to='/contract'
            onClick={handleClick}
          >
            Договор оферты
          </NavLink>
        </li>
      </ul>
      {isMobile && (
        <div className={styles.navFooter}>
          <Link
            onClick={() => {
              setSecondNav(true);
              handleClick();
            }}
            to='/profile'
          >
            Профиль
          </Link>
          <Link
            data-test-id='exit-button'
            onClick={() => {
              dispatch(logoutUser());
              setSecondNav(true);
            }}
            to='/'
          >
            Выход
          </Link>
        </div>
      )}
    </nav>
  );
};
