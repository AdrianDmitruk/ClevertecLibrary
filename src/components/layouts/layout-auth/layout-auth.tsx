import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './layout-auth.module.scss';

export const LayoutAuth: FC = () => (
  <div className={styles.container} data-test-id='auth'>
    <div className={styles.containerTitle}>Cleverland</div>
    <main className={styles.main}>
      <Outlet />
    </main>
  </div>
);
