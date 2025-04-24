// Props
interface SVGProps{
    primaryColor: string
    secondaryColor?: string
    xCoord: string
    yCoord: string
    rotateVector: string
}

export default function TastefulSVGBox({primaryColor, secondaryColor, xCoord, yCoord, rotateVector}: SVGProps){

  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" className='tasteful-box' > 
     <rect 
        x={xCoord}
        y={yCoord}
        width={1}
        transform={rotateVector}
        height={1}
        fill={primaryColor}
        stroke={primaryColor}
        strokeWidth={32}
     />

    </svg>
    </>
  )
}