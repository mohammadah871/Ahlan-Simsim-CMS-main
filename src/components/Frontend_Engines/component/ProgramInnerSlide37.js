import React, { useState } from "react";
import "./ProgramInnerScreen.css";
import Grid from "@mui/material/Grid";

import ProgramInnerTextPointComponent from "./ProgramInnerTextPointComponent";
import Highlighter from "./SessionManager";
import { apiBaseUrlImage } from "src/constants/config";
import DefaultImage from "../icons/37.png";

const ProgramInnerType4Slide4 = ({ data }) => {
  return (
    <Grid
      dir="rtl"
      container
      // spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      paddingBottom={2}
      paddingY={"20px"}
      overflow="hidden"
      // minWidth={'500px'}
      width={"100%"}
      xs={12}
    >
      <Grid
        dir="rtl"
        container
        // columnSpacing={2}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        paddingBottom={1}
        overflow="hidden"
        // width={'50%'}
        xs={12}
        rowGap={1}>
        <div
          className="programInnerSlide6-headerContainer"
          style={{ alignSelf: "flex-start", marginRight: "10px" }}
        >
          <img
            className="programInnerSlide6-iconSubjectsList"
            src={
              data?.data?.img == ""
                ? DefaultImage
                : apiBaseUrlImage + data?.data?.img
            }
            alt=""
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <span className="programInner-label programInnerSlide6-titleHeader">
              <Highlighter>{data?.title}</Highlighter>
            </span>
          </div>
        </div>
      </Grid>

      {data?.data?.data?.map((item) => {
        return (
          <ProgramInnerTextPointComponent
            bgColor={item?.color}
            contentHtml={item?.description}
            marginX={"10px"}
            marginY={"10px"}
            width={"95%"}
          />
        );
      })}
    </Grid>
  );
};

export default ProgramInnerType4Slide4;
