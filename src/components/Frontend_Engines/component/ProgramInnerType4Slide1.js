import React, { useState } from "react";
import "./ProgramInnerScreen.css";
import Grid from "@mui/material/Grid";

import ProgramInnerTextComponent from "./ProgramInnerTextComponent";
import ProgrammInnerTextWithThumbComponent from "./ProgrammInnerTextWithThumbComponent";

import iconSessionDuration from "../icons/iconDuration.svg";
import iconAgeGroup from "../icons/iconAgeGroup.svg";
import iconProfile from "../icons/iconProfile.svg";
import iconTarget from "../icons/iconTarget.svg";
import iconParticipants from "../icons/iconParticipants.svg";

import Image13 from "../icons/13.png";
import Image14 from "../icons/14.png";
import Image15 from "../icons/15.png";


const ProgramInnerType4Slide1 = ({ data }) => {
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
        width={"50%"}
        xs={6}
        rowGap={1}
        style={{display:"flex",flexDirection:"row"}}
      >
        <ProgramInnerTextComponent
          data={{
            title: "المجال  النَّمائيُّ:",
            description: data?.data?.title_1,
          }}
          width={"92%"}
          fontBoldTitle={false}

        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "92%",
          }}
        >
          <ProgrammInnerTextWithThumbComponent
            icon={iconSessionDuration}
            iconBgColor="#FF622F"
            data={{
              title:"مدّة النشاط:",
              duration: data?.data?.title_3,
            }}
            width="auto"
            fontBold={true}
          />
          <ProgrammInnerTextWithThumbComponent
            icon={iconAgeGroup}
            iconBgColor="#FFC800"
            data={{
              title: "العمر المناسب:",
              duration: data?.data?.title_4,
            }}
            width="auto"
            fontBold={true}
          />
        </div>
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
        columnSpacing={"2x"}
        rowGap={"8px"}
  
      >
        <ProgramInnerTextComponent
          data={{
            title: "الموضوع:",
            description: data?.data?.title_2,
          }}
          width={"92%"}
          fontBoldTitle={false}

        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "92%",
          }}
        >
          <ProgrammInnerTextWithThumbComponent
            icon={iconParticipants}
            iconBgColor="#FD71AF"
            data={{
              title: "عدد المشاركين:",
              duration: data?.data?.title_5,
              description: "",
            }}
            width="auto"
            fontBold={true}
          />
        </div>
      </Grid>

      <Grid
        dir="rtl"
        container
        // spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        paddingBottom={1}
        // paddingX={'15px'}
        overflow="hidden"
        width={"100%"}
        // xs={12}
      >
        <ProgrammInnerTextWithThumbComponent
          icon={Image13}
          iconBgColor="#AECF55"
          data={{
            title: "المساحة المطلوبة:",
            description: data?.data?.title_7,
            duration: "",
          }}
          isSameLine={true}
          isNextToTitle={true}
          width={"46%"}
          fontBold={true}
        />
        <ProgrammInnerTextWithThumbComponent
          icon={Image14}
          iconBgColor="#AECF55"
          data={{
            title: "الترتيب:",
            description: data?.data?.title_9,
            duration: "",
          }}
          isSameLine={true}
          isNextToTitle={true}
          width={"48%"}
          fontBold={true}
        />
      </Grid>

      <ProgrammInnerTextWithThumbComponent
        icon={Image15}
        iconBgColor="#3BC4FF"
        data={{
          title: "أهداف النشاط:",
          description: data?.data?.title_10,
          duration: "",
        }}
        isSameLine={true}
        isNextToTitle={true}
        width={"100%"}
        fontBold={true}
      />
    </Grid>
  );
};

export default ProgramInnerType4Slide1;
