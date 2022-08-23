import React, {FC} from 'react';
import SvgSelector from "./SvgSelector/SvgSelector";
import {useState} from "react";
import classes from "./ВasicComps.module.scss"

const RateCounter: FC = () => {

  //TODO: ASK

  // const coloredCounter = document.querySelector(".coloredCounter")
  // if (counter > 0) {
  //   coloredCounter?.style?.color = "#0CA312";
  // } else if (counter < 0) {
  //   coloredCounter?.style?.color = "#F50000";
  // }

  const [counter, setCounter] = useState(0);

  const plusCounter = (e: React.MouseEvent) => {
    e.preventDefault()
    setCounter(counter + 1)
  }
  const minusCounter = (e: React.MouseEvent) => {
    e.preventDefault()
    setCounter(counter - 1)
  }

  return (
    <div className={classes.rateCounter}>
      <button onClick={plusCounter}>
        <SvgSelector id={"ArrowUp"}/>
      </button>

      <p className={counter > 0 ? classes.counterPositive : classes.counterNegative}>{counter}</p>
      <button onClick={minusCounter}>
        <SvgSelector id={"ArrowDown"}/>
      </button>
    </div>
  );
};

export default RateCounter;
