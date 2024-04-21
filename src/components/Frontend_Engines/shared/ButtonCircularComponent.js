import React, { useState, useEffect } from "react";
import "./ButtonCircularComponent.css";

function ButtonCircularComponent({
  icon,
  isCircular,
  size,
  bgColor,
  pos,
  onClickCallback,
  borderColor,
}) {
  const [position, setPosition] = useState(null);
  const [dir, setDir] = useState([null, null, null, null]);
  useEffect(() => {
    if (!pos) return;

    let t,
      b,
      r,
      l = null;
    if (pos.indexOf("r") > -1) r = 10;
    if (pos.indexOf("l") > -1) l = 10;
    if (pos.indexOf("t") > -1) t = 10;
    if (pos.indexOf("b") > -1) b = 10;
    setDir([r, l, t, b]);
    setPosition(pos ? "absolute" : "relative");
  }, [pos, dir]);
  return (
    <button
      dir="rtl"
      className="ButtonCircular-container"
      style={{
        cursor: "pointer",
        borderColor:borderColor?borderColor:null,
        background: bgColor,
        justifyContent: "center",
        position: position,
        right: dir[0],
        left: dir[1],
        top: dir[2],
        bottom: dir[3],
        borderRadius: isCircular === true ?null:8,
      }}
      onClick={onClickCallback}
    >
      <img
        className="ButtonCircular-icon"
        src={icon}
        alt=""
        style={{ width: size ? size : null, height: size ? size : null, }}
      />
    </button>
  );
}

export default ButtonCircularComponent;
