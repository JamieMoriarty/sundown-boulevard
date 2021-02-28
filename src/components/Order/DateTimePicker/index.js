import React from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { getDay, isAfter, setHours, getHours, setMinutes, getMinutes, isToday, addDays } from "date-fns";
import _ from "lodash";

import styles from "./DateTimePicker.module.scss";

const DateTimePicker = ({ date, setDate }) => {
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  const availableTimesFrom = ([startHour, startMinute]) => {
    if (startHour && startHour >= 23) {
      return [];
    }

    const hourOptions = _.range(startHour && startHour >= 16 ? startHour : 16, 23);
    return hourOptions.reduce(
      (acc, val, index) => (index === 0 && startMinute ? [...acc, val + ":" + startMinute] : [...acc, val + ":00", val + ":30"]),
      []
    );
  };

  const choiceOrFirstPossible = () => {
    if (date) {
      return date;
    }

    let firstPossibleDay = new Date();

    //If no available times today, tomorrow is the earliest
    if (availableTimesFrom([getHours(firstPossibleDay), getMinutes(firstPossibleDay)]).length === 0) {
      firstPossibleDay = addDays(firstPossibleDay, 1);
    }

    // Go for first weekday after last update
    firstPossibleDay = isWeekday(firstPossibleDay)
      ? firstPossibleDay
      : isWeekday(addDays(firstPossibleDay, 1))
      ? addDays(firstPossibleDay, 1)
      : addDays(firstPossibleDay, 2);

    return firstPossibleDay;
  };

  const selectedDate = choiceOrFirstPossible();
  console.log("selectedDate", selectedDate);
  const filterPassedDate = (selectedDate) => {
    return isWeekday(selectedDate) && isAfter(selectedDate, new Date());
  };

  const getDateTimeChoice = (date, givenTime) => {
    const time = givenTime || availableTimesFrom([getHours(date), getMinutes(date)])[0];
    console.log("time", time);
    const [hour, minute] = time.split(":");

    const dateWithHour = setHours(selectedDate, hour);
    const dateWithMinutes = setMinutes(dateWithHour, minute);

    return dateWithMinutes;
  };

  const setTime = (time) => setDate(getDateTimeChoice(selectedDate, time));

  const timeRange = () => {
    const isDateToday = isToday(selectedDate);
    const earliestHour = getMinutes(selectedDate) > 30 ? getHours(selectedDate) + 1 : getHours(selectedDate);
    const earliestMinute = getMinutes(selectedDate) > 30 ? 0 : 30;

    return isDateToday && earliestHour < 23 ? availableTimesFrom([earliestHour, earliestMinute]) : availableTimesFrom([null, null]);
  };

  return (
    <React.Fragment>
      <label htmlFor="order-date-picker" className={styles["date-time-picker__label"]}>
        Vælg dato:
        <div className={styles["date-time-picker__date-picker"]} id="order-date-picker" name="order-date-picker">
          <DatePicker selected={selectedDate} onChange={(date) => setDate(date)} filterDate={filterPassedDate} placeholderText="Select a date" />
        </div>
      </label>
      <label htmlFor="order-time-picker" className={styles["date-time-picker__label"]}>
        Vælg Tid:
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
};

export default DateTimePicker;
