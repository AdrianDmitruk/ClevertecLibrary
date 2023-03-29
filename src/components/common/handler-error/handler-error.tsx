import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import Check from '../../../assets/CheckCircle.png';
import Clos from '../../../assets/Clos.png';
import Warning from '../../../assets/WarningCircle.png';

import styles from './handler-error.module.scss';

type HandlerErrorProps = {
  err?: boolean;
  seccess?: boolean;
  title?: string;
};

export const HandlerError: FC<HandlerErrorProps> = ({
  err,
  seccess,
  title = 'Что-то пошло не так. Обновите страницу через некоторое время.',
}) => {
  const [showError, setShowError] = useState(err);

  const onClose = () => {
    setShowError(false);
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (showError) {
      timeoutId = setTimeout(() => {
        setShowError(false);
      }, 4000);
    }

    return () => clearTimeout(timeoutId);
  }, [showError]);

  return (
    <div>
      {showError && (
        <div
          className={classNames(styles.handler, {
            [styles.seccess]: seccess,
          })}
          data-test-id='error'
        >
          <img className={styles.handlerImg} src={seccess ? Check : Warning} alt='Warning' />
          <span className={styles.handlerTitle}>{title}</span>
          <button data-test-id='alert-close' type='button' className={styles.handlerClose} onClick={onClose}>
            <img src={Clos} alt='Clos' />
          </button>
        </div>
      )}
    </div>
  );
};
