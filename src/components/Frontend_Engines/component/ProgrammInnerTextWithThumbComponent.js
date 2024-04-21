import Highlighter from "./SessionManager";
import "./ProgrammInnerTextWithThumbComponent.css";

const ProgrammInnerTextWithThumbComponent = ({
  data,
  width,
  descriptionHeight,
  isSameLine,
  icon,
  iconBgColor,
  iconSize,
  titleFontSize,
  bgColor,
  htmlPaddingRight,
  fontBold
}) => {
  return (
    <div
      className="programInnerTextThumb-textContainer"
      dir="rtl"
      style={{ width: width ? width : null, backgroundColor: bgColor }}
    >
      <div
        className="programInnerTextThumb-titleThumbContainer"
        dir="rtl"
        style={{ backgroundColor: "transparent" }}
      >
        
        <div
          className="programInnerTextThumb-iconContainer"
          style={{
            backgroundColor: iconBgColor,
            width: iconSize,
            height: iconSize,
            borderRadius: iconSize ? iconSize * 0.25 : null,
          }}
        >
          <img
            className="programInnerTextThumb-icon"
            src={icon}
            alt=""
            style={{
              width: iconSize ? iconSize * 0.55 : null,
              height: iconSize ? iconSize * 0.55 : null,
            }}
          />
        </div>
        <div className="programInnerTextThumb-upperContainer">
          <span
            className={`programInnerTextThumb-label ${ fontBold? "programInnerTextThumb-title" : "programInnerTextThumb-title-regular" }`}
            style={{ fontSize: titleFontSize }}
          >
            {data?.title}
            {isSameLine === true && data?.description && (
              <span className="programInnerTextThumb-label programInnerTextThumb-duration">
                {/* {' ' + data?.description} */}
                <Highlighter>{" " + data?.description}</Highlighter>
              </span>
            )}
          </span>
          {data?.duration && (
            <span className="programInnerTextThumb-label programInnerTextThumb-duration">
              {/* {data?.duration} */}
              <Highlighter>{" " + data?.duration}</Highlighter>
            </span>
          )}
        </div>
      </div>
      {!isSameLine && (
        <span
          className="programInnerTextThumb-label programInnerTextThumb-description"
          style={{ height: descriptionHeight }}
        >
          {/* {data.description && ' '} {data?.description} */}
          <Highlighter>
            {data.description && " "} {data?.description}
          </Highlighter>
        </span>
      )}
      {
        <div
          style={{
            textAlign: "right",
            paddingRight: htmlPaddingRight ? htmlPaddingRight : "35px",
            paddingLeft: "10px",
            fontFamily: "Medium",
            fontSize: "13px",
          }}
          dangerouslySetInnerHTML={{ __html: data?.contentHtml }}
        />
      }
    </div>
  );
};

export default ProgrammInnerTextWithThumbComponent;
