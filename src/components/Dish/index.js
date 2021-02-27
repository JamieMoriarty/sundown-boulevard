import React, { useEffect, useState } from "react";
import Button from "../../modules/Button";

import styles from "./Dish.module.scss";

const ingredientsString = (apiData) => {
  const ingredients = Object.keys(apiData)
    .filter((key) => key.includes("Ingredient"))
    .map((key) => apiData[key])
    .filter((ingredient) => !!ingredient);

  return ingredients.join(", ");
};

const DishScreen = () => {
  const [apiData, setApiData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    let dataCanBeSet = true;
    const fetchDish = async () => {
      setApiData(undefined);
      setLoading(true);
      setError(undefined);
      let jsonResponse = undefined;

      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        jsonResponse = await res.json();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }

      if (dataCanBeSet && jsonResponse) {
        setApiData(jsonResponse.meals[0]);
      }
    };

    fetchDish();
    return () => (dataCanBeSet = false);
  }, []);

  return (
    <div className={styles["dish-screen"]}>
      <div className="row">
        {error ? <p>Der skete desværre en fejl :(</p> : null}
        {!error ? (
          <React.Fragment>
            <div className="col-8">
              {loading ? <p>Henter data...</p> : null}
              {!loading && apiData ? (
                <React.Fragment>
                  {apiData.strMealThumb && (
                    <img
                      src={apiData.strMealThumb}
                      alt={`Billede af retten ${apiData.strMeal}`}
                      className={styles["dish-screen__image"]}
                      width="350"
                      height="350"
                    />
                  )}
                  <h1 className={styles["dish-screen__dish-title"]}>{apiData.strMeal}</h1>
                  {apiData.strTags && (
                    <React.Fragment>
                      <h2 className={styles["dish-screen__section-heading"]}>Kategorier:</h2>
                      <p className={styles["dish-screen__section-content"]}>
                        <ul className="row">
                          {apiData.strTags.split(",").map((tag) => (
                            <li key={tag} className="col-4">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </p>
                    </React.Fragment>
                  )}
                  <h2 className={styles["dish-screen__section-heading"]}>Ingredienser:</h2>
                  <p className={styles["dish-screen__section-content"]}>{ingredientsString(apiData)}</p>
                </React.Fragment>
              ) : null}
            </div>
            <div className="col-4">
              <div className={styles["dish-screen__next-module"]}>
                <p>Er du tilfreds med den viste ret? Så gå videre til drinks valg!</p>
                <Button disabled={loading}>Videre</Button>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default DishScreen;
