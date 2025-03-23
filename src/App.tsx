import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CurrencyConverter from './components/CurrencyConverter';

export default function App() {

  // declare react useStates here, and any variables to be passed down
  const [currency, setCurrency] = useState();

  // IN HERE, HANDLE LOGIC FOR CURRENCY CONVERSION.
  
  return (
    <>
    <CurrencyConverter />
    </>
  );
}
