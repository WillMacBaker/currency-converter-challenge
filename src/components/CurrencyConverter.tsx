import styled from 'styled-components'

import {  useState } from 'react';
import { motion } from 'motion/react';

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

//const API_KEY = process.env.REACT_APP_GIPHY_KEY

export default function CurrencyConverter() {
  //const [inputGifSearch, setInputGifSearch] = useState('')

  // This function handles making request to GIPHY API, and returning a data object that is then used by the GifDivContainer
  async function makeAPIRequest()  {
    // if (inputGifSearch){
    //   const countryFetchRequest = `https://openexchangerates.org/api/currencies.json`
    //    console.log(countryFetchRequest)
    //   await fetch(countryFetchRequest)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     // This function below must be changed to 'setCurrencyValue' and passed to parent.
    //     //setCurrency(data)
    //   })
    // }
    // else {
      // Handling here or elsewhere for invalid numbers? :o
      alert("Please enter a search term!")
   // }
  }

  // const updateGifCounter = (event: any) => {
  //   const value = event.target.value
  //   // console.log("value in dropdown changed to ", value)
  //   setGifCount(value)
  // }

  // const handleInputChange = (event: any) => {
  //   InputGifSearch(event.target.value)
  // }
  
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
          //onChange={handleInputChange}
          maxLength={10}
        ></StyledInput>
        <StyledSelect>
          
          <option value='GBP'>GBP</option>
        </StyledSelect>
        <StyledSelect>
          
          <option value='GBP'>GBP</option>
        </StyledSelect>
      </CurrencyItemDiv>
        <div>
          <StyledButton onClick={makeAPIRequest} id="inputButton">Convert</StyledButton>
      </div>
    </>
  )
}
