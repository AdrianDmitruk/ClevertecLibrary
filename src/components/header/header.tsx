import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { HOST_ENDPOINT } from '../../api/endpoint';
import Avatar from '../../assets/content/avatar.png';
import Burger from '../../assets/icon/burger.svg';
import { Close } from '../../assets/icon/close';
import Logo from '../../assets/logo.png';
import { useAppDispatch } from '../../redux/store';
import { selectUserData } from '../../redux/user/selectors';
import { logoutUser } from '../../utils/logout-user';
import useIsBurger from '../../utils/use-is-burger';
import { useClickOutside } from '../../utils/use-latest';
import { Navigate } from '../navigate';

import styles from './header.module.scss';

export const Header: FC = () => {
  const [sidebar, setSidebar] = useState(false);
  const { isBurger } = useIsBurger(769);

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { data: user } = useSelector(selectUserData);

  const handleUserClick = () => {
    setIsOpen(!isOpen);
  };

  const navRef = useClickOutside(() => {
    setSidebar(false);
  });

  const profileRef = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <header className={styles.header}>
      <div className={styles.headerWrap} ref={navRef}>
        <button
          className={styles.headerBurger}
          data-test-id='button-burger'
          type='button'
          onClick={() => {
            setSidebar(!sidebar);
          }}
        >
          <img
            src={Burger}
            alt='burger'
            className={classNames({
              [styles.notVisible]: sidebar,
            })}
          />
          <Close
            className={classNames(styles.headerBurgerClose, {
              [styles.visible]: sidebar,
            })}
          />
        </button>

        {(sidebar || isBurger) && (
          <div className={styles.headerMobileNav}>
            <Navigate handleMenuClose={() => setSidebar(!sidebar)} isMobile={sidebar} />
          </div>
        )}

        <Link to='/books/all' className={styles.headerLogo}>
          <img src={Logo} alt='logo' />
        </Link>
        <Link to='/books/all' className={styles.headerTitle}>
          <h3>Библиотека</h3>
        </Link>
      </div>
      <div className={styles.headerUser} ref={profileRef}>
        <button type='button' onClick={handleUserClick} className={styles.headerUserName}>
          Привет, {user?.firstName}!
        </button>
        <button type='button' onClick={handleUserClick} className={styles.headerUserAvatarWrap}>
          <img
            className={styles.headerUserAvatar}
            src={user?.avatar ? `${HOST_ENDPOINT}${user.avatar}` : Avatar}
            alt='Avatar'
          />
        </button>

        {!isBurger && (
          <div
            className={classNames(styles.headerPopup, {
              [styles.headerPopupNon]: !isOpen,
            })}
          >
            <Link
              data-test-id='profile-button'
              to='/profile'
              onClick={() => setIsOpen(false)}
              className={styles.headerListBtn}
            >
              Профиль
            </Link>
            <button
              data-test-id='exit-button'
              onClick={() => dispatch(logoutUser())}
              className={styles.headerListBtn}
              type='button'
            >
              Выход
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
