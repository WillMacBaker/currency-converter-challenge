import React, { useState } from 'react';
import './App.css';
import CurrencyConverter from './components/CurrencyConverter';
import TastefulSVGRectangle from './components/UI/TastefulSVGRectangle';

export default function App() {

  // declare react useStates here, and any variables to be passed down


  // IN HERE, HANDLE LOGIC FOR CURRENCY CONVERSION.
  
  return (
    <>
    <div className="wrapper-layer">
      <div className="content-layer">
        <CurrencyConverter />
      </div>
      <div className="background-layer">
        <TastefulSVGRectangle primaryColor='#f1ac88' xCoord='-150' yCoord='0' rotateVector='rotate(-45)'/>
      </div>
    </div>
    </>
  );
}