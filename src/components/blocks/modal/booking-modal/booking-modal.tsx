import { FC, ReactNode } from 'react';

import closeModal from '../../../../assets/icon/close-modal.svg';

import styles from './booking-modal.module.scss';

type BookingModalProps = {
  isOpen: boolean;
  title: string;
  isRate?: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export const BookingModal: FC<BookingModalProps> = ({ isOpen, onClose, title, isRate, children }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return isOpen ? (
    <div aria-hidden={true} className={styles.modal} onClick={handleClick} data-test-id='modal-outer'>
      <div className={styles.modalWrap} data-test-id={isRate ? 'modal-rate-book' : 'booking-modal'}>
        <button data-test-id='modal-close-button' type='button' className={styles.modalClose} onClick={onClose}>
          <img src={closeModal} alt='closeModal' />
        </button>
        <h3 data-test-id='modal-title' className={styles.modalTitle}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  ) : null;
};
