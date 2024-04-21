import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide7.css";
import * as React from "react";
import { Grid } from "@mui/material";
import Highlighter from "./SessionManager";

export default function ProgramInnerSlide12({ data }) {

  return (
    <Grid
      dir="rtl"
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      paddingBottom={2}
      paddingY={"20px"}
      overflow="hidden"
      width={"100%"}
      height={"100%"}
      xs={12}
      paddingRight={"5px"}
    >
      <div className="programInnerSlide12-headerContainer">
        <span className="programInner-label programInnerSlide12-titleHeader">
          <Highlighter>{data?.title}</Highlighter>
        </span>
      </div>

      <div className="programInnerSlide12-pointsContainer">
        {data?.data.tags.map((item, index) => {
          return (
            <span
              id={index}
              className="programInnerSlide12-label programInnerSlide12-pointContainer"
            >
              <Highlighter>{item}</Highlighter>
            </span>
          );
        })}
      </div>
      <div className="programInnerSlide12-headerContainer">
        <span className="programInner-label programInnerSlide12-titleHeader">
          <Highlighter>
            أرسل للمشاركين عبر الوسيلة المتّفق عليها معهم (مجموعة واتساب على
            سبيل المثال) مع النّصّ الآتي
          </Highlighter>
        </span>
      </div>

      <div id="text" className="programInnerBreaf-textContainer" dir="rtl">
        <span className="programInnerBreaf-label programInnerBreaf-title">
          <div dangerouslySetInnerHTML={{ __html: data?.data?.description }} />
        </span>
      </div>
    </Grid>
  );
}
