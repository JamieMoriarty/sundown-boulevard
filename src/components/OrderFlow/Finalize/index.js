import React, { useState } from "react";

import { format } from "date-fns";

import Button from "../../../modules/Button/index";
import DateTimePicker from "./DateTimePicker/index";

import styles from "./Order.module.scss";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const dateFormat = "yyyy-MM-d'T'HH:mm";

const OrderScreen = ({ nextStep, updateOrder }) => {
  const [chosenDate, setChosenDate] = useState(undefined);
  const [numPeople, setNumPeople] = useState(1);
  const [email, setEmail] = useState("");

  const emailSetAndValid = () => {
    return email && validateEmail(email);
  };

  const progress = () => {
    if (!emailSetAndValid()) {
      return;
    }

    console.log("chosenDate", chosenDate);
    updateOrder({
      date: format(chosenDate, dateFormat),
      people: numPeople,
      email,
    });
    nextStep();
  };

  return (
    <div className={styles["order-screen"]}>
      <div className={styles["order-screen__content"]}>
        <h1 className={styles["order-screen__title"]}>Færdiggør bestilling!</h1>
        <div className={styles["order-screen__order-grid"]}>
          <div className={styles["order-screen__date-and-time"]}>
            <h2 className={styles["order-screen__section-title"]}>Vælg dato og tid</h2>
            <DateTimePicker date={chosenDate} setDate={setChosenDate} id="order-date-picker" name="order-date-picker" />
          </div>
          <div className={styles["order-screen__remain-order-details"]}>
            <h2 className={styles["order-screen__section-title"]}>Sidste ordre info</h2>
            <PeoplePicker people={numPeople} setPeople={setNumPeople} />
            <EmailInput email={email} setEmail={setEmail} error={!validateEmail(email)} />
          </div>
        </div>
        <Button className={styles["order-screen__button"]} onClick={progress}>
          Order
        </Button>
      </div>
    </div>
  );
};

const EmailInput = ({ email, setEmail, error }) => {
  return (
    <label htmlFor="order-screen__people-picker" className={styles["order-screen__label"]}>
      Indtast e-mail adresse:
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className={styles["order-screen__email-input"]}
        placeholder="Ex. jens.jensen@email.com"
      />
      {error && <p>Ikke valid e-mail!</p>}
    </label>
  );
};

const PeoplePicker = ({ people, setPeople }) => {
  return (
    <label htmlFor="order-screen__people-picker" className={styles["order-screen__label"]}>
      Vælg antal gæster:
      <div className={styles["order-screen__people-picker"]} id="order-screen__people-picker">
        <div
          className={`${styles["order-screen__people-picker__minus"]} ${
            people > 1 ? styles["order-screen__people-picker__minus--active"] : styles["order-screen__people-picker__minus--disabled"]
          }`}
          onClick={() => (people > 1 ? setPeople(people - 1) : "")}
        />
        {people}
        <div
          className={`${styles["order-screen__people-picker__plus"]} ${
            people < 10 ? styles["order-screen__people-picker__plus--active"] : styles["order-screen__people-picker__plus--disabled"]
          }`}
          onClick={() => (people < 10 ? setPeople(people + 1) : "")}
        />
      </div>
    </label>
  );
};

export default OrderScreen;
