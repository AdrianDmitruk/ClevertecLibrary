import React, { useState } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Check from '../../../assets/icon/check.svg';
import CloseEye from '../../../assets/icon/eye-closed.svg';
import OpenEye from '../../../assets/icon/eye-open.svg';
import {
  ERROR_EMPTY_FIELD,
  ERROR_LOGIN_FORMAT,
  ERROR_PASSWORD_FORMAT,
  ERROR_PASSWORD_MISMATCH,
  ERROR_REQUIRED_FIELD,
  ERRORS_VALID,
} from '../../../constans';
import { PrimaryInput } from '../input';

import styles from './form-field.module.scss';

export type FormFieldType = 'text' | 'password';

export type FormFieldProps<T extends FieldValues> = {
  className?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  placeholder?: string;
  validationHint?: string;
  type: FormFieldType;
  isFocused?: boolean;
  showError?: boolean;
  isRequired?: boolean;
  value?: string;
  isAuth?: boolean;
  errorPasword?: boolean;
  errorEmail?: boolean;
  showCheck?: boolean;
  showReq?: boolean;
  showEmptyField?: boolean;
  disabled?: boolean;
  isBlur?: boolean;
  profileValid?: boolean;
  defaultValue?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

// eslint-disable-next-line complexity
export const FormField = <T extends FieldValues>({
  className,
  error,
  name,
  type,
  register,
  isFocused,
  isAuth,
  disabled,
  defaultValue,
  showEmptyField,
  isBlur,
  profileValid,
  errorPasword,
  errorEmail,
  showReq,
  showCheck,
  placeholder,
  showError,
  validationHint,
  onBlur,
  onFocus,
}: FormFieldProps<T>): JSX.Element => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const isHintRedFirst = (errors: string): boolean =>
    errors.includes('заглавной буквой цифрой не менее 8 символов') ||
    errors.includes(' цифрой не менее 8 символов') ||
    errors.includes('заглавной буквой  не менее 8 символов') ||
    errors.includes('  не менее 8 символов');

  const isHintRedSecond = (errors: string): boolean =>
    errors.includes('заглавной буквой цифрой не менее 8 символов') ||
    errors.includes('заглавной буквой цифрой ') ||
    errors.includes('заглавной буквой  не менее 8 символов') ||
    errors.includes('заглавной буквой  ');

  const isHintRedThree = (errors: string): boolean =>
    errors.includes('заглавной буквой цифрой не менее 8 символов') ||
    errors.includes('заглавной буквой цифрой ') ||
    errors.includes(' цифрой ') ||
    errors.includes(' цифрой не менее 8 символов');

  return (
    <div className={classNames(styles.wrap, className)}>
      <PrimaryInput
        {...(register ? register(name) : register)}
        onFocus={onFocus}
        onBlur={onBlur}
        error={error}
        disabled={disabled}
        defaultValue={defaultValue}
        showError={showError}
        isFocused={isFocused}
        errorPasword={errorPasword}
        validationHint={validationHint}
        placeholder={placeholder}
        type={isPasswordVisible ? 'text' : type}
      />
      {(isFocused || defaultValue) && <div className={styles.wrapPlace}>{placeholder}</div>}

      <div className={styles.wrapNotification}>
        {errorEmail && (
          <div className={styles.wrapHintError} data-test-id='hint'>
            error
          </div>
        )}
        {error === ERRORS_VALID[ERROR_PASSWORD_MISMATCH] && !isBlur && (
          <div className={styles.wrapHintError} data-test-id='hint'>
            {ERRORS_VALID[ERROR_PASSWORD_MISMATCH]}
          </div>
        )}
        {error === ERRORS_VALID[ERROR_EMPTY_FIELD] && showReq && (
          <div className={styles.wrapHintError} data-test-id='hint'>
            {ERRORS_VALID[ERROR_EMPTY_FIELD]}
          </div>
        )}

        {error === ERRORS_VALID[ERROR_EMPTY_FIELD] && showEmptyField && (
          <div data-test-id='hint' className={classNames(styles.wrapHintError, styles.wrapHint)}>
            {error}
          </div>
        )}

        {error && showError && (
          <div data-test-id='hint' className={classNames(styles.wrapHintError, styles.wrapHint)}>
            {error}
          </div>
        )}

        {error === ERRORS_VALID[ERROR_EMPTY_FIELD] && profileValid && (isFocused || !isBlur) && (
          <div data-test-id='hint' className={classNames(styles.wrapHintError, styles.wrapHint)}>
            {error === ERRORS_VALID[ERROR_EMPTY_FIELD] && error}
          </div>
        )}

        {validationHint === ERRORS_VALID[ERROR_LOGIN_FORMAT] &&
          defaultValue !== '' &&
          (error !== ERRORS_VALID[ERROR_REQUIRED_FIELD] || !isFocused) && (
            <div
              data-test-id='hint'
              className={classNames(styles.wrapHint, {
                [styles.wrapHintRed]: !isBlur && error,
              })}
            >
              Используйте для логина
              <span
                className={classNames({
                  [styles.wrapHintRed]: error === 'латинский алфавит ' || error === 'латинский алфавит цифры',
                })}
              >
                {' '}
                латинский алфавит{' '}
              </span>
              и
              <span
                className={classNames({
                  [styles.wrapHintRed]: error === ' цифры' || error === 'латинский алфавит цифры',
                })}
              >
                {' '}
                цифры
              </span>
            </div>
          )}

        {validationHint === ERRORS_VALID[ERROR_PASSWORD_FORMAT] &&
          defaultValue !== '' &&
          (error !== ERRORS_VALID[ERROR_REQUIRED_FIELD] || !isFocused) && (
            <div
              data-test-id='hint'
              className={classNames(styles.wrapHint, {
                [styles.wrapHintRed]: !isBlur && error,
              })}
            >
              Пароль
              <span
                className={classNames({
                  [styles.wrapHintRed]: isHintRedFirst(error ?? ''),
                })}
              >
                {' '}
                не менее 8 символов
              </span>
              , с
              <span
                className={classNames({
                  [styles.wrapHintRed]: isHintRedSecond(error ?? ''),
                })}
              >
                {' '}
                заглавной буквой
              </span>{' '}
              и
              <span
                className={classNames({
                  [styles.wrapHintRed]: isHintRedThree(error ?? ''),
                })}
              >
                {' '}
                цифрой
              </span>
            </div>
          )}
      </div>

      {isAuth && (
        <div className={styles.wrapAuthPassword}>
          {!errorPasword && (
            <Link data-test-id='hint' className={styles.wrapAuthlinkOne} to='/forgot-pass'>
              Забыли логин или пароль?
            </Link>
          )}
          {errorPasword && (
            <div>
              <div data-test-id='hint' className={styles.wrapAuthEror}>
                Неверный логин или пароль!
              </div>
              <Link className={styles.wrapAuthlinkTwo} to='/forgot-pass'>
                Восстановить?
              </Link>
            </div>
          )}
        </div>
      )}

      {type === 'password' && isFocused && (
        <button
          data-test-id={isPasswordVisible ? 'eye-opened' : 'eye-closed'}
          type='button'
          className={styles.wrapEye}
          onClick={handleTogglePasswordVisibility}
        >
          <img src={isPasswordVisible ? OpenEye : CloseEye} alt='OpenEye' />
        </button>
      )}

      {type === 'password' && !error && isFocused && !isAuth && !showCheck && (
        <div className={styles.wrapCheck} data-test-id='checkmark'>
          <img src={Check} alt='Check' />
        </div>
      )}
    </div>
  );
};
