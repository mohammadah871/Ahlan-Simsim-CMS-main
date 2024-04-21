import React from "react";
import "./ButtonCustomizedComponent.css";

function ButtonCustomizedComponent({
  icon,
  label,
  isBold,
  fontColor,
  bgColor,
  borderColor,
  isCentered,
  isReversed,
  size,
  isActive,
  width,
  onClickCallback,
}) {
  return (
    <button
      dir={isReversed ? "ltr" : "rtl"}
      className="btnCustomized-container"
      style={{
        cursor: "pointer",
        background: bgColor,
        borderColor: borderColor ? borderColor : "transparent",
        justifyContent: isCentered ? "center" : icon ? "flex-start" : "center",
        minWidth: isCentered ? "auto" : icon ? null : "auto",
        paddingLeft: isCentered ? 20 : null,
        paddingRight: isCentered ? 20 : null,
        opacity: isActive === false ? 0.5 : 1,
        width: width ? width : null
      }}
      onClick={onClickCallback}
    >
      {icon ? (
        <img
          className="btnCustomized-icon"
          src={icon}
          alt=""
          style={{
            height: size ? size : 22,
            width: size ? size : 22,
            marginLeft: isReversed ? 0 : 10,
            marginRight: isReversed ? 10 : 0,
          }}
        />
      ) : null}
      <span className="btnCustomized-label" style={{ color: fontColor, fontWeight:isBold?'bold':'normal' }}>
        {label}
      </span>
    </button>
    // <Button variant="contained" startIcon={icon} background={bgColor} onClick={onClickCallback}>
    //   {label}
    // </Button>
  );
}

export default ButtonCustomizedComponent;