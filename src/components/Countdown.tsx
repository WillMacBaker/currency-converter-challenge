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
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);


  return (
    <>
    <div>
      <p>BALLS BALLS BALLS OF STEEL</p>
    </div>
    </>
  )
}