import { FC } from 'react';

import styles from './spiner.module.scss';

export const Spiner: FC = () => (
  <div className={styles.spiner} data-test-id='loader'>
    <div className={styles.spinerBox} />
  </div>
);
