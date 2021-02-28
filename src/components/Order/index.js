import React, { useState } from "react";

import Button from "../../modules/Button/index";
import DateTimePicker from "./DateTimePicker/index";

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
            <DateTimePicker date={chosenDate} setDate={setChosenDate} id="order-date-picker" name="order-date-picker" />
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
