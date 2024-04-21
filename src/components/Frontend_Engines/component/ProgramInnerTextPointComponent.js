import './ProgrammInnerTextWithThumbComponent.css';

const ProgramInnerTextPointComponent = ({ contentHtml, width, bgColor, htmlPaddingRight, marginX, marginY }) => {

    const addAlpha = (hexColor, opacity) => {
        var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
        return hexColor + _opacity.toString(16).toUpperCase();
    }

    return (<div className="programInnerTextThumb-textContainer" dir='rtl' style={{ width: width ? width : null, backgroundColor: addAlpha(bgColor,1), marginRight: marginX ? marginX : null, marginLeft: marginX ? marginX : null, marginTop: marginY ? marginY : null, marginBottom: marginY ? marginY : null }}  >
        {
            <div
                style={{ textAlign: 'right', paddingRight: htmlPaddingRight ? htmlPaddingRight : '0px', paddingLeft: '10px', fontFamily: "Medium", fontSize: '13px' }}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
        }
    </div>)
}

export default ProgramInnerTextPointComponent;