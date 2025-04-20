import styled from 'styled-components'

import {  useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { EventEmitter } from 'stream';
import {AiOutlineSwap} from "react-icons/ai"
import Dropdown from './Dropdown';

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
const StyledSquareButton = styled(motion.button)`
  margin-top: 1rem;
  position: relative;
  width: 50px;
  height: 50px;
  font-family: monospace;
  padding: 2px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  border: 4px solid #000;
  position: relative;
  border-radius: 10px;
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

  &:focus{
   // outline: 1px solid #E8793F;
    box-shadow: 5px 5px 0 #000, 10px 10px 0 #E8793F;

  /* &:invalid {
    border: 5px solid red;
  } */

  
  }
`



const CurrencyItemDiv = styled(motion.div)`
  display: flex;
  max-width: 80%;
`

const CurrencyReturnDiv = styled(motion.div)`
  .custom-pattern {
	background-image: repeating-linear-gradient(45deg, transparent, transparent 80px, #1A8FE5 80px, #1A8FE5 160px);
	background-color: #E4E4ED;
}
`

const EXCHANGE_API_KEY = process.env.REACT_APP_EXCHANGE_RATE_KEY

export default function CurrencyConverter() {
  const [currencyValue, setCurrencyValue] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("USD")
  const [secondSelectedCountry, setSecondSelectedCountry] = useState("USD")
  const [errorFlag, setErrorFlag] = useState<boolean>(false)
  

  //const [firstSelectedCountry, setFirstSelectedCountry] = useState()
  //const [secondCurrencyu]

  // On page load, make the below API requests to get data to populate various arrays
  // `


  useEffect(() => {
    
  }, [currencyValue])

  /* 

  3. Create reusable dropdown component
    // Dropdown will have all available currencies from api <DONE>
    3a. Dropdown will include a search input for user to filter out options
    3b. Search input will require correct validation if no record is found (regex + error handling?)
    3c. Images loaded and shown on the side of the currency
  
  4. Convert button
    4a. Conversion button will convert amount entered, and display it below in string format "VALUE first currency is equal to VALUE second currency
    4b. A countdown timer starting from 10 00, and once counted down, then show the conversion result, hiding the timer once the value hits 0

  Application should be written in react BONUS if in typescript
  README should detail how to run and use the application
  There should be UNIT TESTS (use Chai testing here)
  Application should be tested in chrome, but also test in IE11, Firefox, Safari
  Add other things as appropriate. (Background flag design changes based on currency selected?

  Code should be clean, modular and extensible, being responsive and accessible
  
  )
  */

  // Country flag api 
  // https://flagpedia.net/download/api

  // Country full name
  // https://openexchangerates.org/api/currencies.json

  // Regex for currency 
  // ^\$(0|[1-9][0-9]{0,2})(,\d{3})*(\.\d{1,2})?$
  // taken from  https://regexr.com/3ivk1

  // If currencyvalue contains an actual number, then do the below requiest
  // otherwise throw error and alert user.
 // if ()

  const sanitiseInput = (inputString: string) => {
    const currencyInputRegex = /^\s*-?\d+(\.\d{1,2})?\s*$/
    if (inputString.match(currencyInputRegex)){
      return true;
    } else {
      return false
    } 
  }

  async function makeCurrencyAPIRequest()  {
      console.log('First country selected is: ', selectedCountry, ' and second selected country is ', secondSelectedCountry)
      const countryFetchRequest = `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${selectedCountry}`
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


  
  // Updates and swaps the two state variable values containing selected countries
  const swapCountry = (event: any) => {
    let swap1, swap2
    swap1 = selectedCountry
    swap2 = secondSelectedCountry
    console.log("first country before swap: ", selectedCountry, " second country: ", secondSelectedCountry)
    setSelectedCountry(swap2)
    setSecondSelectedCountry(swap1)
  }

  const updateSelectedCountry = (event: any) => {
    const value = event.target.value
    console.log("value in dropdown changed to ", value)
    setSelectedCountry(value)
  }

  const updateSecondSelectedCountry = (event: any) => {
    const value = event.target.value
    console.log("value in second dropdown changed to ", value)
    setSecondSelectedCountry(value)
  }

  const handleInputChange = (event: any) => {
    const value = event.target.value
    let regexCheck = sanitiseInput(value)
    if (regexCheck === true){
      setErrorFlag(false)
      console.log(errorFlag)
      setCurrencyValue(value)
    } else if (regexCheck === false) {
      setErrorFlag(true)
      setCurrencyValue(value)
    }
    console.log("initial regexCheck returns  ", regexCheck, " with a value of ", value, " errorflag has been set to ", errorFlag)
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
        <div>
          <StyledInput
            id="currencyInput" 
            onChange={handleInputChange}
            maxLength={10}

          >
          </StyledInput>
          <StyledSquareButton onClick={swapCountry} id="">
            <p>Ss</p>
          </StyledSquareButton>
          { errorFlag && 
            <p>{currencyValue} is not a valid number, please make sure to provide a valid input, comprising of a digit with up to two decimals.</p>
          }

        </div>
        <div>
          {/* TODO, MOVE EACH OF THESE STYLED SELECT ELEMENTS INTO THEIR
              OWN DROPDOWN COMPONENT FILE, AND MAKE SURE TO PASS IN ONCHANGE AND 
              VALUE FIELDS ALL CORRECTLY. */}
          <Dropdown stateVar={updateSelectedCountry} value={selectedCountry}/>
          <Dropdown stateVar={updateSecondSelectedCountry} value={secondSelectedCountry}/>
          <Dropdown />
          
        </div>
      </CurrencyItemDiv>
        <div>
          <StyledButton onClick={makeCurrencyAPIRequest} id="inputButton">Convert</StyledButton>
        </div>
        
        <CurrencyReturnDiv>
        </CurrencyReturnDiv>
    </>
  )
  }