import "../ProgramInnerSlide6.css";
import "./Arrow.css";

import { useEffect, useState } from "react";

const SpeakerIconComponent = ({ item, bgColor, icon }) => {
    const [iconImg, setIconImg] = useState(null);
    useEffect(() => {
        if (icon) {
            setIconImg(icon);
        }
    }, [icon]);
    return <div className="programInnerSlide6-speakerContainer" style={{ direction: item.type === 1 ? 'rtl' : 'ltr' }}>
        {
            icon ?
                <img className="programInnerSlide6-iconSpeaker"  src={iconImg} alt='' />
                :
                <div className="programInnerSlide6-iconSpeakerEmpty" />
        }
        < div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', textAlign: 'right' }}>
            {
                (item.type === 1 && icon) &&
                <div className="arrow-right" style={{ marginRight: '10px', marginTop: '25px', marginLeft: -4, borderLeftColor: bgColor }} />
            }
            {
                (item.type !== 1 && icon) &&
                <div className="arrow-left" style={{ marginLeft: '10px', marginTop: '25px', marginRight: -4, borderRightColor: bgColor }} />
            }
            <div
                style={{color:"#fff", backgroundColor: bgColor, margin: '15px', padding: '12px', marginTop: 3, marginRight: (item.type === 1 && icon) ? 0 : '25px', marginLeft: (item.type !== 1 && icon) ? 0 : '25px', maxWidth: '45%', borderRadius: '12px', direction: 'rtl' }}
                dangerouslySetInnerHTML={{ __html: item.contentHtml }}
            />
        </div>
    </div>
}

export default SpeakerIconComponent;