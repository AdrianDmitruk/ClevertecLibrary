import { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { Clean } from '../../../assets/icon/clean';
import { Search } from '../../../assets/icon/search';
import { selectFilterData } from '../../../redux/filter/selectors';
import { setSearchValue } from '../../../redux/filter/slice';
import { useAppDispatch } from '../../../redux/store';

import styles from './search-input.module.scss';

type SearchInputProps = {
  placeholder?: string;
  updateData: (value: string) => void;
};

export const SearchInput: FC<SearchInputProps> = (props) => {
  const { placeholder, updateData } = props;

  const [value, setValue] = useState('');
  const [isFocusSearch, setIsFocusSearch] = useState('clear');
  const inputRef = useRef<HTMLInputElement>(null);

  const { searchValue } = useSelector(selectFilterData);

  const dispatch = useAppDispatch();

  const onClickClear = () => {
    setValue('');
    inputRef.current?.focus();
    setIsFocusSearch('clear');
    updateData(isFocusSearch);
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(setSearchValue(event.target.value));
  };

  return (
    <div className={styles.searchWrap}>
      <button
        data-test-id='button-search-open'
        type='button'
        onClick={() => {
          setIsFocusSearch('wisible');
          updateData(isFocusSearch);
        }}
        className={classNames(styles.btnMobile, {
          [styles.btnMobileNot]: isFocusSearch === 'wisible',
        })}
      >
        <Search className={styles.btnMobileIcon} />
      </button>
      <button
        type='button'
        className={classNames(styles.search, {
          [styles.searchFocus]: isFocusSearch === 'clear',
          [styles.searchFocusWidth]: isFocusSearch === 'wisible',
        })}
      >
        <Search
          className={classNames(styles.searchIcon, {
            [styles.searchIconNon]: isFocusSearch === 'wisible',
            [styles.searchIconFocus]: value,
          })}
        />

        <input
          type='text'
          placeholder={placeholder}
          className={classNames(styles.searchInput, {
            [styles.searchInputFocusMob]: isFocusSearch,
            [styles.searchInputFocusMobT]: isFocusSearch === 'clear',
          })}
          onChange={onChangeInput}
          ref={inputRef}
          defaultValue={searchValue}
          data-test-id='input-search'
        />
      </button>
      <button
        className={classNames(styles.btnClean, {
          [styles.btnCleanClear]: isFocusSearch === 'clear',
        })}
        type='button'
        data-test-id='button-search-close'
        onClick={onClickClear}
      >
        <Clean className={styles.Clean} onClick={onClickClear} />
      </button>
    </div>
  );
};
