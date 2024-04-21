import React from "react";
import "./ProgramInnerBreafComponent.css";
import Highlighter from "./SessionManager";

const ProgramInnerBreafComponent = ({ data, width, bgColor }) => {
  console.log("data", data);

  return (
    <div
      id="text"
      className="programInnerBreaf-textContainer"
      dir="rtl"
      style={{ width: width ? width : null, bgColor }}
    >
      <Highlighter isSameText={true}>
        <span className="programInnerBreaf-label programInnerBreaf-title">
          {data?.title}
          {"\n"}
          <span className="programInnerBreaf-label programInnerBreaf-description">
            <br />
            <div dangerouslySetInnerHTML={{ __html: data?.contentHtml }} />
            {data?.description}
          </span>
        </span>
      </Highlighter>
    </div>
  );
};

export default ProgramInnerBreafComponent;
