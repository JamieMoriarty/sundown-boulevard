import React, { useState, useEffect } from "react";

import Button from "../../modules/Button/index";

import styles from "./Drinks.module.scss";

const DrinksScreen = () => {
  const [apiData, setApiData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [selectedDrinks, setSelectedDrinks] = useState([]);

  const drinksIndex = (id) => selectedDrinks.findIndex((drinkId) => drinkId === id);
  const isSelected = (id) => drinksIndex(id) >= 0;
  const toggleDrinkSelected = (id) => {
    const updatedDrinksList =
      drinksIndex(id) >= 0 ? [...selectedDrinks.slice(0, drinksIndex(id)), ...selectedDrinks.slice(drinksIndex(id) + 1)] : [...selectedDrinks, id];

    setSelectedDrinks(updatedDrinksList);
  };

  useEffect(() => {
    let dataCanBeSet = true;
    const fetchDrinks = async () => {
      setApiData(undefined);
      setLoading(true);
      setError(undefined);
      let jsonResponse = undefined;

      try {
        const res = await fetch("https://api.punkapi.com/v2/beers");
        jsonResponse = await res.json();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }

      if (dataCanBeSet && jsonResponse) {
        setApiData(jsonResponse);
      }
    };

    fetchDrinks();
    return () => (dataCanBeSet = false);
  }, []);

  const canProceed = selectedDrinks.length > 0;

  return (
    <div className={styles["drinks-screen"]}>
      <div className="row">
        <div className="col-8">
          <div className="row">
            {!loading &&
              !error &&
              apiData &&
              apiData.map((beer) => (
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
