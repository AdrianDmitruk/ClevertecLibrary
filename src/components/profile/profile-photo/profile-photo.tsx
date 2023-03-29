/* eslint-disable no-negated-condition */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChangeEvent, createRef, FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { HOST_ENDPOINT } from '../../../api/endpoint';
import Avatar from '../../../assets/content/avatar-big.png';
import IconCam from '../../../assets/icon/photo.svg';
import { STATUS } from '../../../constans';
import { useAppDispatch } from '../../../redux/store';
import { fetchEditUser, fetchUploadUser, fetchUser } from '../../../redux/user/async-actions';
import { selectUserData } from '../../../redux/user/selectors';
import { HandlerError } from '../../common/handler-error';
import { Spiner } from '../../common/spiner';

import styles from './profile-photo.module.scss';

export const ProfilePhoto: FC = () => {
  const { data: user } = useSelector(selectUserData);
  const dispatch = useAppDispatch();
  const imageInputRef = createRef<HTMLInputElement>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files?.length) {
      const formData = new FormData();

      formData.append('files', files[0]);
      setIsLoading(true);

      dispatch(fetchUploadUser(formData)).then((result) => {
        if (fetchUploadUser.fulfilled.match(result) && user?.id) {
          // @ts-ignore
          dispatch(fetchEditUser({ avatar: result.payload?.data[0].id, id: user.id })).then((editResult) => {
            if (fetchEditUser.fulfilled.match(editResult)) {
              dispatch(fetchUser()).then((res) => {
                if (fetchUser.fulfilled.match(res)) {
                  setIsLoading(false);
                  setStatus(STATUS.OK);
                } else {
                  setIsLoading(false);
                  setStatus(STATUS.ERROR);
                }
              });
            } else {
              setIsLoading(false);
              setStatus(STATUS.ERROR);
            }
          });
        } else {
          setIsLoading(false);
          setStatus(STATUS.ERROR);
        }
      });
    }
  };

  const handleUploadClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  if (isLoading) {
    return <Spiner />;
  }

  return (
    <div data-test-id='profile-avatar' className={styles.photo}>
      {status === STATUS.OK && <HandlerError err={true} seccess={true} title='Фото успешно сохранено!' />}
      {status === STATUS.ERROR && (
        <HandlerError err={true} title='Что-то пошло не так, фото не сохранилось. Попробуйте позже!' />
      )}
      <div className={styles.photoWrap} aria-hidden={true} onClick={handleUploadClick}>
        <img className={styles.photoImg} src={user?.avatar ? `${HOST_ENDPOINT}${user.avatar}` : Avatar} alt='Avatar' />

        <input
          className={styles.photoInput}
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={imageInputRef}
        />
        <div className={styles.photoAdd}>
          <img className={styles.photoCam} src={IconCam} alt='IconCam' />
        </div>
      </div>
      <div className={styles.photoName}>
        <p className={styles.photoNameTitle}>{user?.firstName}</p>
        <p className={styles.photoNameTitle}>{user?.lastName}</p>
      </div>
    </div>
  );
};
