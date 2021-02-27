import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDay, getHours, isAfter } from "date-fns";
import Button from "../../modules/Button/index";

import styles from "./Order.module.scss";

const OrderScreen = () => {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [numPeople, setNumPeople] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <div className={styles["order-screen"]}>
      <h1 className={styles["order-screen__title"]}>Færdiggør bestilling!</h1>
      <div className="row">
        <div className="col-4">
          <OrderDatePicker date={chosenDate} setDate={setChosenDate} />
        </div>
        <div className="col-8">
          <PeoplePicker people={numPeople} setPeople={setNumPeople} />
          <EmailInput email={email} setEmail={setEmail} />
        </div>
      </div>
      <Button className={styles["order-screen__button"]}>Order</Button>
    </div>
  );
};

const EmailInput = ({ email, setEmail }) => {
  return <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />;
};

const PeoplePicker = ({ people, setPeople }) => {
  return (
    <div className={styles["order-screen__people-picker"]}>
      <div
        className={`${styles["order-screen__people-picker__modifier"]} ${styles["order-screen__people-picker__modifier--minus"]}`}
        disabled={people <= 1}
        onClick={() => setPeople(people - 1)}
      />
      {people}
      <div
        className={`${styles["order-screen__people-picker__modifier"]} ${styles["order-screen__people-picker__modifier--plus"]}`}
        disabled={people >= 10}
        onClick={() => setPeople(people + 1)}
      />
    </div>
  );
};

const OrderDatePicker = ({ date, setDate }) => {
  const filterPassedDate = (selectedDate) => {
    const isWeekday = (date) => {
      const day = getDay(date);
      return day !== 0 && day !== 6;
    };

    return isWeekday(selectedDate) && isAfter(selectedDate, new Date());
  };

  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return isAfter(selectedDate, currentDate) && 16 <= getHours(selectedDate) && getHours(selectedDate) < 23;
  };

  return (
    <div className={styles["order-screen__date-picker"]}>
      <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        filterDate={filterPassedDate}
        showTimeSelect
        filterTime={filterPassedTime}
        placeholderText="Select a time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </div>
  );
};

export default OrderScreen;
