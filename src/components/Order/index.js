import React, { useState } from "react";

import Button from "../../modules/Button/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { getDay, isAfter, setHours, getHours, setMinutes, getMinutes, isToday, addDays } from "date-fns";
import _ from "lodash";

import styles from "./Order.module.scss";

const OrderScreen = () => {
  const [chosenDate, setChosenDate] = useState(undefined);
  const [numPeople, setNumPeople] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <div className={styles["order-screen"]}>
      <div className={styles["order-screen__content"]}>
        <h1 className={styles["order-screen__title"]}>Færdiggør bestilling!</h1>
        <div className={styles["order-screen__order-grid"]}>
          <div className={styles["order-screen__date-and-time"]}>
            <h2 className={styles["order-screen__section-title"]}>Vælg dato og tid</h2>
            <OrderDatePicker date={chosenDate} setDate={setChosenDate} id="order-date-picker" name="order-date-picker" />
          </div>
          <div className={styles["order-screen__remain-order-details"]}>
            <h2 className={styles["order-screen__section-title"]}>Sidste ordre info</h2>
            <PeoplePicker people={numPeople} setPeople={setNumPeople} />
            <EmailInput email={email} setEmail={setEmail} />
          </div>
        </div>
        <Button className={styles["order-screen__button"]}>Order</Button>
      </div>
    </div>
  );
};

const EmailInput = ({ email, setEmail }) => {
  return (
    <label htmlFor="order-screen__people-picker" className={styles["order-screen__label"]}>
      Indtast e-mail adresse:
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className={styles["order-screen__email-input"]}
        placeholder="Ex. jens.jensen@email.example"
      />
    </label>
  );
};

const PeoplePicker = ({ people, setPeople }) => {
  return (
    <label htmlFor="order-screen__people-picker" className={styles["order-screen__label"]}>
      Vælg antal gæster:
      <div className={styles["order-screen__people-picker"]} id="order-screen__people-picker">
        <div
          className={`${styles["order-screen__people-picker__modifier"]} ${styles["order-screen__people-picker__modifier--minus"]}`}
          disabled={people <= 1}
          onClick={() => (people > 1 ? setPeople(people - 1) : "")}
        />
        {people}
        <div
          className={`${styles["order-screen__people-picker__modifier"]} ${styles["order-screen__people-picker__modifier--plus"]}`}
          disabled={people >= 10}
          onClick={() => (people < 10 ? setPeople(people + 1) : "")}
        />
      </div>
    </label>
  );
};

const OrderDatePicker = ({ date, setDate }) => {
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
      <label htmlFor="order-date-picker" className={styles["order-screen__label"]}>
        Vælg dato:
        <div className={styles["order-screen__date-picker"]} id="order-date-picker" name="order-date-picker">
          <DatePicker selected={selectedDate} onChange={(date) => setDate(date)} filterDate={filterPassedDate} placeholderText="Select a date" />
        </div>
      </label>
      <label htmlFor="order-time-picker" className={styles["order-screen__label"]}>
        Vælg Tid:
        <select
          value={getHours(selectedDate) + ":" + (getMinutes(selectedDate) || "00")}
          onChange={(event) => setTime(event.target.value)}
          className={styles["order-screen__time-picker"]}
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

export default OrderScreen;
