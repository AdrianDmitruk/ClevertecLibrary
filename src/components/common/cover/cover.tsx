import { FC, ReactNode } from 'react';
import classNames from 'classnames';

import styles from './cover.module.scss';

type CoverProps = {
  title: string;
  secondTitle?: string;
  dataId?: string;
  subtitle?: string;
  expires?: boolean;
  children?: ReactNode;
};

export const Cover: FC<CoverProps> = (props) => {
  const { dataId, title, secondTitle, subtitle, expires, children } = props;

  return (
    <div
      data-test-id={dataId}
      className={classNames(styles.cover, {
        [styles.coverExpires]: expires,
      })}
    >
      {expires && <div>{children}</div>}
      <div
        className={classNames(styles.coverFirstLayer, {
          [styles.coverFirstLayerExpires]: expires,
        })}
      />
      <div className={classNames(expires ? styles.coverImg : '')} />
      <div className={styles.coverSecondLayer} />
      <div className={styles.coverWrap}>
        <h3 className={styles.coverTitle}>{title}</h3>
        <h3 className={styles.coverTitle}>{secondTitle}</h3>
        <p className={styles.coverSubtitle}>{subtitle}</p>
      </div>
    </div>
  );
};
