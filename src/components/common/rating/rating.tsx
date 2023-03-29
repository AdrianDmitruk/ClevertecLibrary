import { FC, useState } from 'react';
import classNames from 'classnames';

import { Star } from '../../../assets/icon/star';

import styles from './rating.module.scss';

type RatingProps = {
  className?: string;
  number?: boolean;
  gap?: boolean;
  count?: number;
  isNotRating?: boolean;
  onSelectedRateChange?: (rate: number | undefined) => void;
};

const possibleRates = [1, 2, 3, 4, 5];

export const Rating: FC<RatingProps> = (props) => {
  const { className, number, gap, count, isNotRating, onSelectedRateChange } = props;

  const [selectedRate, setSelectedRate] = useState<null | number | undefined>(count);
  const [hoverRate, setHoverRate] = useState<null | number>(null);

  return (
    <div className={styles.wrap}>
      <div data-test-id='rating' className={gap ? styles.starGap : styles.star}>
        {possibleRates.map((rate) => (
          <div key={rate} data-test-id='star'>
            <div data-test-id={rate <= (selectedRate ?? 0) && 'star-active'}>
              <Star
                className={classNames(styles.starIcon, className, {
                  [styles.starIconSelect]: rate <= (selectedRate ?? 0),
                  [styles.starIconHover]: rate <= (hoverRate ?? 0),
                })}
                onClick={() => {
                  setSelectedRate(rate);
                  if (onSelectedRateChange) {
                    onSelectedRateChange(rate ?? 0);
                  }
                }}
                onMouseEnter={() => {
                  setHoverRate(rate);
                  setSelectedRate(null);
                }}
                onMouseLeave={() => setHoverRate(count ?? 0)}
              />
            </div>
          </div>
        ))}
      </div>
      {number && <span className={styles.starNumber}>{count}</span>}
      {isNotRating && <span className={styles.starNotRating}>ещё нет оценок</span>}
    </div>
  );
};
