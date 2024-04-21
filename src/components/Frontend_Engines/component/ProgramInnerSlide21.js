import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide5.css";
import "./ProgramInnerSlide6.css";

import React, {  useEffect } from "react";
import { Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Highlighter from "./SessionManager";
import {  SetBgColor , apiBaseUrlImage } from "src/constants/config";
import DefaultImage from "../icons/4.png";
import ProgramInnerTextComponent from "./ProgramInnerTextComponent";

import AccordionNumberComponent from "./AccordionNumberComponent";
import DashedLineVerticalComponent from "./DashedLineVerticalComponent";

export default function ProgramInnerSlide21({ data }) {
  const [rows, setrows] = React.useState([]);

  const [dashedlineHeight, setDashedlineHeight] = React.useState('100%');
  const [arrExpanded, setArrExpanded] = React.useState([]);

  const createData = (name, description) => {
      return {
          name,
          description,
      };
  }

  useEffect(() => {
      let arr = [];
      let temp = [];
      data?.data?.data1?.forEach((element) => {
          temp.push(createData(element?.title, element?.contentHtml));
          arr.push(false);
      });
      setArrExpanded(arr);
      setrows([...temp]);
  }, [data]);

  useEffect(() => {
      if (!arrExpanded)
          return;
      if (arrExpanded[arrExpanded.length - 1] === false) {
          const el = document.getElementById('container_' + (arrExpanded.length - 1));
          if (!el)
              return;
          const rect = el.getBoundingClientRect();
          if (!rect)
              return;
          setDashedlineHeight(rect.height);
      }
      else
          setDashedlineHeight(0);
  }, [arrExpanded]);


  const handleChange = (index) => (event, isExpanded) => {
      let arr = [...arrExpanded];
      arr[index] = !arr[index];
      setArrExpanded(arr);
  };

  return (
      <Grid
          dir="rtl"
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          paddingBottom={2}
          paddingY={'20px'}
          overflow="hidden"
          width={'100%'}
          height={'100%'}
          xs={12}
      >

          <div className="programInnerSlide5-headerContainer">
              <img
                  className="programInnerSlide5-iconSubjectsList"
                  src={data?.data?.data2?.img === "" ? DefaultImage : apiBaseUrlImage + data?.data?.data2?.img}
                  alt=""
              />

              <span className="programInner-label programInnerSlide5-titleHeader">
                  <Highlighter>{data?.title}</Highlighter>
              </span>
              <ProgramInnerTextComponent
                  data={{
                      title: data?.data?.data2?.time,
                      description: "",
                  }}
                  width="auto"
                  bgColor={"rgba(255, 98, 47, .4)"}
                  paddingY="4px"
                  borderRadius="15px"
              />
          </div>


          <div style={{ display: 'flex', position: 'relative', width: '100%', flexDirection: 'column' }}>
              {arrExpanded?.length > 1 &&
                  < DashedLineVerticalComponent height={dashedlineHeight} />}

              {
                  rows.map((row, index) => {
                      return <Accordion /*expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}*/
                          id={'container_' + index}
                          expanded={arrExpanded[index]} onChange={handleChange(index)}
                          disableGutters={true}
                          // style={{ marginBlock: '5px', display: 'flex', width: '98%', backgroundColor: index % 2 === 0 ? 'rgba(251, 197, 145, .2)' : 'rgba(232, 149, 114, .25)', borderWidth: 0 }}
                          //style={{ marginBlock: '5px', display: 'flex', width: '98%', backgroundColor: index % 2 === 0 ? data?.data?.data2?.color2 + "12" : data?.data?.data2?.color1 + "24", borderWidth: 0 }}
                          sx={{
                              '&:before': {
                                  display: 'none',
                              }
                          }}
                          style={{ boxShadow: 'none', backgroundColor: 'transparent', marginBlock: '5px', display: 'flex', width: '98%', borderStyle: 'solid', borderColor: 'transparent', borderWidth: 0, }}
                      >
                          <div className="programInnerSlides-innerContainer" style={{ width: '100%' }}>
                              <AccordionNumberComponent number={index + 1} color={index % 2 === 0 ? data?.data?.data2?.color4 : data?.data?.data2?.color3} />

                              <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                                  // style={{ display: 'flex', width: '100%', marginTop: '3px', marginBottom: '3px' }}
                                  style={{ display: 'flex', width: '100%', backgroundColor: SetBgColor(index, index % 2 === 0 ? data?.data?.data2?.color2 : data?.data?.data2?.color1), borderRadius: '12px', borderColor: 'transparent', borderWidth: '0px', borderStyle: 'solid' }}
                              >
                                  <Typography sx={{ textAlign: 'right' }}
                                      style={
                                          //expanded !== 'panel' + index ?
                                          arrExpanded[index] === true ?
                                              {
                                                  // width: '320px',
                                                  width: '23vw',
                                                  whiteSpace: 'nowrap', /* Keeps the text on one line */
                                                  overflow: 'hidden', /* Hides the overflow */
                                                  textOverflow: 'ellipsis', /* Adds the three dots at the end */
                                                  // backgroundColor: 'yellow',
                                                  paddingLeft: '5px',
                                                  paddingRight: '5px',
                                                  fontFamily: 'medium',
                                                  fontSize: '13px',
                                                  textAlign: 'right',
                                                  lineHeight:"26px"

                                              }
                                              :
                                              {
                                                  display: 'flex',
                                                  // width: '320px',
                                                  width: '23vw',
                                                  //backgroundColor: 'red',
                                                  paddingLeft: '5px',
                                                  paddingRight: '5px',
                                                  fontFamily: 'medium',
                                                  fontSize: '13px',
                                                  textAlign: 'right',
                                                  lineHeight:"26px"

                                              }
                                      }
                                  >
                                      {
                                          row?.name
                                      }
                                      {/* <Highlighter>{
                                      row.name
                                  }</Highlighter> */}
                                  </Typography>
                                  <Typography component={'span'} sx={{ marginX: '12px' }}>
                                      <div className="programInnerSlides-verticalSplitter" />
                                  </Typography>
                                  <Typography sx={{ textAlign: 'right' }}
                                      component={'span'}
                                      style={
                                          //expanded !== 'panel' + index ?
                                          arrExpanded[index] === true ?
                                              {
                                                  // width: '640px',
                                                  // width: '44vw',
                                                  width: '65%',
                                                  // whiteSpace: 'nowrap', /* Keeps the text on one line */
                                                  // overflow: 'hidden', /* Hides the overflow */
                                                  textOverflow: 'ellipsis', /* Adds the three dots at the end */
                                                  paddingLeft: '5px',
                                                  paddingRight: '5px',
                                                  fontFamily: 'medium',
                                                  fontSize: '13px',
                                                  height: '25px',
                                                  maxHeight: '25px',
                                                  overflow: 'clip',
                                                  textAlign: 'right',
                                                  lineHeight:"26px"
                                              }
                                              :
                                              {
                                                  // display: 'flex',
                                                  // // width: '640px',
                                                  // width: '44vw',
                                                  width: '65%',
                                                  //backgroundColor: 'pink',
                                                  paddingLeft: '5px',
                                                  paddingRight: '5px',
                                                  fontFamily: 'medium',
                                                  fontSize: '13px',
                                                  textAlign: 'right'
                                              }
                                      }
                                  >
          
                                      <div
                                          style={{  }}
                                          dangerouslySetInnerHTML={{ __html: row?.description }}
                                      />
                                      {
                                          arrExpanded[index] === true && row.description.length > 130 ? '...' : ''
                                      }
                                  </Typography>
                              </AccordionSummary>
                          </div>
                      </Accordion>
                  })
              }
          </div>

      </Grid >
  );
}