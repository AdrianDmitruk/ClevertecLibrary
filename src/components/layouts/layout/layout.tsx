/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppDispatch } from '../../../redux/store';
import { fetchUser } from '../../../redux/user/async-actions';
import { Footer } from '../../footer';
import { Header } from '../../header';

import styles from './layout.module.scss';

export const Layout: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.containerLan}>
        <Header />
      </div>
      <main className={styles.main}>
        <div className={styles.mainWrap}>
          <Outlet />
        </div>
      </main>
      <div className={styles.containerLan}>
        <Footer />
      </div>
    </div>
  );
};
