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


/* 
    TODO
  2. Create reusable dropdown component
    // Dropdown will have all available currencies from api <DONE>
    3a. Dropdown will include a search input for user to filter out options
    3b. Search input will require correct validation if no record is found (regex + error handling?)
    3c. Images loaded and shown on the side of the currency
*/

export default function Countdown({stateVar, value}: DropdownProps){
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
    {/* RETURN DIV WITH TEXT THAT UPDATES EACH SECOND */}
    </>
  )
}