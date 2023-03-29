import { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import ArowDrop from '../../assets/icon/arrow-drop-down.svg';
import ArowDown from '../../assets/icon/icon-arrow-down.svg';
import ArowUp from '../../assets/icon/icon-arrow-up.svg';
import { checkDateIsEqual } from '../../utils/date/check-datei-equal';
import { checkIsToday } from '../../utils/date/checkls-today';
import { getAvailableBookingDates } from '../../utils/date/get-available-booking-dates';
import { getWeekDays } from '../../utils/date/get-week-days';

import { useCalendar } from './hooks/use-calendar';

import styles from './calendar.module.scss';

type CalendarProps = {
  locale?: string;
  selectedDate: Date | null;
  selectDate: (date: Date | null) => void;
  firstWeekDayNumber?: number;
};

export const Calendar: FC<CalendarProps> = ({
  locale = 'default',
  selectedDate: date,
  selectDate,
  firstWeekDayNumber = 2,
}) => {
  const { functions, state } = useCalendar({ locale, selectedDate: date, firstWeekDayNumber });
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const handleUserClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.calendar} data-test-id='calendar'>
      <div className={styles.calendarHeader}>
        <div data-test-id='month-select' className={styles.calendarHeaderLeftWrap} ref={ref}>
          <div aria-hidden={true} className={styles.calendarHeaderLeft} onClick={handleUserClick}>
            <div className={styles.calendarHeaderLeftTitle}>
              {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
            </div>
            <img src={ArowDrop} alt='ArowDrop' />
          </div>
          {isOpen && (
            <div className={styles.calendarHeaderMonth}>
              {state.monthesNames.map((monthesName) => {
                const isCurrentMonth =
                  new Date().getMonth() === monthesName.monthIndex && state.selectedYear === new Date().getFullYear();
                const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

                return (
                  <div
                    key={monthesName.month}
                    aria-hidden={true}
                    onClick={() => {
                      functions.setSelectedMonthByIndex(monthesName.monthIndex);
                      setIsOpen(!isOpen);
                    }}
                    className={classNames(styles.calendarHeaderMonthDay, {
                      [styles.calendarHeaderMonthDayActive]: isSelectedMonth,
                      [styles.calendarHeaderMonthDayCurrent]: isCurrentMonth,
                    })}
                  >
                    <div className={styles.calendarHeaderMonthDayList}>{monthesName.monthShort}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className={styles.calendarHeaderRight}>
          <button
            data-test-id='button-prev-month'
            className={styles.calendarHeaderArrow}
            onClick={() => functions.onClickArrow('left')}
            type='button'
          >
            <img src={ArowUp} alt='ArowUp' />
          </button>
          <button
            data-test-id='button-next-month'
            className={styles.calendarHeaderArrow}
            onClick={() => functions.onClickArrow('right')}
            type='button'
          >
            <img src={ArowDown} alt='ArowDown' />
          </button>
        </div>
      </div>

      <div className={styles.calendarMain}>
        {state.mode === 'days' && (
          <div>
            <div className={styles.calendarMainWeekNames}>
              {state.weekDaysNames.map((weekDaysName) => (
                <div className={styles.calendarMainWeekList} key={weekDaysName.dayShort}>
                  <div className={styles.calendarMainWeekListItem}>{weekDaysName.dayShort}</div>
                </div>
              ))}
            </div>
            <div className={styles.calendarMainDays}>
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
                const isWeekDay = getWeekDays(day.date) && day.monthIndex === state.selectedMonth.monthIndex;
                const isDeliveryActive = getAvailableBookingDates(day.date);
                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date) && isDeliveryActive;

                return (
                  <div
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    aria-hidden={true}
                    data-test-id='day-button'
                    onClick={() => {
                      functions.setSelectedDay(day);
                      selectDate(isDeliveryActive ? day.date : null);
                    }}
                    className={classNames(styles.calendarMainDay, {
                      [styles.calendarMainAdditionalDay]: isAdditionalDay,
                      [styles.calendarMainSelectedItem]: isSelectedDay && !!date,
                      [styles.calendarMainWeekItem]: isWeekDay,
                      [styles.calendarMainDeliv]: isDeliveryActive,
                      [styles.calendarMainTodayItem]: isToday,
                      [styles.calendarMainTodayItemWeek]: isToday && isWeekDay,
                    })}
                  >
                    {day.dayNumber}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
