import './ProgramInnerBubbleComponent.css';

import bubble1 from '../icons/bubble1.svg';
import bubble2 from '../icons/bubble2.svg';
import { useState } from 'react';
import { useEffect } from 'react';

const ProgramInnerBubbleComponent = ({ index, data, textAlign }) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const arrBgs = [bubble1, bubble2];
    const arrPosY = ['55px', '-75px'];
    const [bg, setBg] = useState(null);
    useEffect(() => {
        const i = index < arrBgs.length ? index : index % arrBgs.length;
        setActiveIndex(i);
        setBg(arrBgs[i]);
    }, index);

    return (<div
        className="programInnerBubble-container"
        dir='rtl'
        style={{ marginTop: arrPosY[activeIndex], position: 'relative' }}
    >
        <img className="programInnerBubble-imgContainer" src={bg} alt='' />
        <span className="programInnerBubble-label programInnerBubble-description programInnerBubble-text"
            style={{ minWidth: activeIndex == 0 ? '94%' : '91%', width: activeIndex == 0 ? '94%' : '91%', height: activeIndex == 0 ? '88%' : '96%',minHeight: activeIndex == 0 ? '88%' : '96%', textAlign: textAlign ? textAlign : null, fontSize: '13px', lineHeight: '23px', right:activeIndex === 0?'-5%':'-2%' }}
        >
            <div
            style={{paddingRight:25}}
                dangerouslySetInnerHTML={{
                    __html: data,
                }}
            />
        </span>
    </div>)
}

export default ProgramInnerBubbleComponent;