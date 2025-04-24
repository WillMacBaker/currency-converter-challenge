import styled from 'styled-components'

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { EventEmitter } from 'stream';
import {AiOutlineSwap} from "react-icons/ai"

// Props
interface SVGProps{
    primaryColor: string
    secondaryColor?: string
    xCoord: string
    yCoord: string
    rotateVector: string
}

const SVGContainer = styled.div`
  width: 100vw;
  height: 100vh;
`

export default function TastefulSVGRectangle({primaryColor, secondaryColor, xCoord, yCoord, rotateVector}: SVGProps){

  return (
    <>
    <SVGContainer>
      <svg xmlns='http://www.w3.org/2000/svg' width='100%' viewBox='0 0 1600 2400' overflow="visible"><rect id="E1" fill='#ffaa00' width='1600' height='5200'/><path id="E2" fill='#ffbe00'  d='M478.4 581c3.2 0.8 6.4 1.7 9.5 2.5c196.2 52.5 388.7 133.5 593.5 176.6c174.2 36.6 349.5 29.2 518.6-10.2V0H0v574.9c52.3-17.6 106.5-27.7 161.1-30.9C268.4 537.4 375.7 554.2 478.4 581z'/><path id="E3" fill='#ffcc00'  d='M181.8 259.4c98.2 6 191.9 35.2 281.3 72.1c2.8 1.1 5.5 2.3 8.3 3.4c171 71.6 342.7 158.5 531.3 207.7c198.8 51.8 403.4 40.8 597.3-14.8V0H0v283.2C59 263.6 120.6 255.7 181.8 259.4z'/></svg>
    </SVGContainer>
    </>
  )
}