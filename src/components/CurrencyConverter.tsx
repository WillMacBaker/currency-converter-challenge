import styled from 'styled-components'

import {  useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {AiOutlineSwap} from "react-icons/ai"
import Dropdown from './Dropdown';
import { IconBaseProps } from 'react-icons';
import { match } from 'assert';
import { string } from 'prop-types';
import Countdown from './Countdown';
import React from 'react';



/* 
TODO, ADD TASTEFUL BACKGROUND
Round down to 3dig + 2 dec places 
OPTIONAL, ADD CHOICE OF ROUNDING DOWN
WORK ON TIMER COMPONENT AND GET IT COUNTING DOWN
ADD JEST TESTS, MAKE SURE THAT ANY MALFORMED ENTRIES CORRECTLY ERROR OUT!


*/


const StyledButton= styled(motion.button)<{activeFlag: boolean}>`
  display: inline-flexbox;
  justify-self: center;
  margin-top: 1rem;
  width: 400px;
  max-width: 100%;
  font-family: monospace;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  position: relative;
  border-radius: 30px;
  outline: none;
  color: ${props =>
  props.activeFlag? 'gray' 
  :'#000;'};
  background-color: #fff;

  border: ${props =>
  props.activeFlag? '5px solid gray' 
  :'4px solid #000'};
  
  
  box-shadow: ${props =>
  props.activeFlag? '5px 5px 0 gray, 10px 10px 0 darkgray;' 
  :'5px 5px 0 #000, 10px 10px 0 #E8793F;'};


  ${props =>
  props.activeFlag?
  null
:
`&:hover {
    background-color: #E8793F;
    color: #fff;
  }
  // When button has been clicked
  &:active {
    transform: translate(3px, 3px);
    box-shadow: 5px 5px 0 #E8793F;
  }`}
  



`


const StyledInputDivider = styled.div`
  position: relative;
  display: flex;
  margin: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;

`
const OptionsDiv = styled.div`
  position: relative;
  display: flex;
  right: 4.25rem;
`

const StyledSquareButton = styled(motion.button)<{activeFlag?: boolean}>`
  min-width: 0px;
  width: 40px;
  height: 40px;
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
  box-shadow: ${props =>
  props.activeFlag? '2px 2px 0 gray, 4px 4px 0 darkgray;' 
  :'2px 2px 0 #000, 4px 4px 0 #E8793F;'};

${props =>
  props.activeFlag?
  null
:
`&:hover {
    background-color: #E8793F;
    color: #fff;
  }
  // When button has been clicked
  &:active {
    transform: translate(3px, 3px);
    box-shadow: 0px 0px 0 #E8793F;
  }`}
`

const StyledSelect = styled(motion.select)<{activeFlag?: boolean}>`
  right: 0.25rem;
  min-width: 0px;
  width: 43px;
  height: 40px;
  font-family: monospace;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  border: 4px solid #000;
  position: relative;
  border-radius: 10px;
  outline: none;
  box-shadow: ${props =>
  props.activeFlag? '2px 2px 0 gray, 4px 4px 0 darkgray;' 
  :'2px 2px 0 #000, 4px 4px 0 #E8793F;'};

${props =>
  props.activeFlag?
  null
:
`&:hover {
    background-color: #E8793F;
    color: #fff;
  }
  // When button has been clicked
  &:active {
    transform: translate(3px, 3px);
    box-shadow: 0px 0px 0 #E8793F;
  }`}
`

const StyledText = styled(motion.text)<{fontSize?: string}>`
  font-size: ${props =>
  props.fontSize? `${props.fontSize}px;` 
  : '16px;'};
  font-family: monospace;
  font-weight: bold;
  padding: 2rem;
  max-width: 100%;
  text-align: center;
`

const StyledHeader = styled(motion.h1)`
  display: flex;
  justify-content: center;
  font-size: 32px;
  font-family: monospace;
`

const StyledBottomText = styled.text`
  font-size: 22px;
  font-family: monospace;
  position: fixed;
  bottom: 0;
`

const StyledInput = styled(motion.input)<{activeFlag?: boolean}>`
  position: relative;
  left: 2.5rem;
  margin: 1rem;
  width: 300px;
  max-width: 100%;
  font-family: monospace;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  border: 4px solid #000;
  box-shadow: ${props =>
  props.activeFlag? '5px 5px 0 gray, 10px 10px 0 darkgray;' 
  :'5px 5px 0 #000, 10px 10px 0 #E8793F;'};

  &:focus{
   // outline: 1px solid #E8793F;
    box-shadow: 5px 5px 0 #000, 10px 10px 0 #E8793F;

    &:invalid {
      border: 5px solid red;
    }
  }
`


const StyledDivider = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
`

const StyledAppContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-self: center;
  justify-content: center;
  max-width: 95%;
  align-items: center;
`


const EXCHANGE_API_KEY = process.env.REACT_APP_EXCHANGE_RATE_KEY
export default function CurrencyConverter() {
  const [currencyValue, setCurrencyValue] = useState('')
  const [convertedCurrency, setConvertedCurrency] = useState('')

  const [selectedCountry, setSelectedCountry] = useState("USD")
  const [secondSelectedCountry, setSecondSelectedCountry] = useState("GBP")

  const [errorFlag, setErrorFlag] = useState<boolean>(false)
  const [countDownFlag, setCountDownFlag] = useState(true)
  const [matchCountryError, setMatchCountryError] = useState<boolean>(false)
  const [showCurrency, setShowCurrency] = useState<boolean>(false)
  const [selectedDecimalCount, setSelectedDecimalCount] = useState<number>(1)
  


  // Whenever any of the two country dropdown boxes are selected, checK and compare both using
  // the compareCountries() function. Also reset and set the countdownflag to false, which will hide the
  // returned elements, and also feed down into the Countdown component, which will stop using it's useEffect
  useEffect(() => {
    compareCountries()
    setShowCurrency(false);
    setCountDownFlag(false);
  }, [selectedCountry, secondSelectedCountry, currencyValue])
   

  // Todo: Bonus items (adding flags to dropdown, making dropdown searchable) need doing
  // Adding case handling for if api request doesn't find anyuthing (Salvadorean Colon, for example, fail)
  // Handling text response if one of the currency values return NaN (check why? Too high? Way too low?)

  // Country flag api 
  // https://flagpedia.net/download/api

  // Country full name
  // https://openexchangerates.org/api/currencies.json


  // Function here returns a true or false boolean, depending on result
  // of checking inputString against regex variable.
  const sanitiseInput = (inputString: string) => {
    const currencyInputRegex = /^\s*-?\d+(\.\d{1,2})?\s*$/
    if (inputString.match(currencyInputRegex)){
      return true;
    } else {
      return false
    } 
  }

  const compareCountries = () => {
    if (selectedCountry === secondSelectedCountry){
      setMatchCountryError(true);
      setShowCurrency(false);
      (document.getElementById('currencyInput')as HTMLInputElement).disabled = true;
      (document.getElementById('select-decimals')as HTMLSelectElement).disabled = true;
      (document.getElementById('currencyInput')as HTMLInputElement).value = ""
      
    }
    else {
      setMatchCountryError(false);
      (document.getElementById('currencyInput')as HTMLInputElement).disabled = false;
      (document.getElementById('select-decimals')as HTMLSelectElement).disabled = false;
      
    }
  }

  const calcCurrency = (value: number, multiplier: number) => {
    const tempConvertedCurrency = value * multiplier
    setShowCurrency(true)
    setCountDownFlag(true)
    const stringValue = `${tempConvertedCurrency}`
    return stringValue
  }

  // Lets you customise the number of rounding places you can
  // use when returning a number. Better method would be able
  // to call this function using a state variable, and have that
  // update based on a dropdown? :) Also have this function rerun whenever you change dropdown
  // value, so that you aren't reliant on hitting convert button, and making another API call,
  // and also propogate this down so that currency returned number updates too?
  const returnRoundedValue = (value: number, places: number) => {
    let mult = parseInt("1" + "0".repeat(places))
    console.log("value", value)
    value = value * mult
    value = Math.round(value)

    return `${value/mult}`
  }
  // When conversion button is pressed, this async function is called, that
  // checks and receives API data, parsing in primary selected currency.
  async function makeCurrencyAPIRequest()  {
    console.log("entered currencyValue: ", currencyValue)
    if (errorFlag){
      // Value is invalid, and no API request will be made
      //console.log("error, Invalid value! You're trying to mash the grayed out button, not happening >:(")
    }
    else if (matchCountryError){
      console.log("Both countries are the same! No currency conversion will happen")
    }
    else if (currencyValue === ""){
      // *Shouldn't proc, as the button is set to be disabled when errorFlag is true, but just in case...
      console.log("No number value was added!")
    }
    else {
      //console.log('First country selected is: ', selectedCountry, ' and second selected country is ', secondSelectedCountry)
      const countryFetchRequest = `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/${selectedCountry}`
      await fetch(countryFetchRequest)
      .then(response => response.json())
      .then(data => {
        console.log(secondSelectedCountry)
        // console.log("Full returned list of currency conversion data ", data.conversion_rates)
        const multiple = data.conversion_rates[secondSelectedCountry];
        const currencyNumber = parseInt(currencyValue)
        //console.log(`Currency data for ${secondSelectedCountry}:`, multiple)
        let calculatedCurrency = calcCurrency(currencyNumber, multiple)
        let roundedCurrency = returnRoundedValue(parseFloat(calculatedCurrency), selectedDecimalCount)
        setConvertedCurrency(roundedCurrency)
        // Function in here to trigger the countDownTimer
        
      })
    }
    // Todo, best practice would be to add handling case here, this is where I'd put in error handling for invalid countries
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
    if (swap1 === swap2){
      //console.log("Both countries are the same!")
      return null
    } else {
      //console.log("first country before swap: ", selectedCountry, " second country: ", secondSelectedCountry)
      setSelectedCountry(swap2)
      setSecondSelectedCountry(swap1)
    }
  }

  const updateSelectedCountry = (event: any) => {
    const value = event.target.value
    //console.log("value in dropdown changed to ", value)
    setSelectedCountry(value)
  }

  const updateDecimalCount = (event: any) => {
    const value = event.target.value
    setSelectedDecimalCount(value)
  }
  const updateSecondSelectedCountry = (event: any) => {
    const value = event.target.value
    //console.log("value in second dropdown changed to ", value)
    setSecondSelectedCountry(value)
  }

  const handleInputChange = (event: any) => {
    const value = event.target.value
    let regexCheck = sanitiseInput(value)
    if (regexCheck === true){
      setErrorFlag(false)
      console.log(errorFlag);
      console.log("Button re-enabled");
      (document.getElementById('inputButton')as HTMLButtonElement).disabled = false;
      setCurrencyValue(value);
    } else if (regexCheck === false) {
      setErrorFlag(true);
      console.log("Button disabled");
      (document.getElementById('inputButton')as HTMLButtonElement).disabled = true;
      setCurrencyValue(value)
    }
    console.log("initial regexCheck returns  ", regexCheck, " with a value of ", value, " errorflag has been set to ", errorFlag)
  }
  
  // QoL addition so user can mash enter button to convert currency
  const inputListener = document.getElementById('currencyInput')
  inputListener?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById('inputButton')?.click();
    }
  })
  
  return (
    <>
      <StyledHeader>Currency Converter App</StyledHeader>
      <StyledAppContainer>
        <StyledInputDivider id="input-div">
            <StyledInput
              id="currencyInput" 
              onChange={handleInputChange}
              maxLength={20}
              activeFlag={matchCountryError}
            >
              
            </StyledInput>
            <OptionsDiv>
              <StyledSelect
                onChange={updateDecimalCount}
                activeFlag={matchCountryError}
                id="select-decimals"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </StyledSelect>
              <StyledSquareButton 
                onClick={swapCountry} 
                activeFlag={matchCountryError} 
                id="swapCountries">
                <AiOutlineSwap />
              </StyledSquareButton>
            </OptionsDiv>
        </StyledInputDivider>
        <StyledDivider id="error-text-div">
            { errorFlag && 
              <StyledDivider>
                <StyledText>{currencyValue} is not a valid number, please make sure to provide a valid input, comprising of a digit with up to two decimals.</StyledText>
              </StyledDivider>
            }
            { matchCountryError &&
                <StyledDivider>
                  <StyledText>Both countries match! Please change one of your currency selections</StyledText>
                </StyledDivider>
            }
        </StyledDivider>
        <StyledDivider id="dropdown-container-div">
          <Dropdown stateVar={updateSelectedCountry} value={selectedCountry}/>
          <Dropdown stateVar={updateSecondSelectedCountry} value={secondSelectedCountry}/>
        </StyledDivider>
        <AnimatePresence>
            {
              countDownFlag &&
              <StyledDivider key='converted-currency-div' id="show-converted-currency-div" initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0}}>
                <StyledText fontSize={'18'}>{currencyValue} in {selectedCountry} is equivalent to {convertedCurrency} in {secondSelectedCountry} </StyledText>
              </StyledDivider>
            }
        </AnimatePresence>
        <AnimatePresence>
            {
              countDownFlag &&
              <StyledDivider key='countdown-div' initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0}}>
                <Countdown key='countdown-component' activeFlag={countDownFlag} setActiveFlag={setCountDownFlag}/>
              </StyledDivider>
            }
          </AnimatePresence>
        <StyledDivider id="convert-currency-button-div">
            <StyledButton onClick={makeCurrencyAPIRequest} id="inputButton" activeFlag={errorFlag}>Convert</StyledButton>
        </StyledDivider>
          <StyledBottomText>Site developed by William Macluskie</StyledBottomText>
      </StyledAppContainer>
      
    </>
  )
  }