import React from 'react';
import "./ProgramInnerSlidesShared.css";
import { useEffect } from 'react';
import { useState } from 'react';

const AccordionNumberComponent = ({ number, color }) => {
    //console.log("color"  + color)
    const [bgColor, setBgColor] = useState("#93D1F5");
    useEffect(() => {
        setBgColor(color && color !== "#fff" ? color : number % 2 !== 0 ? "#93d1f5" : "#56a5d1");
        // setBgColor(color && color !== "#fff" ? color : number % 2 !== 0 ? "gray" : "black");
    }, [color, number]);

    return (<div
        className={number % 2 !== 0 ? 'programInnerSlides-accordionNumberContainerEven' : 'programInnerSlides-accordionNumberContainerOdd'}
        // style={{ backgroundColor: (color && (color !== "" && color !== "#fff")) ? color : null }}
        style={{ backgroundColor: bgColor }}
    >
        <div className='programInnerSlides-number'>{number}</div>
    </div>);
}

export default AccordionNumberComponent;