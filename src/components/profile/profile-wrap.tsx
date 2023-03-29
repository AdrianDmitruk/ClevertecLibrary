import { FC, ReactNode } from 'react';

import styles from './profile-wrap.module.scss';

type ProfileWrpaProps = {
  title: string;
  subtitle: string;
  dataId?: string;
  children: ReactNode;
};

export const ProfileWrap: FC<ProfileWrpaProps> = ({ dataId, title, subtitle, children }) => (
  <div data-test-id={dataId} className={styles.wrap}>
    <h3 className={styles.wrapTitle}>{title}</h3>
    <p className={styles.wrapSubtitle}>{subtitle}</p>
    <div className={styles.wrapContent}>{children}</div>
  </div>
);
