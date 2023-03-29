import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ArrowRight from '../../../assets/icon/arrow-right.svg';
import { AuthModal } from '../../../components/blocks/modal/auth-modal';
import { ErrorModal } from '../../../components/blocks/modal/error-modal';
import { PrimaryButton } from '../../../components/common/buttons/primary-button';
import { FormField } from '../../../components/common/form-field';
import { Spiner } from '../../../components/common/spiner';
import {
  EMAIL_REGEX,
  ERROR_EMAIL_MISMATCH,
  ERROR_EMPTY_FIELD,
  ERROR_PASSWORD_FORMAT,
  ERROR_PASSWORD_MISMATCH,
  ERRORS_VALID,
  PASSWORD_ALPHABET_REGEX,
  PASSWORD_CAPITAL_LETTER_REGEX,
  PASSWORD_DIGITS_REGEX,
  STATUS,
} from '../../../constans';
import { fetchForgotPassword, fetchResetPassword } from '../../../redux/auth/async-actions';
import { selectRegistrationData } from '../../../redux/auth/selectors';
import { setDataReset } from '../../../redux/auth/slice';
import { useAppDispatch } from '../../../redux/store';

import styles from './forgot-pass-page.module.scss';

export type IForgotPassPage = {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
};

const schema = yup.object().shape({
  email: yup.string().min(1, ERRORS_VALID[ERROR_EMPTY_FIELD]).matches(EMAIL_REGEX, ERRORS_VALID[ERROR_EMAIL_MISMATCH]),
});

const schemaTwo = yup.object().shape({
  password: yup
    .string()
    .min(1, ERRORS_VALID[ERROR_EMPTY_FIELD])
    .test('password', 'ssPassword', function (value) {
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
  passwordConfirmation: yup
    .string()
    .min(1, ERRORS_VALID[ERROR_EMPTY_FIELD])
    .test('password-confirmation', ERRORS_VALID[ERROR_PASSWORD_MISMATCH], function (value) {
      const { password } = this.parent;

      return !password || value === password;
    }),
});

export const ForgotPassPage: FC = () => {
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);

  const selectedSchema = showResetPasswordForm ? schemaTwo : schema;
  const {
    register,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassPage>({
    mode: 'all',
    resolver: yupResolver(selectedSchema),
  });

  const [modal, setModal] = useState('');
  const [code, setCode] = useState('');

  const [errorEmail, setErrorEmail] = useState(false);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
    passwordConfirmation: false,
  });
  const [isBlur, setIsBlur] = useState({
    password: false,
    passwordConfirmation: false,
  });

  const { status } = useSelector(selectRegistrationData);
  const watchAllFields = watch();
  const dispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    if (code) {
      setCode(code);
      setShowResetPasswordForm(true);
    }
  }, [location]);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused({ ...isFocused, [event.target.name]: true });
    if (
      event.target.name === 'email' ||
      event.target.name === 'password' ||
      event.target.name === 'passwordConfirmation'
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

  const onSubmitStep = async (data: IForgotPassPage) => {
    const params = {
      email: data.email,
    };

    const res = await dispatch(fetchForgotPassword(params));

    if (res.payload) {
      setErrorEmail(true);
    } else {
      setModal(STATUS.OK);
    }
  };

  const onSubmitPass = async (data: IForgotPassPage) => {
    const params = {
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      code,
    };

    const res = await dispatch(fetchResetPassword(params));

    dispatch(setDataReset(params));

    if (res.payload) {
      setModal(STATUS.ERROR);
    } else {
      setModal(STATUS.OK);
    }
  };

  const handleErrorModalChange = (value: string) => {
    setModal(value);
  };

  return (
    <div>
      {showResetPasswordForm ? (
        <div>
          {modal === '' && (
            <AuthModal>
              <form className={styles.auth} onSubmit={handleSubmit(onSubmitPass)} data-test-id='reset-password-form'>
                <h3 className={styles.authTitle}>Восстановление пароля</h3>
                <div className={styles.authMain}>
                  <FormField
                    type='password'
                    onFocus={handleFocus}
                    isFocused={isFocused.password}
                    name='password'
                    register={register}
                    onBlur={handleBlur}
                    showEmptyField={true}
                    isBlur={isBlur.password}
                    validationHint={ERRORS_VALID[ERROR_PASSWORD_FORMAT]}
                    placeholder='Новый пароль'
                    error={errors.password && errors.password.message}
                  />
                  <FormField
                    type='password'
                    onFocus={handleFocus}
                    isFocused={isFocused.passwordConfirmation}
                    name='passwordConfirmation'
                    register={register}
                    showCheck={true}
                    isBlur={isBlur.passwordConfirmation}
                    showEmptyField={true}
                    onBlur={handleBlur}
                    placeholder='Повторите пароль'
                    error={errors.passwordConfirmation && errors.passwordConfirmation.message}
                  />
                </div>

                <div className={styles.authFooter}>
                  <PrimaryButton
                    type='submit'
                    className={styles.authBtn}
                    disabled={!!errors.password || (!!errors.passwordConfirmation && !isBlur.passwordConfirmation)}
                    fill='primary'
                  >
                    сохранить изменения
                  </PrimaryButton>

                  <div className={styles.authInfo}>После сохранения войдите в библиотеку, используя новый пароль</div>
                </div>
                {status === STATUS.LOADING && <Spiner />}
              </form>
            </AuthModal>
          )}

          {modal === STATUS.ERROR && (
            <div>
              <ErrorModal
                title='Данные не сохранились'
                description='Что-то пошло не так. Попробуйте ещё раз'
                titleBtn='повторить'
                errorResetPas={true}
                notLink={true}
                onErrorModalChange={handleErrorModalChange}
              />
              {status === STATUS.LOADING && <Spiner />}
            </div>
          )}

          {modal === STATUS.OK && (
            <div>
              <ErrorModal
                title='Новые данные сохранены'
                description='Зайдите в личный кабинет, используя свои логин и новый пароль'
                titleBtn='вход'
                link='auth'
              />
              {status === STATUS.LOADING && <Spiner />}
            </div>
          )}
        </div>
      ) : (
        <div>
          {modal === '' && (
            <AuthModal showHeader={true}>
              <form className={styles.auth} onSubmit={handleSubmit(onSubmitStep)} data-test-id='send-email-form'>
                <h3 className={styles.authTitle}>Восстановление пароля</h3>
                <div className={styles.authMain}>
                  <FormField
                    type='text'
                    onFocus={handleFocus}
                    isFocused={isFocused.email}
                    name='email'
                    register={register}
                    onBlur={handleBlur}
                    errorEmail={errorEmail}
                    placeholder='Email'
                    showError={true}
                    validationHint='На это email  будет отправлено письмо с инструкциями по восстановлению пароля'
                    error={errors.email && errors.email.message}
                  />
                </div>

                <div className={styles.authFooter}>
                  <PrimaryButton type='submit' className={styles.authBtn} fill='primary'>
                    восстановить
                  </PrimaryButton>

                  <div className={styles.authLinks}>
                    <p className={styles.authInfo}>Нет учётной записи?</p>
                    <Link className={styles.authLinkReg} to='/registration'>
                      <div>Регистрация</div>
                      <img src={ArrowRight} alt='ArrowRight' />
                    </Link>
                  </div>
                </div>
                {status === STATUS.LOADING && <Spiner />}
              </form>
            </AuthModal>
          )}

          {modal === STATUS.OK && (
            <div>
              <ErrorModal
                title='Письмо выслано'
                description='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'
                showBtn={true}
              />
              {status === STATUS.LOADING && <Spiner />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
