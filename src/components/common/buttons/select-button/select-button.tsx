import { FC } from 'react';
import classNames from 'classnames';

import { Sorting } from '../../../../assets/icon/sorting';

import styles from './select-button.module.scss';

type SelectButtonProps = {
  onClick: () => void;
  isSort?: boolean;
};

export const SelectButton: FC<SelectButtonProps> = ({ onClick, isSort }) => (
  <div>
    <button data-test-id='sort-rating-button' className={styles.button} type='button' onClick={() => onClick()}>
      <Sorting
        className={classNames(styles.buttonIcon, {
          [styles.buttonIconUp]: isSort,
        })}
      />
      <span className={styles.buttonTitle}>По рейтингу</span>
    </button>
  </div>
);
