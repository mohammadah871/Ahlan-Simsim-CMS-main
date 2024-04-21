import "./ProgramInnerSlide6.css";

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
                <img className="programInnerSlide6-iconSpeaker" src={iconImg} alt='' />
                :
                <div className="programInnerSlide6-iconSpeakerEmpty" />
        }
        < div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'right' }}>
            <div
                style={{ backgroundColor: bgColor, margin: '15px', padding: '12px', marginTop: -4, maxWidth: '45%', borderRadius: '12px',color:"#fff" , fontFamily: "Medium",fontWeight:"500"}}
                dangerouslySetInnerHTML={{ __html: item.contentHtml }}
            />
        </div>
    </div>
}

export default SpeakerIconComponent;