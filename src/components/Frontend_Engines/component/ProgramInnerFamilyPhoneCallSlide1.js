import React from "react";
import "./ProgramInnerScreen.css";
import Grid from "@mui/material/Grid";

import ProgramInnerTextComponent from "./ProgramInnerTextComponent";
import ProgrammInnerTextWithThumbComponent from "./ProgrammInnerTextWithThumbComponent";
import ProgramInnerBreafComponent from "./ProgramInnerBreafComponent";

import iconSessionDuration from "../icons/iconDuration.svg";
import iconTime from "../icons/iconTime.svg";
import iconAttendence from "../icons/iconAttendence.svg";
import iconFacilitator from "../icons/iconFacilitator.svg";
import iconPhone from "../icons/iconPhone.svg";
import iconParticipants from "../icons/iconParticipants.svg";

const ProgramInnerFamilyPhoneCallSlide1 = ({ data }) => {
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
      xs={12}>
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
        style={{ display: "flex", flexDirection: "row" }}
      >
        <ProgramInnerTextComponent
          data={{
            title: "المكّون:",
            description: data?.data?.title_1,
          }}
          fontBoldTitle={false}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <ProgrammInnerTextWithThumbComponent
            icon={iconSessionDuration}
            iconBgColor="#FF622F"
            data={{
              title: "مدّة الجلسة:",
              duration: data?.data?.title_3,
            }}
            width="auto"
            fontBold={true}
          />
          <ProgrammInnerTextWithThumbComponent
            icon={iconTime}
            iconBgColor="#3BC4FF"
            data={{
              title: "وقت التّحضير:",
              duration: data?.data?.title_4,
            }}
            width="auto"
            fontBold={true}
          />
        </div>
        <ProgrammInnerTextWithThumbComponent
          icon={iconAttendence}
          iconBgColor="#AECF55"
          data={{
            title: "تسجيل الحضور:",
            description: data?.data?.title_5,
            duration: "",
          }}
          isNextToTitle={true}
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
        style={{ display: "flex", flexDirection: "row" }}
      >
        <ProgramInnerTextComponent
          data={{
            title: "الموضوع: ",
            description: data?.data?.title_2,
          }}
          fontBoldTitle={false}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <ProgrammInnerTextWithThumbComponent
            icon={iconFacilitator}
            iconBgColor="#FFC800"
            data={{
              title: "عدد الميسّرين:",
              duration: "",
              description: data?.data?.title_7,
            }}
            width="43%"
            descriptionHeight="83px"
            isSameLine={true}
            fontBold={true}
          />

          <ProgrammInnerTextWithThumbComponent
            icon={iconParticipants}
            iconBgColor="#FD71AF"
            data={{
              title: "عدد المشاركين:",
              duration: "",
              description: data?.data?.title_9,
            }}
            width="43%"
            descriptionHeight="83px"
            isSameLine={true}
            fontBold={true}
          />
        </div>

        <ProgrammInnerTextWithThumbComponent
          icon={iconPhone}
          iconBgColor="#AECF55"
          data={{
            title: "وسيلة التواصُل:",
            description: data?.data?.title_6,
            duration: "",
          }}
          isNextToTitle={true}
          fontBold={true}
        />
      </Grid>

      <ProgramInnerBreafComponent
        data={{
          title: "نبذة سريعة عن الجلسة",
          description: data?.data?.title_10,
        }}
        bgColor={"transparent"}
      />
    </Grid>
  );
};

export default ProgramInnerFamilyPhoneCallSlide1;
