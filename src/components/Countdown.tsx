import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styled from 'styled-components';

// Props
interface CountdownProps{
activeFlag: any
setActiveFlag: any
}

const TimerContainer = styled(motion.div)`
  align-content: center;
  width: 190px;
  max-width: 100%;
  font-family: monospace;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  border: 4px solid #000;
  box-shadow: 5px 5px 0 #000, 10px 10px 0 #E8793F;
`


export default function Countdown({activeFlag, setActiveFlag}: CountdownProps){
  const [time, setTime] = useState(10);
  const [timeStamp, setTimeStamp] = useState(Date.now());



  useEffect(() => {
    let intervalID: any
    // If showimg.
    if (activeFlag === true){
      // Set an interval to trigger every 10 milliseconds
      intervalID = setInterval(() => {

        const now = Date.now();
        const deltaTime = now - timeStamp;
        setTime(Math.max(time-deltaTime / 1000, 0));
        setTimeStamp(now);
        if (time <= 0){
          console.log("Timer has ended! Call a function to change timerFlag to hide this element and the currency conversion value")
          setActiveFlag(false)
          clearInterval(intervalID)
        }
      }, 10); // Update the interval every 10milliseconds
    }

    return () => {
      clearInterval(intervalID)
    };

  },[activeFlag, time]);

  const formattedTime = `${Math.floor(time % 60)}:${(time % 1 * 1000).toFixed(0)}`; 
  // Format seconds and milliseconds

  const formattedSeconds = `${Math.floor(time % 60)}`;
  const formattedMilliseconds = `${(time % 1 * 1000).toFixed(0)}`;


  return (
    <AnimatePresence>
    { activeFlag &&
    <motion.div className="counter" exit={{opacity: 0}}>
      <TimerContainer>
          Expires in: {formattedSeconds}"{formattedMilliseconds}'
      </TimerContainer>
    </motion.div>
  }
    </AnimatePresence>
  );
}