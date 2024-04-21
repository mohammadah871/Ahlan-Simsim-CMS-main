import Highlighter from './SessionManager';
import './ProgramInnerTextComponent.css';

const ProgramInnerTextComponent = ({ data, width, paddingY, borderRadius, textAlign, bgColor, isPoint , fontBoldTitle }) => {
    return (<div
        className="programInnerText-textContainer"
        dir='rtl'
        style={{ width: width ? width : '90%', paddingTop: paddingY ? paddingY : null, paddingBottom: paddingY ? paddingY : null, borderRadius: borderRadius, flexDirection: 'row', backgroundColor: bgColor ? bgColor : null }}
    >
        <span  className="programInnerText-label programInnerText-title"
            style={{ fontWeight:fontBoldTitle?"bold":"unset", textAlign: textAlign ? textAlign : null }}
        >
            {
                isPoint &&
                <div className='programInnerText-point' />
            }


            <Highlighter>{data?.title}</Highlighter>
        </span>
        <span className="programInnerText-label programInnerText-description"
            style={{ textAlign: textAlign ? textAlign : null }}>
       
            <Highlighter isSameText={false} >{data?.description}</Highlighter>
        </span>
    </div>)
}

export default ProgramInnerTextComponent;