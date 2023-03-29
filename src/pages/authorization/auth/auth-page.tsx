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
import { Spiner } from '../../../components/common/spiner';
import { ERROR_EMPTY_FIELD, ERRORS_VALID, STATUS } from '../../../constans';
import { fetchLogin } from '../../../redux/auth/async-actions';
import { selectRegistrationData } from '../../../redux/auth/selectors';
import { setDataAuth } from '../../../redux/auth/slice';
import { useAppDispatch } from '../../../redux/store';

import styles from './auth-page.module.scss';

export type IAuthPage = {
  identifier: string;
  password: string;
};

const schema = yup.object().shape({
  identifier: yup.string().required(ERRORS_VALID[ERROR_EMPTY_FIELD]),

  password: yup.string().required(ERRORS_VALID[ERROR_EMPTY_FIELD]),
});

export const AuthPage: FC = () => {
  const {
    register,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthPage>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const [modal, setModal] = useState('');
  const [errorPasword, setErrorPasword] = useState(false);
  const [isFocused, setIsFocused] = useState({
    identifier: false,
    password: false,
  });

  const { status, dataAuth } = useSelector(selectRegistrationData);
  const watchAllFields = watch();
  const dispatch = useAppDispatch();

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused({ ...isFocused, [event.target.name]: true });
    if (event.target.name === 'identifier' || event.target.name === 'password') {
      trigger(event.target.name);
    }
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
  };

  const onSubmitStep = async (data: IAuthPage) => {
    const params = {
      identifier: data.identifier,
      password: data.password,
    };

    const res = await dispatch(fetchLogin(params));

    dispatch(setDataAuth(params));

    if (res.payload === 'Request failed with status code 400') {
      setErrorPasword(true);
    } else if (res.payload) {
      setModal(STATUS.ERROR);
    }
  };

  return (
    <div>
      {modal === '' && (
        <AuthModal>
          <form className={styles.auth} onSubmit={handleSubmit(onSubmitStep)} data-test-id='auth-form'>
            <h3 className={styles.authTitle}>Bход в личный кабинет</h3>
            <div className={styles.authMain}>
              <FormField
                type='text'
                onFocus={handleFocus}
                isFocused={isFocused.identifier}
                name='identifier'
                register={register}
                onBlur={handleBlur}
                showReq={true}
                placeholder='Логин'
                errorPasword={errorPasword}
                error={errors.identifier && errors.identifier.message}
              />
              <FormField
                type='password'
                className={styles.authPas}
                onFocus={handleFocus}
                isFocused={isFocused.password}
                name='password'
                isAuth={true}
                showReq={true}
                register={register}
                onBlur={handleBlur}
                errorPasword={errorPasword}
                placeholder='Пароль'
                error={errors.password && errors.password.message}
              />
            </div>

            <div className={styles.authFooter}>
              <PrimaryButton
                type='submit'
                disabled={
                  errorPasword &&
                  dataAuth.identifier === watchAllFields.identifier &&
                  dataAuth.password === watchAllFields.password
                }
                className={styles.authBtn}
                fill='primary'
              >
                вход
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

      {modal === STATUS.ERROR && (
        <div>
          <ErrorModal
            title='Вход не выполнен'
            description='Что-то пошло не так. Попробуйте ещё раз'
            link='auth'
            titleBtn='повторить'
            errorAuth={true}
          />
          {status === STATUS.LOADING && <Spiner />}
        </div>
      )}
    </div>
  );
};
