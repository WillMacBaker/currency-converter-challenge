import styled from 'styled-components'

import {  useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { EventEmitter } from 'stream';

interface SearchbarProps {
  currencyCount: number,
  setCurrencyCount: Function
}


const StyledButton= styled(motion.button)`
  margin-top: 1rem;
  position: relative;
  
  width: 250px;
  font-family: monospace;
  width: 250px;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  border: 4px solid #000;
  position: relative;
  border-radius: 30px;
  outline: none;
  box-shadow: 5px 5px 0 #000, 10px 10px 0 #E8793F;

  &:hover {
    background-color: #4a90e2;
    color: #fff;
  }
  // When button has been clicked
  &:active {
    transform: translate(3px, 3px);
    box-shadow: 5px 5px 0 #E8793F;
  }

`

const StyledInput = styled.input`
  position: relative;
  padding: 1rem;
  margin: 1rem;
  width: 250px;
  font-family: monospace;
  width: 250px;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  border: 4px solid #000;
  position: relative;
  box-shadow: 5px 5px 0 #000, 10px 10px 0 #E8793F;
`

const StyledSelect = styled.select`
  position: relative;
  padding: 1rem;
  margin: 1rem;
  width: 250px;
  font-family: monospace;
  width: 250px;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  border: 4px solid #000;
  position: relative;
  box-shadow: 5px 5px 0 #000, 10px 10px 0 #E8793F;
`

const CurrencyItemDiv = styled(motion.div)`
  display: flex;
`

const CurrencyReturnDiv = styled(motion.div)`
  .custom-pattern {
	background-image: repeating-linear-gradient(45deg, transparent, transparent 80px, #1A8FE5 80px, #1A8FE5 160px);
	background-color: #E4E4ED;
}
`

const EXCHANGE_API_KEY = process.env.REACT_APP_EXCHANGE_RATE_KEY

export default function CurrencyConverter() {
  const [currencyData, setCurrencyData] = useState<any>({})
  const [selectedCountry, setSelectedCountry] = useState("USD")

  // On page load, make the below API requests to get data to populate various arrays
  // 
  useEffect(() => {
    makeDataAPIRequests();
  }, [])

  // If currencyvalue contains an actual number, then do the below requiest
  // otherwise throw error and alert user.
 // if ()
  async function makeCurrencyAPIRequest()  {
      console.log(EXCHANGE_API_KEY)
      const countryFetchRequest = `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${selectedCountry}`
      console.log(countryFetchRequest)
      await fetch(countryFetchRequest)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        // This function below must be changed to 'setCurrencyValue' and passed to parent.
        
      })
    // else {
      // Handling here or elsewhere for invalid numbers? :o
      //alert("Please enter a search term!")
    //}
  }

  async function makeDataAPIRequests() {
    const currencyOptionsRequestUrl = `https://openexchangerates.org/api/currencies.json`
    await fetch(currencyOptionsRequestUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setCurrencyData(data)
    })
  }
  
  const updateSelectedCountry = (event: any) => {
    const value = event.target.value
     console.log("value in dropdown changed to ", value)
    setSelectedCountry(value)
  }

  const handleInputChange = (event: any) => {
    console.log(event.target.value)
  }
  
  const inputListener = document.getElementById('currencyInput')
  inputListener?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById('inputButton')?.click();
    }
  })
  
  return (
    <>
      <CurrencyItemDiv>
        <StyledInput 
          type="number"
          id="currencyInput" 
          onChange={handleInputChange}
          maxLength={10}
        >

        </StyledInput>
          <StyledSelect onChange={updateSelectedCountry}>
            {Object.keys(currencyData)?.map((item?:any, item2?:any) => (
            <option value={item}>{item} {currencyData[item]} </option>
            ))}
          </StyledSelect>
          <StyledSelect >
            {Object.keys(currencyData)?.map((item?:any, item2?:any) => (
            <option value={item}>{item} {currencyData[item]} </option>
            ))}
        </StyledSelect>
      </CurrencyItemDiv>
        <div>
          <StyledButton onClick={makeCurrencyAPIRequest} id="inputButton">Convert</StyledButton>
        </div>
        <CurrencyReturnDiv>
        </CurrencyReturnDiv>
    </>
  )
}
