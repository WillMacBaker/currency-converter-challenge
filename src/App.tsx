import React, { useState } from 'react';
import './App.css';
import CurrencyConverter from './components/CurrencyConverter';
import TastefulSVGRectangle from './components/UI/TastefulSVGRectangle';

export default function App() {

  // declare react useStates here, and any variables to be passed down
  const [currency, setCurrency] = useState();

  // IN HERE, HANDLE LOGIC FOR CURRENCY CONVERSION.
  
  return (
    <>
    <CurrencyConverter />
    <TastefulSVGRectangle primaryColor='#f1ac88' xCoord='-150' yCoord='0' rotateVector='rotate(-45)'/>
    </>
  );
}
