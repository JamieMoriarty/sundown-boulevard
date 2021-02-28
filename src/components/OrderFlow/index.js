import React, { useState } from "react";

import Steps from "../../modules/Steps/index";

import DishScreen from "./Dish";
import DrinksScreen from "./Drinks";
import FinalizeScreen from "./Finalize/index";

const OrderFlow = () => {
  const [order, setOrder] = useState({});

  const updateOrder = (fieldName, part) => {
    const updatedOrder = { ...order, [fieldName]: part };

    console.log("order", updatedOrder);
    setOrder(updatedOrder);
  };

  return (
    <Steps>
      <DishScreen updateOrder={(part) => updateOrder("dish", part)} />
      <DrinksScreen updateOrder={(part) => updateOrder("drinks", part)} />
      <FinalizeScreen updateOrder={(part) => updateOrder("details", part)} />
    </Steps>
  );
};

export default OrderFlow;
