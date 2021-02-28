import React, { useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { getDay, isAfter, setHours, getHours, setMinutes, getMinutes, isToday, addDays } from "date-fns";
import _ from "lodash";

import styles from "./DateTimePicker.module.scss";

const availableTimesFrom = ([startHour = 14, startMinute = 0] = []) => {
  const earliestHour = startMinute >= 30 ? startHour + 1 : startHour;
  const earliestMinute = startMinute >= 30 ? 0 : 30;
  if (earliestHour >= 23) {
    return [];
  }

  const hourOptions = _.range(earliestHour >= 16 ? earliestHour : 16, 23);
  return hourOptions.reduce(
    (acc, val, index) =>
      index === 0 && earliestMinute > 0 ? [...acc, val + ":" + (earliestMinute > 0 ? "30" : "00")] : [...acc, val + ":00", val + ":30"],
    []
  );
};

const isWeekday = (date) => {
  const day = getDay(date);
  return day !== 0 && day !== 6;
};

const DateTimePicker = ({ date, setDate }) => {
  //If date not chosen, choose first possible next date:
  useEffect(() => {
    if (!date) {
      let firstPossibleDay = new Date();

      //If no available times today, tomorrow is the earliest
      if (availableTimesFrom([getHours(firstPossibleDay), getMinutes(firstPossibleDay)]).length === 0) {
        firstPossibleDay = addDays(firstPossibleDay, 1);
      }

      // Go for first next weekday, if not already
      firstPossibleDay = isWeekday(firstPossibleDay)
        ? firstPossibleDay
        : isWeekday(addDays(firstPossibleDay, 1))
        ? addDays(firstPossibleDay, 1)
        : addDays(firstPossibleDay, 2);

      const [hours, minutes] = availableTimesFrom([getHours(firstPossibleDay), getMinutes(firstPossibleDay)])[0].split(":");

      firstPossibleDay = setHours(firstPossibleDay, hours);
      firstPossibleDay = setMinutes(firstPossibleDay, minutes);

      setDate(firstPossibleDay);
    }
  }, []);

  const selectedDate = date;

  const filterPassedDate = (selectedDate) => {
    return isWeekday(selectedDate) && isAfter(selectedDate, new Date());
  };

  const setTime = (time) => {
    const [hour, minute] = time.split(":");

    const dateWithHour = setHours(selectedDate, hour);
    const dateWithMinutes = setMinutes(dateWithHour, minute);

    setDate(dateWithMinutes);
  };

  const timeRange = () => {
    const isDateToday = isToday(selectedDate);
    const availableTimes = availableTimesFrom([getHours(selectedDate), getMinutes(selectedDate)]);

    return isDateToday && availableTimes.length > 0 ? availableTimes : availableTimesFrom([0, 0]);
  };

  if (date) {
    return (
      <React.Fragment>
        <label htmlFor="order-date-picker" className={styles["date-time-picker__label"]}>
          Pick date
          <div className={styles["date-time-picker__date-picker"]} id="order-date-picker" name="order-date-picker">
            <DatePicker selected={selectedDate} onChange={(date) => setDate(date)} filterDate={filterPassedDate} placeholderText="Select a date" />
          </div>
        </label>
        <label htmlFor="order-time-picker" className={styles["date-time-picker__label"]}>
          Pick time
          <select
            value={getHours(selectedDate) + ":" + (getMinutes(selectedDate) || "00")}
            onChange={(event) => setTime(event.target.value)}
            className={styles["date-time-picker__time-picker"]}
            id="order-time-picker"
            name="order-time-picker"
          >
            {timeRange().map((time) => (
              <option key={`time-picker__${time}`}>{time}</option>
            ))}
          </select>
        </label>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default DateTimePicker;
