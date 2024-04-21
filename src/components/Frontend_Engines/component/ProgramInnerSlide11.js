import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide6.css";

import * as React from "react";
import { AccordionDetails, Grid } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import iconOneGreen from "../icons/iconOneGreen.svg";
import iconPhoneCall from "../icons/iconPhoneCall.svg";
import Highlighter from "./SessionManager";
import { useEffect, useState } from "react";
import ProgramInnerTextComponent from "./ProgramInnerTextComponent";

import iconSpeakerMale from "../icons/IconSpeakerMale.svg";
import iconSpeakerFemale from "../icons/iconSpeakerFemale.svg";
import iconFamily from "../icons/iconFamily.svg";
import iconBoy from "../icons/iconBoy.svg";
import iconGirl from "../icons/iconGirl.svg";
import SpeakerIconComponent from "./SpeakerIconComponent";
import { SetBgColor, apiBaseUrlImage } from "src/constants/config";
import DefaultImage from "../icons/8.png";

import AccordionNumberComponent from "./AccordionNumberComponent";
import DashedLineVerticalComponent from "./DashedLineVerticalComponent";

export default function ProgramInnerType2Slide4({ data }) {
  const [rows, setrows] = React.useState([]);

  const [dashedlineHeight, setDashedlineHeight] = React.useState("100%");
  const [arrExpanded, setArrExpanded] = React.useState([]);

  const createData = (name, description) => {
    return {
      name,
      description,
    };
  };

  useEffect(() => {
    if (!data) return;
    let arr = [];
    let temp = [];
    data?.data?.data1?.forEach((element) => {
      temp.push(createData(element?.title, element?.description));
      arr.push(true);
    });
    setArrExpanded(arr);
    setrows([...temp]);
  }, [data]);

  useEffect(() => {
    // if (dashedlineHeight > 0)
    //     return;
    if (!arrExpanded) return;
    if (arrExpanded[arrExpanded.length - 1] === true) {
      const el = document.getElementById(
        "container_" + (arrExpanded.length - 1)
      );
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (!rect) return;
      setDashedlineHeight(rect.height + 41);
    } else setDashedlineHeight(0);
  }, [arrExpanded]);

  const handleChange = (index) => (event, isExpanded) => {
    let arr = [...arrExpanded];
    arr[index] = !arr[index];
    setArrExpanded(arr);
  };

  const addAlpha = (hexColor, opacity) => {
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return hexColor + _opacity.toString(16).toUpperCase();
  };

  const onLoadSpeaker = (speaker, conversationIndex, index) => {
    if (conversationIndex > 0) {
      if (
        data?.data?.data1[index].conversation[conversationIndex - 1].speaker ===
        speaker
      )
        return null;
    }

    switch (speaker) {
      case "speakerMale":
        return iconSpeakerMale;
      case "speakerFemale":
        return iconSpeakerFemale;
      case "family":
        return iconFamily;
      case "boy":
        return iconBoy;
      case "girl":
        return iconGirl;
      default:
        return iconSpeakerMale;
    }
  };

  return (
    <Grid
      dir="rtl"
      container
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
      <div className="programInnerSlide6-headerContainer">
        <img
          className="programInnerSlide6-iconSubjectsList"
          src={
            data?.data?.img === ""
              ? DefaultImage
              : apiBaseUrlImage + data?.data?.img
          }
          alt=""
        />
        <span className="programInner-label programInnerSlide6-titleHeader">
          <Highlighter>{data?.title}</Highlighter>
        </span>
        <ProgramInnerTextComponent
          data={{
            title: data?.data?.time,
            description: "",
          }}
          width="auto"
          bgColor={addAlpha("#AECF55", 0.4)}
          paddingY="4px"
          borderRadius="15px"
        />
      </div>

      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          flexDirection: "column",
        }}
      >
        {arrExpanded?.length > 1 && (
          <DashedLineVerticalComponent height={dashedlineHeight} />
        )}

        {rows &&
          rows.map((row, index) => {
            return (
              <Accordion
                expanded={arrExpanded[index]}
                onChange={handleChange(index)}
                disableGutters={true}
                // style={{ marginBlock: '5px', display: 'flex', width: '98%', backgroundColor: index % 2 === 0 ? 'rgba(251, 197, 145, .2)' : 'rgba(232, 149, 114, .25)', borderWidth: 0 }}
                elevation={0}
                sx={{
                  "&:before": {
                    display: "none",
                  },
                }}
                style={{
                  boxShadow: "none",
                  backgroundColor: "transparent",
                  marginBlock: "5px",
                  display: "flex",
                  width: "98%",
                  borderWidth: 0,
                  flexDirection: "column",
                  borderStyle: "solid",
                  borderColor: "transparent",
                }}
              >
                <div
                  className="programInnerSlides-innerContainer"
                  style={{ width: "100%" }}
                >
                  <AccordionNumberComponent
                    number={index + 1}
                    color={
                      index % 2 === 0
                        ? data?.data?.data2?.color6
                        : data?.data?.data2?.color5
                    }
                  />

                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    style={{
                      display: "flex",
                      width: "100%",
                      backgroundColor: SetBgColor(
                        index,
                        index % 2 === 0
                          ? data?.data?.data2?.color2
                          : data?.data?.data2?.color1
                      ),
                      borderRadius: "12px",
                      borderColor: "transparent",
                      borderWidth: "0px",
                      borderStyle: "solid",
                    }}
                  >
                    <Typography
                      sx={{ textAlign: "right" }}
                      style={
                        arrExpanded[index] === true
                          ? {
                              // width: '100px',
                              // width: '67vw',
                              // width: '90%',
                              // whiteSpace: 'nowrap', /* Keeps the text on one line */
                              overflow: "hidden" /* Hides the overflow */,
                              textOverflow:
                                "ellipsis" /* Adds the three dots at the end */,
                              // backgroundColor: 'yellow',
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              fontFamily: "medium",
                              fontSize: "13px",
                              textAlign: "right",
                              lineHeight: "26px",
                            }
                          : {
                              // display: 'flex',
                              // // width: '100px',
                              // width: '67vw',
                              // width: '90%',
                              // backgroundColor: 'red',
                              paddingLeft: "5px",
                              paddingRight: "5px",
                              fontFamily: "medium",
                              fontSize: "13px",
                              textAlign: "right",
                              lineHeight: "26px",
                            }
                      }
                    >
                      {row?.name}
                    </Typography>
                  </AccordionSummary>
                </div>
                <AccordionDetails id={"container_" + index}>
                  <Typography>
                    <div className="programInnerSlide6-callContainer">
                      <div className="programInnerSlide6-phoneIconContainer">
                        <img
                          src={iconPhoneCall}
                          alt=""
                          className="programInnerSlide6-phoneIcon"
                        />
                      </div>
                      {data?.data?.data1[index]?.conversation?.map(
                        (_item, conversationIndex) => {
                          return (
                            <SpeakerIconComponent
                              item={_item}
                              bgColor={data.data.bgColors[_item.type - 1]}
                              icon={onLoadSpeaker(
                                _item.speaker,
                                conversationIndex,
                                index
                              )}
                            />
                          );
                        }
                      )}
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </div>
    </Grid>
  );
}
