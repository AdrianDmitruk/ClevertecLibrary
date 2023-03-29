import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { STATUS } from '../../../constans';
import { selectFullBookData } from '../../../redux/fullBook/selectors';
import useIsBurger from '../../../utils/use-is-burger';
import { HandlerError } from '../../common/handler-error';
import { Navigate } from '../../navigate';

import styles from './layout-main-page.module.scss';

export const LayoutMainPage: FC = () => {
  const { status: statusFullBook } = useSelector(selectFullBookData);
  const { isBurger } = useIsBurger(769);

  const isStatus = statusFullBook === STATUS.ERROR;

  return (
    <div data-test-id='main-page' className={styles.container}>
      {isStatus && <HandlerError err={true} />}
      <main className={styles.main}>
        <div className={styles.mainWrap}>
          {!isBurger && <Navigate />}
          <Outlet />
        </div>
      </main>
    </div>
  );
};
