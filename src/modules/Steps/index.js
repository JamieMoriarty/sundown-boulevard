import React, { useState } from "react";

const Steps = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const nextStep = () => (activeStep < children.length ? setActiveStep(activeStep + 1) : "");
  const childrenWithProps = React.Children.map(children, (child) => React.cloneElement(child, { nextStep }));
  return <div>{childrenWithProps[activeStep]}</div>;
};

export default Steps;
