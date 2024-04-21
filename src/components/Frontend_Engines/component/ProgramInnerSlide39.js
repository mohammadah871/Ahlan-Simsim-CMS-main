import React, { useState } from "react";
import "./ProgramInnerScreen.css";
import Grid from "@mui/material/Grid";

import ProgramInnerTextPointComponent from "./ProgramInnerTextPointComponent";
import Highlighter from "./SessionManager";
import { apiBaseUrlImage } from "src/constants/config";
import DefaultImage from "../icons/38.png";

const ProgramInnerType4Slide4 = ({ data }) => {
  const Preview = () => {
    window.open(apiBaseUrlImage + data?.data?.pdf, "_blank");
  };

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
        rowGap={1}
      >
        <div
          className="programInnerSlide6-headerContainer"
          style={{
            height: "100%",
            display: "flex",
            alignSelf: "center",
            justifyItems: "center",
            justifyContent: "center",
            alignItems: "center",
           marginTop:100
          }}
        >
          <span
            style={{
              fontSize: 30,
              color: "#000",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => Preview()}
          >
            Preview
          </span>
        </div>
      </Grid>
    </Grid>
  );
};

export default ProgramInnerType4Slide4;
