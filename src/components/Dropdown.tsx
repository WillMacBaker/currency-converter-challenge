import styled from 'styled-components'

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { EventEmitter } from 'stream';
import {AiOutlineSwap} from "react-icons/ai"
import React from 'react';

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
  max-width: 100%;
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

// Optional future update: add flag to this so that either api dropdown 
// can be selected, or just regular-flavour dropdown, with a supplied array
// of values?

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

  // TODO: Call up the flag API to grab the flag image, and figure out adding the flag, either as an image,
  // or redoing the component as a div.
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