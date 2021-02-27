import React, { useState } from "react";

import Button from "../../modules/Button/index";

import styles from "./Drinks.module.scss";
import mockData from "./mockdata.json";

const DrinksScreen = () => {
  const [selectedDrinks, setSelectedDrinks] = useState([]);

  const drinksIndex = (id) => selectedDrinks.findIndex((drinkId) => drinkId === id);
  const isSelected = (id) => drinksIndex(id) >= 0;
  const toggleDrinkSelected = (id) => {
    const updatedDrinksList =
      drinksIndex(id) >= 0 ? [...selectedDrinks.slice(0, drinksIndex(id)), ...selectedDrinks.slice(drinksIndex(id) + 1)] : [...selectedDrinks, id];

    setSelectedDrinks(updatedDrinksList);
  };

  const canProceed = selectedDrinks.length > 0;

  return (
    <div className={styles["drinks-screen"]}>
      <div className="row">
        <div className="col-8">
          <div className="row">
            {mockData.map((beer) => (
              <div className="col-6" key={beer.id}>
                <div
                  className={`${styles["drinks-screen__beer"]} ${isSelected(beer.id) ? styles["drinks-screen__beer--selected"] : ""}`}
                  onClick={() => toggleDrinkSelected(beer.id)}
                >
                  <img src={beer.image_url} alt="" className={styles["drinks-screen__beer__image"]} height="130" />
                  <p className={styles["drinks-screen__beer__name"]}>{beer.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-4">
          <div className={styles["drinks-screen__next-module"]}>
            <p>Er du tilfreds dine drinks valg? Så gå videre til tidsbestilling!</p>
            <Button disabled={!canProceed}>Videre</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinksScreen;
