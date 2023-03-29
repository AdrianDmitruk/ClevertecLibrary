import React, { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';
import classNames from 'classnames';

import { ERROR_EMPTY_FIELD, ERRORS_VALID, PHONE_MASK, PHONE_VALID } from '../../../../constans';

import styles from './input-phone.module.scss';

type PhoneInputProps = {
  disabled?: boolean;
  showHint?: boolean;
  defaultValue?: string;
  onPhoneInputChange: (value: string) => void;
  onPhoneValid: (value: boolean) => void;
};

export const PhoneInput: React.FC<PhoneInputProps> = ({
  onPhoneInputChange,
  onPhoneValid,
  showHint,
  defaultValue,
  disabled,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [hasInputBeenFocused, setHasInputBeenFocused] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      setPhoneNumber(defaultValue);
    }
  }, [defaultValue]);

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (defaultValue) {
      setPhoneNumber(defaultValue);
    }

    if (value !== '+375 (XX) XXX-XX-XX' || defaultValue) {
      const isValid = PHONE_VALID.test(value);

      setIsPhoneNumberValid(isValid);
      setPhoneNumber(value);

      if (isValid) {
        onPhoneInputChange(value);
        onPhoneValid(true);
      }
    }
  };

  const handleFocus = () => {
    if (!hasInputBeenFocused) {
      setIsPhoneNumberValid(false);
      setHasInputBeenFocused(true);
    }
  };

  const handleBlur = () => {
    if (phoneNumber) {
      setIsPhoneNumberValid(PHONE_VALID.test(phoneNumber));
    } else {
      setIsPhoneNumberValid(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <MaskedInput
        className={classNames(styles.wrapInput, {
          [styles.wrapInputError]: !isPhoneNumberValid,
        })}
        mask={PHONE_MASK}
        placeholder='+375 (XX) XXX-XX-XX'
        placeholderChar='x'
        guide={true}
        required={true}
        name='phone'
        value={phoneNumber}
        disabled={disabled}
        onChange={handlePhoneNumberChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <p className={styles.wrapPlacehold}>Номер телефона</p>
      {showHint && (
        <p
          data-test-id='hint'
          className={classNames(styles.wrapHint, {
            [styles.wrapHintError]: !isPhoneNumberValid,
          })}
        >
          В формате +375 (xx) xxx-xx-xx
        </p>
      )}
      {phoneNumber === '' && (
        <div data-test-id='hint' className={classNames(styles.wrapHint, styles.wrapHintError)}>
          {ERRORS_VALID[ERROR_EMPTY_FIELD]}
        </div>
      )}
    </div>
  );
};
