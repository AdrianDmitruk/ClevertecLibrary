import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import ArrowLeft from '../../../../assets/icon/arrow-left.svg';

import styles from './auth-modal.module.scss';

type AuthModalProps = {
  showHeader?: boolean;
  children: ReactNode;
};

export const AuthModal: FC<AuthModalProps> = ({ showHeader, children }) => (
  <div>
    {showHeader && (
      <div className={styles.modalHeader}>
        <Link to='/auth' className={styles.modalHeaderLink}>
          <img src={ArrowLeft} alt='ArrowLeft' />
          <p className={styles.modalHeaderText}>вход в личный кабинет</p>
        </Link>
      </div>
    )}
    <div
      className={classNames(styles.modal, {
        [styles.modalHeaderContent]: showHeader,
      })}
    >
      {children}
    </div>
  </div>
);
