import React from 'react';
import "./DashedLineVerticalComponent.css";

const DashedLineVerticalComponent = ({ height }) => {
    // console.log("height = " + height)
    const h = height > 0 ? (height + 10) : 70;
    return (
        <div className="dashedLine"/>
    )
}

export default DashedLineVerticalComponent;