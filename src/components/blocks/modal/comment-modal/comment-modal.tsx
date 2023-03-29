import { ChangeEvent, FC } from 'react';

import closeModal from '../../../../assets/icon/close-modal.svg';
import { PrimaryButton } from '../../../common/buttons/primary-button';
import { Rating } from '../../../common/rating';

import styles from './comment-modal.module.scss';

type CommentModalProps = {
  isOpen: boolean;
  rating: boolean;
  value: string;
  selectedRate: number | undefined;
  serchComment: boolean;
  onClose: () => void;
  onSubmitComment: () => void;
  onEditComment: () => void;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelectedRateChange: (rate: number | undefined) => void;
};

export const CommentModal: FC<CommentModalProps> = ({
  rating,
  isOpen,
  serchComment,
  selectedRate,
  value,
  onSubmitComment,
  onEditComment,
  onClose,
  handleSelectedRateChange,
  handleChange,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return isOpen ? (
    <div aria-hidden={true} className={styles.modal} onClick={handleClick} data-test-id='modal-outer'>
      <div className={styles.modalWrap} data-test-id='modal-rate-book'>
        <button data-test-id='modal-close-button' type='button' className={styles.modalClose} onClick={onClose}>
          <img src={closeModal} alt='closeModal' />
        </button>
        <h3 data-test-id='modal-title' className={styles.modalTitle}>
          Оцените книгу
        </h3>
        <div className={styles.content}>
          <div className={styles.contentRatingWrap}>
            <p className={styles.contentRatingTitle}>Ваша оценка</p>
            <Rating
              className={styles.contentRatingStar}
              isNotRating={!rating}
              count={selectedRate}
              gap={true}
              onSelectedRateChange={handleSelectedRateChange}
            />
          </div>
          <textarea
            data-test-id='comment'
            value={value}
            onChange={handleChange}
            className={styles.contentText}
            placeholder='Оставить отзыв'
          />
          {serchComment ? (
            <PrimaryButton
              handleBtnModal={() => onEditComment()}
              showDefault={true}
              className={styles.contentBtn}
              fill='primary'
              dataId='button-comment'
            >
              изменить оценку
            </PrimaryButton>
          ) : (
            <PrimaryButton
              handleBtnModal={() => onSubmitComment()}
              showDefault={true}
              className={styles.contentBtn}
              fill='primary'
              dataId='button-comment'
            >
              оценить
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  ) : null;
};
