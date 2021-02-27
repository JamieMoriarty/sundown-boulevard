import React from "react";

import styles from "./Home.module.scss";
import ContentBox from "./ContentBox/index";
import FindOrder from "./FindOrder/index";
import Gallery from "./Gallery/index";
import Order from "./Order/index";

const HomeView = () => {
  return (
    <div className={`container ${styles["home"]}`}>
      <div className={`row ${styles["home__row"]}`}>
        <div className="col-8">
          <Gallery />
        </div>
        <div className="col-4">
          <Order />
        </div>
      </div>
      <div className={`row ${styles["home__row"]}`}>
        <div className="col-6">
          <FindOrder />
        </div>
        <div className="col-6">
          <ContentBox />
        </div>
      </div>
    </div>
  );
};

export default HomeView;
