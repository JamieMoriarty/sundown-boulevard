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
                  <img
                    src={apiData.strMealThumb}
                    alt={`Billede af retten ${apiData.strMeal}`}
                    className={styles["dish-screen__image"]}
                    style={{ maxWidth: "100%" }}
                  />
                  <h1>{apiData.strMeal}</h1>
                  {apiData.strTags && (
                    <React.Fragment>
                      <h2>Kategorier:</h2>
                      <p>
                        <ul>
                          {apiData.strTags.split(",").map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                      </p>
                    </React.Fragment>
                  )}
                  <h2>Ingredienser:</h2>
                  <p>{ingredientsString(apiData)}</p>
                </React.Fragment>
              ) : null}
            </div>
            <div className="col-4">
              <p>Er du tilfreds med den viste ret? Så gå videre til drinks valg!</p>
              <Button disabled={loading}>Videre</Button>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default DishScreen;
