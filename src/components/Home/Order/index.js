import React from "react";

import styles from "./Order.module.scss";

const Order = () => {
  return (
    <section className={styles["order"]}>
      <h1 className={styles["order__title"]}>Bestil mad!</h1>
      <p className={styles["order__description"]}>Vælg en ret, drikkevarer, antal spisende gæster og leveringstidspunkt og så klarer vi resten!</p>
      <button className={styles["order__button"]}>Bestil</button>
    </section>
  );
};

export default Order;
