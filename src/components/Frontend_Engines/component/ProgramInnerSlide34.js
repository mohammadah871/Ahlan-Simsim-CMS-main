import React, { useState } from "react";
import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide22.css";
import "./ProgramInnerSlide23.css";
import Grid from "@mui/material/Grid";

import ProgrammInnerTextWithThumbComponent from "./ProgrammInnerTextWithThumbComponent";

import iconActivity from "../icons/iconActivity.svg";
import iconHash from "../icons/iconHash.svg";
import iconTimeCircle from "../icons/iconTimeCircle.svg";
import iconTarget2 from "../icons/iconTarget2.svg";
import ProgramInnerCircularComponent from "./ProgramInnerCircularComponent";
import { Box } from "@mui/material";
import ProgramInnerTextComponent from "./ProgramInnerTextComponent";
import ProgramInnerBubbleComponent from "./ProgramInnerBubbleComponent";

const ProgramInnerSlide34 = ({ data }) => {
  // console.log('!!!!!ProgramInnerSlide34', JSON.stringify(data))
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
        paddingBottom={2}
        overflow="hidden"
        width={"50%"}
        xs={6}
        rowGap={1}
      >
        <ProgrammInnerTextWithThumbComponent
          icon={iconActivity}
          iconBgColor="#AECF55"
          data={{
            title: "اسم النشاط:",
            duration: data?.data?.title_2,
          }}
        />
      </Grid>

      <Grid
        dir="rtl"
        container
        // columnSpacing={2}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        // paddingBottom={2}
        overflow="hidden"
        width={"50%"}
        xs={6}
        columnSpacing={"2px"}
        rowGap={"8px"}
      >
        <Grid
          dir="rtl"
          container
          // spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          overflow="hidden"
          minWidth={"500px"}
          paddingX={"2px"}
          width={"90%"}
          height={"100%"}
          xs={12}
        >
          <ProgrammInnerTextWithThumbComponent
            icon={iconHash}
            iconBgColor="#FFC800"
            data={{
              title: "رقم النشاط:",
              duration: data?.data?.title_3,
              description: "",
            }}
            width="43%"
          />

          <ProgrammInnerTextWithThumbComponent
            icon={iconTimeCircle}
            iconBgColor="#FF622F"
            data={{
              title: "مدة النشاط:",
              duration: data?.data?.title_4,
              description: "",
            }}
            width="43%"
          />
        </Grid>
      </Grid>

      <div className="programInnerSlide23-seperatorHorizontal" />

      <ProgrammInnerTextWithThumbComponent
        icon={iconTarget2}
        iconBgColor="#3BC4FF"
        bgColor={"transparent"}
        data={{
          title: "أهداف النشاط",
          description: data?.data?.title_1,
        }}
        isSameLine={true}
        width="95%"
      />

      <Box
        className="programInnerSlide22-goalsContainer"
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
        {data?.data?.goals &&
          data?.data?.goals.map((item, index) => {
            return (
              <ProgramInnerCircularComponent
                size={"200px"}
                borderRadius={"120px"}
                textAlign={"center"}
                textWidth="95%"
                bgColor={"#7B68EE20"}
                data={item.contentHtml}
              />
            );
          })}
      </Box>

      <div className="programInnerSlide23-seperatorHorizontal" />

      <ProgramInnerTextComponent
        data={{
          title: data?.data?.title_section_2,
        }}
        width={"95%"}
        bgColor={"transparent"}
      />

      <Box
        className="programInnerSlide22-goalsContainer"
        sx={{
          overflow: "auto",
          overflowY: "hidden",
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
        {data?.data?.notes &&
          data?.data?.notes.map((item, index) => {
            return (
              <ProgramInnerBubbleComponent
                index={index}
                textAlign={"right"}
                textWidth="95%"
                data={item.contentHtml}
              />
            );
          })}
      </Box>
    </Grid>
  );
};

export default ProgramInnerSlide34;