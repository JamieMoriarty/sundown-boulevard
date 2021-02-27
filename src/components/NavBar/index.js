import React from "react";

import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <nav className={styles["navbar"]}>
      <div className={styles["navbar__content"]}>
        <div className={`${styles["navbar__items"]} row`}>
          <div className="col-2">
            <span className={styles["navbar__logo"]}>Logo!</span>
          </div>
          <div className="col-2">
            <span className={styles["navbar__item"]}>Restauranter</span>
          </div>
          <div className="col-2">
            <span className={styles["navbar__item"]}>Produkter</span>
          </div>
          <div className="col-2">
            <span className={styles["navbar__item"]}>Nyhedsbrev</span>
          </div>
          <div className="col-2">
            <span className={styles["navbar__item"]}>Kontakt</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
