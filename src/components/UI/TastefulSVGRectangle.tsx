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

export default function TastefulSVGRectangle({primaryColor, secondaryColor, xCoord, yCoord, rotateVector}: SVGProps){

  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" className='tasteful-rectangle' viewBox='0 0 512 512' preserveAspectRatio='none' > 
     <rect 
        x={xCoord}
        y={yCoord}
        width={1}
        transform={rotateVector}
        height={30000}
        fill={primaryColor}
        stroke={primaryColor} 
        strokeWidth={16}
     />

    </svg>
    </>
  )
}