import React from "react";

import Button from "../../modules/Button/index";

import styles from "./Drinks.module.scss";
import mockData from "./mockdata.json";

const DrinksScreen = () => {
  return (
    <div className={styles["drinks-screen"]}>
      <div className="row">
        <div className="col-8">
          <div className="row">
            {mockData.map((beer) => (
              <div className="col-6" key={beer.id}>
                <div className={styles["drinks-screen__beer"]}>
                  <img src={beer.image_url} alt="" className={styles["drinks-screen__beer__image"]} />
                  <p>{beer.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-4">
          <div className={styles["dish-screen__next-module"]}>
            <p>Er du tilfreds dine drinks valg? Så gå videre til tidsbestilling!</p>
            <Button>Videre</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinksScreen;
