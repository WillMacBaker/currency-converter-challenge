import styled from 'styled-components'

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { EventEmitter } from 'stream';
import {AiOutlineSwap} from "react-icons/ai"

// Props
interface DropdownProps{
    stateVar?: any
    value?: any
}


// Styled components
const StyledSelect = styled.select`
  position: relative;
  padding: 1rem;
  margin: 1rem;
  width: 400px;
  font-family: monospace;
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  background-color: #fff;
  border: 4px solid #000;
  position: relative;
  box-shadow: 5px 5px 0 #000, 10px 10px 0 #E8793F;
`

/* 
    TODO
  2. Create reusable dropdown component
    // Dropdown will have all available currencies from api <DONE>
    3a. Dropdown will include a search input for user to filter out options
    3b. Search input will require correct validation if no record is found (regex + error handling?)
    3c. Images loaded and shown on the side of the currency
*/

export default function Dropdown({stateVar, value}: DropdownProps){
    const [currencyData, setCurrencyData] = useState<any>({})

    useEffect(() => {
        makeDataAPIRequests()
    }, [])

    async function makeDataAPIRequests() {
    const currencyOptionsRequestUrl = `https://openexchangerates.org/api/currencies.json`
    await fetch(currencyOptionsRequestUrl)
    .then(response => response.json())
    .then(data => {
        console.log("currencyData: ", data)
        setCurrencyData(data)
    })
    }

  return (
    <>
    <StyledSelect onChange={stateVar} value={value}>
        {Object.keys(currencyData)?.map((item?:any) => (
        <option value={item} key={item}>{item} {currencyData[item]} </option>
        ))}
    </StyledSelect>
    </>
  )
}