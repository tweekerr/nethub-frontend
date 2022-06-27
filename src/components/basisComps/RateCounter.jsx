import React from 'react';
import SvgSelector from "./SvgSelector/SvgSelector";
import {useState} from "react";
import classes from "./basicComps.module.scss"

const RateCounter = () => {

    let coloredCounter = document.querySelector(".coloredCounter")

    const [counter, setCounter] = useState(0);
    const plusCounter = (e)=>{
        e.preventDefault()
        setCounter(counter + 1)
    }
    const minusCounter = (e)=>{
        e.preventDefault()
        setCounter(counter - 1)
    }

    if(counter>0){
        coloredCounter.style.color = "#0CA312";
    }else if(counter<0){
        coloredCounter.style.color = "#F50000";
    }



    return (
        <div className={classes.rateCounter}>
            <button onClick = {plusCounter}>
                <SvgSelector id={"ArrowUp"}/>
            </button>

            <p className="coloredCounter" >{counter}</p>
            <button onClick = {minusCounter}>
                <SvgSelector id = {"ArrowDown"}/>
            </button>
        </div>
    );
};

export default RateCounter;
