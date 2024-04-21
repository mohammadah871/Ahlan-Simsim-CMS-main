import React, { useState } from "react";
import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide2.css";
import Grid from "@mui/material/Grid";

import DefaultImage from "../icons/5.png";

import TabsContainerType2 from "./TabsContainerType2";
import { apiBaseUrlImage } from "src/constants/config";

const ProgramInnerType2Slide3 = ({ data }) => {
  console.log("data=====", data?.data);

  return (
    <Grid
      dir="rtl"
      container
      // spacing={2}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      paddingBottom={2}
      paddingY={"20px"}
      overflow="hidden"
      // minWidth={'500px'}
      width={"100%"}
      height={"100%"}
      xs={12}
    >
      <div className="programInnerSlide2-headerContainer programInnerSlide2-extraTopPadding1">
        
        <img
          className="programInnerSlide2-iconTimeTable"
          src={
            data?.data?.img == ""
              ? DefaultImage
              : apiBaseUrlImage + data?.data?.img
          }
          alt=""
        />

        <span className="programInner-label programInnerSlide2-titleHeader">
          {data?.title}
        </span>
      </div>

      <TabsContainerType2 data={data?.data} />
    </Grid>
  );
};

export default ProgramInnerType2Slide3;
