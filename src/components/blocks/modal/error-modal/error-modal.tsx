import { FC } from 'react';
import { Link } from 'react-router-dom';

import { PrimaryButton } from '../../../common/buttons/primary-button';

import styles from './error-modal.module.scss';

type ErrorModalProps = {
  title?: string;
  description?: string;
  link?: string;
  titleBtn?: string;
  refatch?: boolean;
  errorAuth?: boolean;
  showBtn?: boolean;
  errorResetPas?: boolean;
  notLink?: boolean;
  onErrorModalChange?: (value: string) => void;
};

export const ErrorModal: FC<ErrorModalProps> = ({
  title,
  description,
  link,
  titleBtn,
  errorAuth,
  showBtn,
  notLink,
  onErrorModalChange,
  errorResetPas,
  refatch,
}) => {
  const handleBtnChange = (value: string) => {
    if (onErrorModalChange) {
      onErrorModalChange(value);
    }
  };

  const showLinks = () => {
    if (notLink) {
      return (
        <PrimaryButton
          errorAuth={errorAuth}
          refatch={refatch}
          errorResetPas={errorResetPas}
          handleBtnChange={handleBtnChange}
          className={styles.modalBtn}
          fill='primary'
        >
          {titleBtn}
        </PrimaryButton>
      );
    }

    return (
      <Link to={`/${link}`} className={styles.modalBtnWrap}>
        <PrimaryButton
          errorAuth={errorAuth}
          refatch={refatch}
          errorResetPas={errorResetPas}
          handleBtnChange={handleBtnChange}
          className={styles.modalBtn}
          fill='primary'
        >
          {titleBtn}
        </PrimaryButton>
      </Link>
    );
  };

  return (
    <div className={styles.modal} data-test-id='status-block'>
      <h3 className={styles.modalTitle}>{title}</h3>
      <p className={styles.modalSubTitle}>{description}</p>
      {!showBtn && showLinks()}
    </div>
  );
};
