import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide3.css";
import "./ProgramInnerSlide6.css";

import React, { useEffect } from "react";
import { AccordionDetails, Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import iconPhoneCall from "../icons/iconPhoneCall.svg";
import ProgramInnerTextComponent from "./ProgramInnerTextComponent";
import iconSpeakerMale from "../icons/IconSpeakerMale.svg";
import iconSpeakerFemale from "../icons/iconSpeakerFemale.svg";
import iconFamily from "../icons/iconFamily.svg";
import iconBoy from "../icons/iconBoy.svg";
import iconGirl from "../icons/iconGirl.svg";
import SpeakerIconComponent from "./componentSlide4Type2/SpeakerIconComponent";
import Highlighter from "./SessionManager";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {SetBgColor, apiBaseUrlImage } from "src/constants/config";
import DefaultImage from "../icons/8.png";



import AccordionNumberComponent from "./AccordionNumberComponent";
import DashedLineVerticalComponent from "./DashedLineVerticalComponent";




const ProgramInnerFamilyPhoneCallSlide2 = ({ data }) => {
  //console.log('## data', JSON.stringify(data))
  const [rows, setrows] = React.useState([]);

  const [dashedlineHeight, setDashedlineHeight] = React.useState('100%');
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
          temp.push(createData(element?.title, element?.contentHtml));
          arr.push(true);
      });
      setArrExpanded(arr);
      setrows([...temp]);
  }, [data]);

  useEffect(() => {
      // if (dashedlineHeight > 0)
      //     return;
      if (!arrExpanded)
          return;
      if (arrExpanded[arrExpanded.length - 1] === true) {
          const el = document.getElementById('container_' + (arrExpanded.length - 1));
          if (!el)
              return;
          const rect = el.getBoundingClientRect();
          if (!rect)
              return;
          setDashedlineHeight(rect.height + 41);
      }
      else
          setDashedlineHeight(0);
  }, [arrExpanded]);


  // const handleChange = (panel) => (event, isExpanded) => {
  //     setExpanded(isExpanded ? panel : false);
  // };

  const handleChange = (index) => (event, isExpanded) => {
      let arr = [...arrExpanded];
      arr[index] = !arr[index];
      setArrExpanded(arr);
  };

  const addAlpha = (hexColor, opacity) => {
      var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
      return hexColor + _opacity.toString(16).toUpperCase();
  }

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

  const getTable = (id) => {
      const roots = data?.data?.table.filter((item) => item.root_id === id);
      return roots;
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
          width={"100%"}
          height={"100%"}
          xs={12}
      >
          <div className="programInnerSlide6-headerContainer">

              <img
                  className="programInnerSlide6-iconSubjectsList"
                  src={data?.data?.img === "" ? DefaultImage : apiBaseUrlImage + data?.data?.img}
                  // src={iconTarget}
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
                  bgColor={addAlpha(
                      data.timeBgColor ? data.timeBgColor : "#AECF55",
                      0.4
                  )}
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
              {arrExpanded?.length > 1 &&
                  < DashedLineVerticalComponent height={dashedlineHeight} />}

              {rows?.map((row, index) => {
                  return (
                      <Accordion
                          // expanded={expanded === "panel" + index}
                          // onChange={handleChange("panel" + index)}
                          expanded={arrExpanded[index]}
                          onChange={handleChange(index)}
                          disableGutters={true}
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

                          <div className="programInnerSlides-innerContainer" style={{ width: '100%' }}>
                              <AccordionNumberComponent number={index + 1} color={index % 2 === 0 ? data?.data?.data2?.color6 : data?.data?.data2?.color5} />

                              <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                                  style={{
                                      display: "flex",
                                      width: "100%",
                                      backgroundColor:
                                          SetBgColor(index, index % 2 === 0
                                              ? data?.data?.data2?.color2
                                              : data?.data?.data2?.color1),
                                      borderRadius: "12px",
                                      borderColor: "transparent",
                                      borderWidth: "0px",
                                      borderStyle: "solid",
                                  }}
                              >
                                  <Typography
                                      sx={{ textAlign: "right" }}
                                      style={
                                          // expanded !== "panel" + index
                                          arrExpanded[index] === true
                                              ? {
                                                  width: "auto",
                                                  paddingLeft: "5px",
                                                  paddingRight: "5px",
                                                  fontFamily: "medium",
                                                  fontSize: "13px",
                                                  textAlign: "right",
                                              }
                                              : {
                                                  display: "flex",
                                                  width: "auto",
                                                  paddingLeft: "5px",
                                                  paddingRight: "5px",
                                                  fontFamily: "medium",
                                                  fontSize: "13px",
                                                  textAlign: "right",
                                              }
                                      }
                                  >
                                      {row?.name}
                                  </Typography>
                                  <Typography
                                      component={'span'}
                                      sx={{ textAlign: "right" }}
                                      style={
                                          //expanded !== "panel" + index
                                          arrExpanded[index] === true
                                              ? {
                                                  // width: "640px",
                                                  // whiteSpace: "nowrap" /* Keeps the text on one line */,
                                                  // overflow: "hidden" /* Hides the overflow */,
                                                  textOverflow:
                                                      "ellipsis" /* Adds the three dots at the end */,
                                                  paddingLeft: "5px",
                                                  paddingRight: "5px",
                                                  fontFamily: "medium",
                                                  fontSize: "13px",
                                                  height: "25px",
                                                  maxHeight: "25px",
                                                  overflow: "clip",
                                              }
                                              : {
                                                  // display: "flex",
                                                  // width: "640px",
                                                  paddingLeft: "5px",
                                                  paddingRight: "5px",
                                                  fontFamily: "medium",
                                                  fontSize: "13px",
                                              }
                                      }
                                  >
                                      <div
                                          style={{ marginTop: -10 }}
                                          dangerouslySetInnerHTML={{ __html: row?.description }}
                                      />
                                  </Typography>
                              </AccordionSummary>
                          </div>

                          <AccordionDetails id={'container_' + index}>
                              <Typography>
                                  <div className="programInnerSlide6-callContainer">
                                      <div className="programInnerSlide6-phoneIconContainer">
                                          <img
                                              src={iconPhoneCall}
                                              alt=""
                                              className="programInnerSlide6-phoneIcon"
                                          />
                                      </div>
                                      {data?.data?.data1[index]?.conversation.map(
                                          (_item, conversationIndex) => {
                                              return (
                                                  <>
                                                      <SpeakerIconComponent
                                                          item={_item}
                                                          bgColor={data.data.bgColors[_item.type - 1]}
                                                          icon={onLoadSpeaker(
                                                              _item.speaker,
                                                              conversationIndex,
                                                              index
                                                          )}
                                                      />

                                                      {(_item?.column1 !== "") &
                                                          (_item?.column2 !== "") &
                                                          (_item?.column3 !== "") &
                                                          (_item?.column4 !== "") ? (
                                                          <TableContainer sx={{ height: "100%" }}>
                                                              <Table stickyHeader aria-label="sticky table">
                                                                  <TableHead>
                                                                      <TableRow>
                                                                          <TableCell
                                                                              align={"right"}
                                                                              className="programInner-label programInnerSlide3-titleHeader"
                                                                              style={{
                                                                                  width: "25%",
                                                                                  backgroundColor: "#F2F4FD",
                                                                                  fontSize: "16px",
                                                                                  paddingX: "3px",
                                                                                  fontFamily: "Medium",
                                                                                  textAlign: "right",
                                                                              }}
                                                                              sx={{
                                                                                  border:
                                                                                      "1px solid rgba(210, 218, 226,.4)",
                                                                              }}
                                                                          >
                                                                              <Highlighter>
                                                                                  {_item?.column1}
                                                                              </Highlighter>
                                                                          </TableCell>

                                                                          <TableCell
                                                                              align={"right"}
                                                                              className="programInner-label programInnerSlide3-titleHeader"
                                                                              style={{
                                                                                  width: "25%",
                                                                                  backgroundColor: "#F2F4FD",
                                                                                  fontSize: "16px",
                                                                                  paddingX: "3px",
                                                                                  fontFamily: "Medium",
                                                                                  textAlign: "right",
                                                                              }}
                                                                              sx={{
                                                                                  border:
                                                                                      "1px solid rgba(210, 218, 226,.4)",
                                                                              }}
                                                                          >
                                                                              <Highlighter>
                                                                                  {_item?.column2}
                                                                              </Highlighter>
                                                                          </TableCell>

                                                                          <TableCell
                                                                              align={"right"}
                                                                              className="programInner-label programInnerSlide3-titleHeader"
                                                                              style={{
                                                                                  width: "25%",
                                                                                  backgroundColor: "#F2F4FD",
                                                                                  fontSize: "16px",
                                                                                  paddingX: "3px",
                                                                                  fontFamily: "Medium",
                                                                                  textAlign: "right",
                                                                              }}
                                                                              sx={{
                                                                                  border:
                                                                                      "1px solid rgba(210, 218, 226,.4)",
                                                                              }}
                                                                          >
                                                                              <Highlighter>
                                                                                  {_item?.column3}
                                                                              </Highlighter>
                                                                          </TableCell>

                                                                          <TableCell
                                                                              align={"right"}
                                                                              className="programInner-label programInnerSlide3-titleHeader"
                                                                              style={{
                                                                                  width: "25%",
                                                                                  backgroundColor: "#F2F4FD",
                                                                                  fontSize: "16px",
                                                                                  paddingX: "3px",
                                                                                  fontFamily: "Medium",
                                                                                  textAlign: "right",
                                                                              }}
                                                                              sx={{
                                                                                  border:
                                                                                      "1px solid rgba(210, 218, 226,.4)",
                                                                              }}
                                                                          >
                                                                              <Highlighter>
                                                                                  {_item?.column4}
                                                                              </Highlighter>
                                                                          </TableCell>
                                                                      </TableRow>
                                                                  </TableHead>
                                                              </Table>
                                                          </TableContainer>
                                                      ) : null}

                                                      {getTable(_item?.id).map((item, index) => {
                                                          return (_item?.contentHtml_1 !== "") &
                                                              (_item?.contentHtml_2 !== "") &
                                                              (_item?.contentHtml_3 !== "") &
                                                              (_item?.contentHtml_4 !== "") ? (
                                                              <TableContainer sx={{ height: "100%" }}>
                                                                  <Table stickyHeader aria-label="sticky table">
                                                                      <TableBody>
                                                                          <TableRow
                                                                              hover
                                                                              role="checkbox"
                                                                              tabIndex={-1}
                                                                              key={1}
                                                                          >
                                                                              <TableCell
                                                                                  key={1}
                                                                                  align={"right"}
                                                                                  className="programInnerSlide3-descriptionHeader"
                                                                                  style={{
                                                                                      fontSize: "13px",
                                                                                      fontFamily: "Medium",
                                                                                      verticalAlign: "top",
                                                                                      paddingTop: 25,
                                                                                      textAlign: "right",
                                                                                      width: "25%",
                                                                                  }}
                                                                                  sx={{
                                                                                      border:
                                                                                          "1px solid rgba(210, 218, 226,.4)",
                                                                                      backgroundColor: "white",
                                                                                  }}
                                                                              >
                                                                                  <div
                                                                                      style={{ marginRight: 10 }}
                                                                                      dangerouslySetInnerHTML={{
                                                                                          __html: item?.contentHtml_1,
                                                                                      }}
                                                                                  />
                                                                              </TableCell>

                                                                              <TableCell
                                                                                  key={1}
                                                                                  align={"right"}
                                                                                  style={{
                                                                                      fontSize: "13px",
                                                                                      fontFamily: "Medium",
                                                                                      verticalAlign: "top",
                                                                                      padding: 25,
                                                                                      textAlign: "right",
                                                                                      width: "25%",
                                                                                  }}
                                                                                  sx={{
                                                                                      border:
                                                                                          "1px solid rgba(210, 218, 226,.4)",
                                                                                      backgroundColor: "white",
                                                                                  }}
                                                                              >
                                                                                  <div
                                                                                      style={{ marginRight: 10 }}
                                                                                      dangerouslySetInnerHTML={{
                                                                                          __html: item?.contentHtml_2,
                                                                                      }}
                                                                                  />
                                                                              </TableCell>

                                                                              <TableCell
                                                                                  key={1}
                                                                                  align={"right"}
                                                                                  className="programInnerSlide3-descriptionHeader"
                                                                                  style={{
                                                                                      fontSize: "13px",
                                                                                      fontFamily: "Medium",
                                                                                      verticalAlign: "top",
                                                                                      padding: 25,
                                                                                      textAlign: "right",
                                                                                      width: "25%",
                                                                                  }}
                                                                                  sx={{
                                                                                      border:
                                                                                          "1px solid rgba(210, 218, 226,.4)",
                                                                                      backgroundColor: "white",
                                                                                  }}
                                                                              >
                                                                                  <div
                                                                                      style={{ marginRight: 10 }}
                                                                                      dangerouslySetInnerHTML={{
                                                                                          __html: item?.contentHtml_3,
                                                                                      }}
                                                                                  />
                                                                              </TableCell>

                                                                              <TableCell
                                                                                  key={1}
                                                                                  align={"right"}
                                                                                  className="programInnerSlide3-descriptionHeader"
                                                                                  style={{
                                                                                      fontSize: "13px",
                                                                                      fontFamily: "Medium",
                                                                                      verticalAlign: "top",
                                                                                      padding: 25,
                                                                                      textAlign: "right",
                                                                                      width: "25%",
                                                                                  }}
                                                                                  sx={{
                                                                                      border:
                                                                                          "1px solid rgba(210, 218, 226,.4)",
                                                                                      backgroundColor: "white",
                                                                                  }}
                                                                              >
                                                                                  <div
                                                                                      style={{ marginRight: 10 }}
                                                                                      dangerouslySetInnerHTML={{
                                                                                          __html: item?.contentHtml_4,
                                                                                      }}
                                                                                  />
                                                                              </TableCell>
                                                                          </TableRow>
                                                                      </TableBody>
                                                                  </Table>
                                                              </TableContainer>
                                                          ) : null;
                                                      })}
                                                  </>
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

export default ProgramInnerFamilyPhoneCallSlide2;