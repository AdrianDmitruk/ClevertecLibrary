import { FC, useMemo } from 'react';
import classNames from 'classnames';

import { HOST_ENDPOINT } from '../../../../api/endpoint';
import avtar from '../../../../assets/content/avatat-comment.png';
import { Comments } from '../../../../redux/fullBook/types';
import { formatDateComment } from '../../../../utils/date/format-date-comment';
import { Rating } from '../../../common/rating';

import styles from './comment-book.module.scss';

type CommentBookProps = {
  isFocus?: boolean;
  onDataComments?: Comments | null;
};

export const CommentBook: FC<CommentBookProps> = ({ isFocus, onDataComments }) => {
  const sortedComments = useMemo(
    () =>
      (onDataComments &&
        [...onDataComments].sort((a, b) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime())) ??
      [],
    [onDataComments]
  );

  return (
    <div className={classNames(isFocus ? styles.commentHiden : styles.comment)}>
      {sortedComments?.map((elem) => (
        <div data-test-id='comment-wrapper' className={styles.commentWrap} key={elem.id}>
          <div className={styles.commentProfile}>
            <img
              className={styles.commentImg}
              src={elem.user.avatarUrl ? `${HOST_ENDPOINT}${elem.user.avatarUrl}` : avtar}
              alt='avatar'
            />

            <div className={styles.commentNameWrap}>
              <div className={styles.commentName} data-test-id='comment-author'>
                {elem.user.firstName} {elem.user.lastName}
              </div>
              <div data-test-id='comment-date' className={styles.commentTime}>
                {formatDateComment(new Date(elem.createdAt))}
              </div>
            </div>
          </div>
          {elem.rating && (
            <Rating data-test-id='rating' className={styles.commentStar} count={elem.rating} number={!!elem.rating} />
          )}
          <p data-test-id='comment-text' className={styles.commentText}>
            {elem.text}
          </p>
        </div>
      ))}
    </div>
  );
};
