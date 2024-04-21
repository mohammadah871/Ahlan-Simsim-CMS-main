import React, { useState } from "react";
import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide25.css";
import "./ProgramInnerSlide22.css";
import "./ProgramInnerSlide33.css";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import ProgramInnerBreafComponent from "./ProgramInnerBreafComponent";
import ProgramInnerBreafWithShareComponent from "./ProgramInnerBreafWithShareComponent";

const ProgramInnerSlide33 = ({ data }) => {
  return (
    <>
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
        xs={12}
      >
        <Box
          className="programInnerSlide33-container"
          sx={{
            overflow: "auto",
            scrollbarHeight: "thin",
            "&::-webkit-scrollbar": {
              height: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              //   background: "#f1f1f1",
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#cecece",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#888",
            },
          }}
        >
          {data?.data?.hide1 == false ? (
            <div className="programInnerSlide33-innerContainer">
              <span className="programInnerSlide33-title">{data?.title}</span>
              <ProgramInnerBreafComponent
                data={{
                  title: "",
                  contentHtml: data?.data?.description,
                }}
              />
            </div>
          ) : null}

          <div className="programInnerSlide33-innerContainer programInnerSlide33-marginTop">
            <span className="programInnerSlide33-title">
              {data?.data?.title2}
            </span>
            <ProgramInnerBreafWithShareComponent
              data={{
                title: "",
                contentHtml: data?.data?.description2,
              }}
              borderColor="#D2DAE266"
              bgColor={"#fff"}
            />
          </div>
        </Box>
      </Grid>
    </>
  );
};

export default ProgramInnerSlide33;