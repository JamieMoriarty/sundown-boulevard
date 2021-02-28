import React, { useState } from "react";

import Steps from "../../modules/Steps/index";

import DishScreen from "./Dish";
import DrinksScreen from "./Drinks";
import FinalizeScreen from "./Finalize/index";

import { saveOrder } from "../../utils/storage";

const OrderFlow = () => {
  const [order, setOrder] = useState({});

  const updateOrder = (fieldName, part) => {
    const updatedOrder = { ...order, [fieldName]: part };

    return updatedOrder;
  };

  return (
    <Steps>
      <DishScreen updateOrder={(part) => setOrder(updateOrder("dish", part))} />
      <DrinksScreen updateOrder={(part) => setOrder(updateOrder("drinks", part))} />
      <FinalizeScreen
        updateOrder={(part) => {
          const updatedOrder = updateOrder("details", part);
          saveOrder(updatedOrder);
          setOrder(updatedOrder);
        }}
      />
    </Steps>
  );
};

export default OrderFlow;
