import { FC } from 'react';
import classNames from 'classnames';

import { List } from '../../../../assets/icon/list';
import { Tile } from '../../../../assets/icon/tile';

import styles from './check-button.module.scss';

type CheckButtonProps = {
  icon?: 'block' | 'list';
  onClick?: () => void;
  active?: boolean;
};

export const CheckButton: FC<CheckButtonProps> = (props) => {
  const { icon, onClick, active } = props;

  return (
    <div>
      {icon === 'block' ? (
        <button
          data-test-id='button-menu-view-window'
          className={classNames(styles.button, {
            [styles.buttonActive]: active,
          })}
          type='button'
          onClick={onClick}
        >
          <Tile
            className={classNames(styles.buttonIcon, {
              [styles.buttonIconActive]: active,
            })}
          />
        </button>
      ) : (
        <button
          data-test-id='button-menu-view-list'
          className={classNames(styles.button, {
            [styles.buttonActive]: active,
          })}
          type='button'
          onClick={onClick}
        >
          {icon === 'list' && (
            <List
              className={classNames(styles.buttonIcon, {
                [styles.buttonIconActive]: active,
              })}
            />
          )}
        </button>
      )}
    </div>
  );
};
