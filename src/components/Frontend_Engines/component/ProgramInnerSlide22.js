import React, { useState } from "react";
import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide22.css";
import Grid from "@mui/material/Grid";

import ProgrammInnerTextWithThumbComponent from "./ProgrammInnerTextWithThumbComponent";

import iconActivity from "../icons/iconActivity.svg";
import iconLocation from "../icons/iconLocation.svg";
import iconHash from "../icons/iconHash.svg";
import iconTimeCircle from "../icons/iconTimeCircle.svg";
import iconTarget2 from "../icons/iconTarget2.svg";
import ProgramInnerCircularComponent from "./ProgramInnerCircularComponent";
import { Box } from "@mui/material";

const ProgramInnerSlide22 = ({ data }) => {

  return (
    <Grid
      dir="rtl"
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      paddingBottom={2}
      paddingY={"20px"}
      overflow="hidden"
      width={"100%"}
      xs={12}
    >
      <Grid
        dir="rtl"
        container
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
            duration: data?.data?.title_1,
          }}
          fontBold={true}
        />

        <ProgrammInnerTextWithThumbComponent
          icon={iconLocation}
          iconBgColor="#FD71AF"
          data={{
            title: "مكان التنفيذ:",
            description: data?.data?.title_4,
            duration: "",
          }}
          isSameLine={true}
          fontBold={true}
        />
      </Grid>

      <Grid
        dir="rtl"
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        overflow="hidden"
        width={"50%"}
        xs={6}
        columnSpacing={"2px"}
        rowGap={"8px"}
      >
        <Grid
          dir="rtl"
          container
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
              duration: data?.data?.title_2,
              description: "",
            }}
            width="43%"
            fontBold={true}
          />

          <ProgrammInnerTextWithThumbComponent
            icon={iconTimeCircle}
            iconBgColor="#FF622F"
            data={{
              title: "مدة النشاط:",
              duration: data?.data?.title_3,
              description: "",
              
            }}
            width="43%"
            fontBold={true}
          />
        </Grid>
      </Grid>

      <ProgrammInnerTextWithThumbComponent
        icon={iconTarget2}
        iconBgColor="#3BC4FF"
        bgColor={"transparent"}
        data={{
          title: "أهداف النشاط",
          duration: data?.data?.title_5,
          duration:  "يتوقع من الأهل بعد الانتهاء من هذا النشاط أن يكونوا قادرين على:",
        }}
        width="95%"
        fontBold={true}
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
        {data?.data?.goals.map((item, index) => {
            return (
              <ProgramInnerCircularComponent
                size={"177px"}
                borderRadius={"120px"}
                textAlign={"right"}
                textWidth="95%"
                bgColor={"#7B68EE20"}
                data={item.contentHtml}
              />
            );
          })}
      </Box>
    </Grid>
  );
};

export default ProgramInnerSlide22;
