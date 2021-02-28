import React from "react";
import { useHistory } from "react-router-dom";

import Button from "../../../modules/Button";

import styles from "./Order.module.scss";

const Order = () => {
  const history = useHistory();

  return (
    <section className={styles["order"]}>
      <h1 className={styles["order__title"]}>Order food!</h1>
      <p className={styles["order__description"]}>Choose a dish, drinks, number of guests and time and we'll do the rest!</p>
      <Button
        className={styles["order__button"]}
        onClick={() => {
          history.push("/order");
        }}
      >
        Bestil
      </Button>
    </section>
  );
};

export default Order;
