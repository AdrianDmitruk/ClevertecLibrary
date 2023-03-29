import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ArrowRight from '../../../assets/icon/arrow-right.svg';
import { AuthModal } from '../../../components/blocks/modal/auth-modal';
import { ErrorModal } from '../../../components/blocks/modal/error-modal';
import { PrimaryButton } from '../../../components/common/buttons/primary-button';
import { FormField } from '../../../components/common/form-field';
import { PhoneInput } from '../../../components/common/input/input-phone/input-phone';
import { Spiner } from '../../../components/common/spiner';
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
import { fetchRegistration } from '../../../redux/auth/async-actions';
import { selectRegistrationData } from '../../../redux/auth/selectors';
import { setDataRegister } from '../../../redux/auth/slice';
import { useAppDispatch } from '../../../redux/store';

import styles from './registration-page.module.scss';

export type IRegistrationPage = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

const schema = yup.object().shape({
  username: yup
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

// eslint-disable-next-line complexity
export const RegistrationPage: FC = () => {
  const [isFocused, setIsFocused] = useState({
    username: false,
    password: false,
    firstName: false,
    lastName: false,
    email: false,
  });
  const [isBlur, setIsBlur] = useState({
    username: false,
    password: false,
    firstName: false,
    lastName: false,
    email: false,
  });
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneValid, setPhoneValid] = useState(false);
  const [modal, setModal] = useState('');

  const {
    register,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegistrationPage>({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const { status } = useSelector(selectRegistrationData);
  const watchAllFields = watch();
  const dispatch = useAppDispatch();
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused({ ...isFocused, [event.target.name]: true });
    if (
      event.target.name === 'username' ||
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

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const onSubmitStep = async (data: IRegistrationPage) => {
    const params = {
      username: data.username,
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: phoneNumber,
    };

    if (step === 3) {
      const res = await dispatch(fetchRegistration(params));

      dispatch(setDataRegister(params));

      if (!res.payload) {
        setModal(STATUS.OK);
      }
      if (res.payload === 'Request failed with status code 400') {
        setModal('userHas');
        setStep(1);
        reset();
      } else if (res.payload) {
        setModal(STATUS.ERROR);
      }
    } else {
      nextStep();
    }
  };

  const handlePhoneInputChange = (value: string) => {
    setPhoneNumber(value);
  };
  const handlePhoneValid = (value: boolean) => {
    setPhoneValid(value);
  };

  const handleErrorModalChange = (value: string) => {
    setModal(value);
  };

  return (
    <div>
      {modal === '' && (
        <AuthModal>
          <form className={styles.registration} onSubmit={handleSubmit(onSubmitStep)} data-test-id='register-form'>
            <div className={styles.registrationHeader}>
              <h3 className={styles.registrationTitle}>Регистрация</h3>
              <p className={styles.registrationSubtitle}>{step} шаг из 3</p>
            </div>
            <div className={styles.registrationMain}>
              {step === 1 && (
                <div>
                  <FormField
                    type='text'
                    onFocus={handleFocus}
                    isFocused={isFocused.username}
                    name='username'
                    showEmptyField={true}
                    isBlur={isBlur.username}
                    register={register}
                    onBlur={handleBlur}
                    validationHint={ERRORS_VALID[ERROR_LOGIN_FORMAT]}
                    placeholder='Придумайте логин для входа'
                    error={errors.username && errors.username.message}
                  />
                  <FormField
                    type='password'
                    onFocus={handleFocus}
                    isFocused={isFocused.password}
                    name='password'
                    register={register}
                    onBlur={handleBlur}
                    isBlur={isBlur.password}
                    showEmptyField={true}
                    validationHint={ERRORS_VALID[ERROR_PASSWORD_FORMAT]}
                    placeholder='Пароль'
                    error={errors.password && errors.password.message}
                  />
                </div>
              )}
              {step === 2 && (
                <div>
                  <FormField
                    type='text'
                    onFocus={handleFocus}
                    isFocused={isFocused.firstName}
                    name='firstName'
                    register={register}
                    onBlur={handleBlur}
                    placeholder='Имя'
                    showError={true}
                    error={errors.firstName && errors.firstName.message}
                  />
                  <FormField
                    type='text'
                    onFocus={handleFocus}
                    isFocused={isFocused.lastName}
                    name='lastName'
                    register={register}
                    onBlur={handleBlur}
                    placeholder='Фамилия'
                    showError={true}
                    error={errors.lastName && errors.lastName.message}
                  />
                </div>
              )}
              {step === 3 && (
                <div>
                  <PhoneInput
                    showHint={true}
                    onPhoneInputChange={handlePhoneInputChange}
                    onPhoneValid={handlePhoneValid}
                  />
                  <FormField
                    type='text'
                    onFocus={handleFocus}
                    isFocused={isFocused.email}
                    name='email'
                    register={register}
                    onBlur={handleBlur}
                    placeholder='E-mail'
                    showError={true}
                    error={errors.email && errors.email.message}
                  />
                </div>
              )}
            </div>
            <div className={styles.registrationFooter}>
              {step === 1 && (
                <PrimaryButton
                  disabled={
                    (!!errors.username && isFocused.username) ||
                    !!(errors.password?.message === ERRORS_VALID[ERROR_EMPTY_FIELD])
                  }
                  type='submit'
                  className={styles.registrationBtn}
                  fill='primary'
                >
                  следующий шаг
                </PrimaryButton>
              )}
              {step === 2 && (
                <PrimaryButton
                  disabled={!!errors.firstName || !!errors.lastName}
                  type='submit'
                  className={styles.registrationBtn}
                  fill='primary'
                >
                  последний шаг
                </PrimaryButton>
              )}
              {step === 3 && (
                <PrimaryButton
                  disabled={!!errors.email || !phoneValid}
                  type='submit'
                  className={styles.registrationBtn}
                  fill='primary'
                >
                  зарегистрироваться
                </PrimaryButton>
              )}

              <div className={styles.registrationLinks}>
                <p className={styles.registrationInfo}>Есть учётная запись?</p>

                <Link className={styles.registrationLinkAuth} to='/auth'>
                  <div>войти</div>
                  <img src={ArrowRight} alt='ArrowRight' />
                </Link>
              </div>
            </div>
            {status === STATUS.LOADING && <Spiner />}
          </form>
        </AuthModal>
      )}

      {modal === 'userHas' && (
        <div>
          <ErrorModal
            title='Данные не сохранились'
            description='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail'
            link='registration'
            titleBtn='назад к регистрации'
            onErrorModalChange={handleErrorModalChange}
          />
          {status === STATUS.LOADING && <Spiner />}
        </div>
      )}
      {modal === STATUS.ERROR && (
        <div>
          <ErrorModal
            title='Данные не сохранились'
            description='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз'
            link='registration'
            titleBtn='повторить'
            onErrorModalChange={handleErrorModalChange}
          />
          {status === STATUS.LOADING && <Spiner />}
        </div>
      )}
      {modal === STATUS.OK && (
        <div>
          <ErrorModal
            title='Регистрация успешна'
            description='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль'
            link='auth'
            titleBtn='вход'
          />
          {status === STATUS.LOADING && <Spiner />}
        </div>
      )}
    </div>
  );
};
