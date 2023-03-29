/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  EMAIL_REGEX,
  ERROR_EMAIL_MISMATCH,
  ERROR_EMPTY_FIELD,
  ERROR_LOGIN_FORMAT,
  ERROR_PASSWORD_FORMAT,
  ERRORS_VALID,
  PASSWORD_ALPHABET_REGEX,
  PASSWORD_CAPITAL_LETTER_REGEX,
  PASSWORD_DIGITS_REGEX,
  STATUS,
  USERNAME_REGEX,
  USERNAME_REQUIRED_NUMBER_REGEX,
} from '../../../constans';
import { selectFullBookData } from '../../../redux/fullBook/selectors';
import { useAppDispatch } from '../../../redux/store';
import { fetchEditDataUser, fetchUser } from '../../../redux/user/async-actions';
import { selectUserData } from '../../../redux/user/selectors';
import { PrimaryButton } from '../../common/buttons/primary-button';
import { FormField } from '../../common/form-field';
import { HandlerError } from '../../common/handler-error';
import { PhoneInput } from '../../common/input/input-phone';
import { Spiner } from '../../common/spiner';

import styles from './profile-info.module.scss';

export type IEditInfoPage = {
  login?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
};

const schema = yup.object().shape({
  login: yup
    .string()
    .min(1, ERRORS_VALID[ERROR_EMPTY_FIELD])
    .test('login', 'testLogin', function (value) {
      const alphabet = USERNAME_REGEX.test(value ?? '');
      const digits = USERNAME_REQUIRED_NUMBER_REGEX.test(value ?? '');

      if (alphabet && digits) {
        return true;
      }
      const errors = {
        alphabet: alphabet ? '' : 'латинский алфавит',
        digits: digits ? '' : 'цифры',
      };

      return this.createError({ message: Object.values(errors).join(' ') });
    }),
  password: yup
    .string()
    .min(1, ERRORS_VALID[ERROR_EMPTY_FIELD])
    .test('password', 'testPassword', function (value) {
      const capitalLetter = PASSWORD_CAPITAL_LETTER_REGEX.test(value ?? '');
      const digits = PASSWORD_DIGITS_REGEX.test(value ?? '');
      const alphabet = PASSWORD_ALPHABET_REGEX.test(value ?? '');

      if (capitalLetter && digits && alphabet) {
        return true;
      }
      const errors = {
        capitalLetter: capitalLetter ? '' : 'заглавной буквой',
        digits: digits ? '' : 'цифрой',
        alphabet: alphabet ? '' : 'не менее 8 символов',
      };

      return this.createError({ message: Object.values(errors).join(' ') });
    }),
  firstName: yup.string().min(1, ERRORS_VALID[ERROR_EMPTY_FIELD]),
  lastName: yup.string().min(1, ERRORS_VALID[ERROR_EMPTY_FIELD]),
  email: yup.string().min(1, ERRORS_VALID[ERROR_EMPTY_FIELD]).matches(EMAIL_REGEX, ERRORS_VALID[ERROR_EMAIL_MISMATCH]),
});

