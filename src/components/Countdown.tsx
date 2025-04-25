import styled from 'styled-components'

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { EventEmitter } from 'stream';
import {AiOutlineSwap} from "react-icons/ai"
import React from 'react';

// Props
interface CountdownProps{
    stateVar?: any
    setStateVar?: any
}

// https://www.freecodecamp.org/news/build-a-countdown-timer-with-react-step-by-step/
export default function Countdown({stateVar, setStateVar}: CountdownProps){
  const [time, setTime] = useState(10);

// THIS IS BASIC BUT WORKS, CHECK OUT FIXING PADDING EFFORT AND CHECKING OUT SETINTERVAL IN GREATER DETAIL

  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  return (
    <div className="App">
      <p>
        Time left: {`${Math.floor(time / 60)}`.padStart(2, 0)}:
        {`${time % 60}`.padStart(2, 0)}
      </p>
    </div>
  );
}