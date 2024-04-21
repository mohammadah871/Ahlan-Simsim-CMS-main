import './ProgramInnerTextComponent.css';
import './ProgramInnerStickyNoteComponent.css';

import stickNote1 from '../icons/stickNote1.svg';
import stickNote2 from '../icons/stickNote2.svg';
import stickNote3 from '../icons/stickNote3.svg';
import stickNote4 from '../icons/stickNote4.svg';
import { useState } from 'react';
import { useEffect } from 'react';

const ProgramInnerStickyNoteComponent = ({ index, data, size, paddingY, borderRadius, textAlign, bgColor, isPoint }) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const arrBgs = [stickNote1, stickNote2, stickNote3, stickNote4];
    const arrRotations = ['5deg', '-13deg', '3deg', '-5deg'];
    const arrPosY = ['15px', '-35px', '10px', '-23px'];
    const [bg, setBg] = useState(null);
    useEffect(() => {
        const i = index < arrBgs.length ? index : index % arrBgs.length;
        setActiveIndex(i);
        setBg(arrBgs[i]);
    }, index);

    return (<div
        className="programInnerText-textContainer"
        dir='rtl'
        style={{ transform: `rotate(` + arrRotations[activeIndex] + `)`, marginTop: arrPosY[activeIndex], position: 'relative', minWidth: size ? size : null, width: size ? size : '90%', height: size ? size : '90%', backgroundColor: 'transparent', }}
    >
        <img className="programInner-stickyNote1" src={bg} alt='' />
        <span className="programInnerText-label programInnerText-description programInner-stickyText"
            style={{ textAlign: textAlign ? textAlign : null, fontSize: '11.5px', lineHeight: '17px' }}
        >
            <div
                dangerouslySetInnerHTML={{
                    __html: data,
                }}
            />
        </span>
    </div>)
}

export default ProgramInnerStickyNoteComponent;