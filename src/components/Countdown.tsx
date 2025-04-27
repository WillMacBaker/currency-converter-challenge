import { useEffect, useState } from 'react';
import { setTokenSourceMapRange } from 'typescript';
import { motion, AnimatePresence } from 'motion/react';

// Props
interface CountdownProps{
activeFlag: any
setActiveFlag: any
}


export default function Countdown({activeFlag, setActiveFlag}: CountdownProps){
  const [time, setTime] = useState(10);


  useEffect(() => {
    time > 0 && activeFlag === true && setTimeout(() => setTime(time - 1), 1000)
    if (time === 0){
      console.log("Timer has ended! Call a function to change timerFlag to hide this element and the currency conversion value")
      setActiveFlag(false)
    }
  },[time]);

  // Todo, add text padding to returned time element so you have a tasteful minutes and seconds addition
  // Todo, could also standardise this into just using the 'showCurrencyFlag'
  return (
    <AnimatePresence>
    { activeFlag &&
    <motion.div className="counter" exit={{opacity: 0}}>
      <p>
        
          Time left: {time}
        
      </p>
    </motion.div>
  }
    </AnimatePresence>
  );
}