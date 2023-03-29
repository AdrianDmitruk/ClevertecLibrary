import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { STATUS } from '../../../../constans';
import { fetchLogin, fetchRegistration, fetchResetPassword } from '../../../../redux/auth/async-actions';
import { selectRegistrationData } from '../../../../redux/auth/selectors';
import { useAppDispatch } from '../../../../redux/store';

import styles from './primary-button.module.scss';

type PrimaryByttonProps = {
  children: ReactNode;
  fill: 'primary' | 'secondary' | null;
  type?: 'button' | 'submit';
  size?: 'xs' | 's' | 'm' | 'l';
  disabled?: boolean;
  className?: string;
  refatch?: boolean;
  errorAuth?: boolean;
  errorResetPas?: boolean;
  dataId?: string;
  showDefault?: boolean;
  handleBtnChange?: (value: string) => void;
  handleBtnModal?: (value: boolean) => void;
};

export const PrimaryButton: FC<PrimaryByttonProps> = (props) => {
  const {
    children,
    type,
    fill,
    size,
    disabled,
    showDefault,
    errorAuth,
    className,
    handleBtnChange,
    errorResetPas,
    dataId,
    handleBtnModal,
    refatch,
  } = props;

  const { dataRegister, dataAuth, dataReset } = useSelector(selectRegistrationData);

  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (handleBtnModal) {
      handleBtnModal(true);
    }
  };

  const refetchBtn = () => {
    if (handleBtnChange && !refatch) {
      handleBtnChange('ref');
    }

    if (handleBtnChange && refatch) {
      dispatch(fetchRegistration(dataRegister)).then((result) => {
        if (fetchRegistration.fulfilled.match(result)) {
          handleBtnChange(STATUS.OK);
        }
      });
    }

    if (errorAuth) {
      dispatch(fetchLogin(dataAuth));
    }

    if (errorResetPas && handleBtnChange) {
      dispatch(fetchResetPassword(dataReset)).then((result) => {
        if (fetchResetPassword.fulfilled.match(result)) {
          handleBtnChange(STATUS.OK);
        } else {
          handleBtnChange(STATUS.ERROR);
        }
      });
    }
  };

  return (
    <button
      data-test-id={dataId}
      onClick={showDefault ? handleClick : refetchBtn}
      className={classNames(styles.button, className, {
        [styles.buttonFill]: fill === 'primary',
        [styles.buttonTransparent]: fill === 'secondary',
        [styles.buttonXs]: size === 'xs',
        [styles.buttonS]: size === 's',
        [styles.buttonM]: size === 'm',
        [styles.buttonL]: size === 'l',
      })}
      type={type ? 'submit' : 'button'}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
