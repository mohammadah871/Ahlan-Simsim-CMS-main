import React from "react";
import "./ButtonDownload.css";
import icon from "../icons/iconDownload.svg";

function ButtonDownload() {
  return (
    <btn
      style={{ cursor: "pointer" }}
      className={"buttonDownload-container buttonDownload-bgActive"}
    >
      <img className="buttonDownload-icon" src={icon} alt="" />
    </btn>
  );
}

export default ButtonDownload;
