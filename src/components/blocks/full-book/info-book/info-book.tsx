import { FC } from 'react';

import { Book } from '../../../../redux/fullBook/types';

import styles from './info-book.module.scss';

type InfoBookProps = {
  onDataInfo?: Book | null;
};

export const InfoBook: FC<InfoBookProps> = ({ onDataInfo }) => (
  <div className={styles.info}>
    <h3 className={styles.infoTitle}>Подробная информация</h3>
    <div className={styles.infoBorder} />
    <div className={styles.infoContent}>
      <div className={styles.infoLeft}>
        <div className={styles.infoWrapLeft}>
          <span className={styles.infoWrapFirst}>Издательство</span>
          <span className={styles.infoWrapFirst}>Год издания</span>
          <span className={styles.infoWrapFirst}>Страниц</span>
          <span className={styles.infoWrapFirst}>Переплёт</span>
          <span className={styles.infoWrapFirst}>Формат</span>
        </div>
        <div className={styles.infoWrapRight}>
          <span className={styles.infoWrapSecond}>{onDataInfo?.publish}</span>
          <span className={styles.infoWrapSecond}>{onDataInfo?.issueYear}</span>
          <span className={styles.infoWrapSecond}>{onDataInfo?.pages} </span>
          <span className={styles.infoWrapSecond}>{onDataInfo?.cover}</span>
          <span className={styles.infoWrapSecond}>{onDataInfo?.format}</span>
        </div>
      </div>
      <div className={styles.infoRight}>
        <div className={styles.infoWrapLeft}>
          <span className={styles.infoWrapFirst}>Жанр</span>
          <span className={styles.infoWrapFirst}>Вес</span>
          <span className={styles.infoWrapFirst}>ISBN</span>
          <span className={styles.infoWrapFirst}>Изготовитель</span>
        </div>
        <div className={styles.infoWrapRight}>
          <span className={styles.infoWrapSecond}>{onDataInfo?.categories}</span>
          <span className={styles.infoWrapSecond}>{onDataInfo?.weight} г.</span>
          <span className={styles.infoWrapSecond}>{onDataInfo?.ISBN}</span>
          <span className={styles.infoWrapSecond}>{onDataInfo?.producer}</span>
        </div>
      </div>
    </div>
  </div>
);
