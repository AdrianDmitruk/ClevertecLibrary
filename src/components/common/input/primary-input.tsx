import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './primary-input.module.scss';

type PrimaryInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  className?: string;
  name?: string;
  type: string;
  error?: string;
  validationHint?: string;
  placeholder?: string;
  isFocused?: boolean;
  errorPasword?: boolean;
  disabled?: boolean;
  showError?: boolean;
  defaultValue?: string;
};

export const PrimaryInput = forwardRef(
  (
    {
      className,
      name,
      type,
      error,
      placeholder,
      validationHint,
      showError,
      defaultValue,
      disabled,
      errorPasword,
      isFocused,
      ...rest
    }: PrimaryInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => (
    <input
      className={classNames(className, styles.wrapInput, {
        [styles.wrapInputError]: (error && isFocused) || (errorPasword && error),
      })}
      name={name}
      ref={ref}
      defaultValue={defaultValue}
      type={type}
      disabled={disabled}
      placeholder={isFocused ? '' : placeholder}
      {...rest}
    />
  )
);