export const ProfileInfo: FC = () => {
  const { data: user, status: statusUser } = useSelector(selectUserData);
  const { statusEditComment } = useSelector(selectFullBookData);
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<string>('');

  const [isFocused, setIsFocused] = useState({
    login: false,
    password: false,
    firstName: false,
    lastName: false,
    email: false,
  });

  const [isBlur, setIsBlur] = useState({
    login: false,
    password: false,
    firstName: false,
    lastName: false,
    email: false,
  });

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneValid, setPhoneValid] = useState(false);
  const [editInfo, setEditInfo] = useState(false);

  const {
    register,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditInfoPage>({
    mode: 'all',
    resolver: yupResolver(schema),
    values: {
      login: user?.username,
      password: '',
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    },
  });

  const watchAllFields = watch();

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused({ ...isFocused, [event.target.name]: true });
    if (
      event.target.name === 'login' ||
      event.target.name === 'password' ||
      event.target.name === 'firstName' ||
      event.target.name === 'lastName' ||
      event.target.name === 'phone' ||
      event.target.name === 'email'
    ) {
      trigger(event.target.name);
    }

    setIsBlur({ ...isBlur, [event.target.name]: true });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-negated-condition
    if (watchAllFields[event.target.name] !== '') {
      setIsFocused({ ...isFocused, [event.target.name]: true });
    } else {
      setIsFocused({ ...isFocused, [event.target.name]: false });
    }

    setIsBlur({ ...isBlur, [event.target.name]: false });
  };

  const handlePhoneInputChange = (value: string) => {
    setPhoneNumber(value);
  };
  const handlePhoneValid = (value: boolean) => {
    setPhoneValid(value);
  };

  const onSubmit = (data: IEditInfoPage) => {
    setStatus('');
    const params = {
      username: data.login,
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: phoneNumber ? phoneNumber : user?.phone,
    };

    if (user?.id) {
      dispatch(fetchEditDataUser({ params, id: user.id })).then((result) => {
        if (fetchEditDataUser.fulfilled.match(result)) {
          dispatch(fetchUser());
          setStatus(STATUS.OK);
          setEditInfo(false);
        } else {
          setStatus(STATUS.ERROR);
        }
      });
    }
  };

  if (statusUser === STATUS.LOADING && statusEditComment !== STATUS.ERROR) {
    return <Spiner />;
  }

  return (
    <form data-test-id='profile-form' className={styles.info} onSubmit={handleSubmit(onSubmit)}>
      {status === STATUS.OK && <HandlerError err={true} seccess={true} title='Изменения успешно сохранены!' />}
      {status === STATUS.ERROR && <HandlerError err={true} title='Изменения не были сохранены. Попробуйте позже!' />}
      <div className={styles.infoForm}>
        <div className={styles.infoFormItem}>
          <FormField
            type='text'
            onFocus={handleFocus}
            isFocused={isFocused.login}
            name='login'
            profileValid={true}
            isBlur={isBlur.login}
            defaultValue={watchAllFields.login}
            disabled={!editInfo}
            register={register}
            onBlur={handleBlur}
            validationHint={editInfo ? ERRORS_VALID[ERROR_LOGIN_FORMAT] : ''}
            placeholder='Логин'
            error={editInfo && errors.login ? errors.login.message : undefined}
          />

          <FormField
            type='password'
            onFocus={handleFocus}
            isFocused={isFocused.password}
            name='password'
            profileValid={true}
            isBlur={isBlur.password}
            disabled={!editInfo}
            defaultValue={watchAllFields.password}
            register={register}
            onBlur={handleBlur}
            validationHint={editInfo ? ERRORS_VALID[ERROR_PASSWORD_FORMAT] : ''}
            placeholder='Пароль'
            error={editInfo && errors.password ? errors.password.message : undefined}
          />
        </div>

        <div className={styles.infoFormItem}>
          <FormField
            type='text'
            onFocus={handleFocus}
            isFocused={isFocused.firstName}
            name='firstName'
            defaultValue={watchAllFields.firstName}
            disabled={!editInfo}
            register={register}
            profileValid={true}
            onBlur={handleBlur}
            placeholder='Имя'
            error={editInfo && errors.firstName ? errors.firstName.message : undefined}
          />
          <FormField
            type='text'
            onFocus={handleFocus}
            isFocused={isFocused.lastName}
            name='lastName'
            defaultValue={watchAllFields.lastName}
            disabled={!editInfo}
            register={register}
            onBlur={handleBlur}
            placeholder='Фамилия'
            profileValid={true}
            error={editInfo && errors.lastName ? errors.lastName.message : undefined}
          />
        </div>

        <div className={styles.infoFormItem}>
          <div className={styles.infoFormBlock}>
            <PhoneInput
              disabled={!editInfo}
              defaultValue={user?.phone}
              showHint={editInfo}
              onPhoneInputChange={handlePhoneInputChange}
              onPhoneValid={handlePhoneValid}
            />
          </div>
          <div className={styles.infoFormBlock}>
            <FormField
              type='text'
              onFocus={handleFocus}
              isFocused={isFocused.email}
              name='email'
              defaultValue={watchAllFields.lastName}
              disabled={!editInfo}
              register={register}
              onBlur={handleBlur}
              placeholder='E-mail'
              showError={true}
              error={editInfo && errors.email ? errors.email.message : undefined}
            />
          </div>
        </div>
      </div>
      <div className={styles.infoBtnWrap}>
        <PrimaryButton
          dataId='edit-button'
          showDefault={true}
          handleBtnModal={() => setEditInfo(!editInfo)}
          className={styles.infoBtn}
          fill='secondary'
        >
          Редактировать
        </PrimaryButton>
        <PrimaryButton
          dataId='save-button'
          type='submit'
          disabled={!editInfo}
          className={styles.infoBtn}
          fill='primary'
        >
          Сохранить изменения
        </PrimaryButton>
      </div>
    </form>
  );
};
