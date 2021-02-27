import React from "react";

import styles from "./Home.module.scss";

const HomeView = () => {
  return (
    <div className={`container ${styles["home"]}`}>
      <div className={`row ${styles["home__row"]}`}>
        <div className="col-8">
          <div className={styles["home__gallery"]}></div>
        </div>
        <div className="col-4">
          <div className={styles["home__order"]}></div>
        </div>
      </div>
      <div className={`row ${styles["home__row"]}`}>
        <div className="col-6">
          <div className={styles["home__find-order"]}></div>
        </div>
        <div className="col-6">
          <div className={styles["home__content-box"]}></div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
