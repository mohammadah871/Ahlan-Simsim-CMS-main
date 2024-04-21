
import './ProgramInnerTextComponent.css';

const ProgramInnerCircularComponent = ({ data, size, paddingY, textWidth, borderRadius, textAlign, bgColor, isPoint }) => {
    return (<div
        className="programInnerText-textContainer"
        dir='rtl'
        style={{ minWidth: size ? size : null, width: size ? size : '90%', height: size ? size : '90%', paddingTop: paddingY ? paddingY : null, paddingBottom: paddingY ? paddingY : null, borderRadius: borderRadius, backgroundColor: bgColor ? bgColor : null }}
    >
        <span className="programInnerText-label programInnerText-description"
            style={{ fontWeight: '500', width: textWidth ? textWidth : null, textAlign: textAlign ? textAlign : null, display: 'flex', lineHeight: '28px', flexDirection: 'column', justifyContent: 'center' }}
        >
            <div
                dangerouslySetInnerHTML={{
                    __html: data,
                }}
            />
        </span>
    </div>)
}

export default ProgramInnerCircularComponent;