import React from "react";

import { parse, format } from "date-fns";

import styles from "./Receipt.module.scss";

const dateDisplayFormat = "do MMMM yyyy - HH:mm";
const dateParseFormat = "yyyy-MM-d'T'HH:mm";

const Receipt = ({ order }) => {
  return (
    <div className={styles["order-receipt"]}>
      <h1 className={styles["order-receipt__title"]}>Receipt!</h1>
      <h2 className={styles["order-receipt__section-title"]}>Order:</h2>
      <p className={styles["order-receipt__section-content"]}>
        <strong>Meal:</strong> {order.dish.strMeal}
      </p>
      <p className={styles["order-receipt__section-content"]}>
        <strong>Drinks:</strong> {order.drinks.map((beer) => beer.name).join(", ")}
      </p>
      <p className={styles["order-receipt__section-content"]}>
        <strong>Number of people:</strong> {order.details.people}
      </p>
      <h2 className={styles["order-receipt__section-title"]}>Time:</h2>
      <p className={styles["order-receipt__section-content"]}>{format(parse(order.details.date, dateParseFormat, new Date()), dateDisplayFormat)}</p>
    </div>
  );
};

export default Receipt;
