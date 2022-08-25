import React, {FC} from 'react';
import SvgSelector from "./SvgSelector/SvgSelector";
import {useState} from "react";
import classes from "./ВasicComps.module.scss"

const RateCounter: FC = () => {

  const [counter, setCounter] = useState(0);

  const plusCounter = () => {
    setCounter((previous) => previous + 1)
  }
  const minusCounter = () => {
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
