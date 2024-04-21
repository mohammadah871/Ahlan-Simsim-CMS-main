import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide6.css";
import "./ProgramInnerSlide23.css";
import "./ProgramInnerSlide25.css";
import "./ProgramInnerSlide27.css";

import * as React from "react";
import { useEffect } from "react";

import { Box, Grid } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import iconPrepare2 from "../icons/iconPrepare2.svg";
import Highlighter from "./SessionManager";
import ProgramInnerStickyNoteComponent from "./ProgramInnerStickyNoteComponent";
import { SetBgColor, apiBaseUrlImage } from "src/constants/config";
import AccordionNumberComponent from "./AccordionNumberComponent";
import DashedLineVerticalComponent from "./DashedLineVerticalComponent";



export default function ProgramInnerSlide27({ data }) {
  //console.log('data', JSON.stringify(data))
  const [rows, setrows] = React.useState([]);

  const [dashedlineHeight, setDashedlineHeight] = React.useState('100%');
  const [arrExpanded, setArrExpanded] = React.useState([]);

  const createData = (description) => {
      return {
          description,
      };
  }

  useEffect(() => {
      let arr = [];
      let temp = [];
      data?.data?.data1?.forEach((element) => {
          temp.push(createData(element?.contentHtml));
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


  // const handleChange = (panel) => (event, isExpanded) => {
  //     setExpanded(isExpanded ? panel : false);
  // };

  const handleChange = (index) => (event, isExpanded) => {
      let arr = [...arrExpanded];
      arr[index] = !arr[index];
      setArrExpanded(arr);
  };

  const renderReadMore = (index) => {

      // console.log("hereeeee " + index + ' content is : ', rows[index].description);
      if (rows[index].description.length < 180)
          return null;

      return <Typography sx={{ textAlign: 'right', color: '#757588', fontFamily: 'medium', fontSize: '13px', paddingLeft: '5px', paddingRight: '5px', }}
          style={
              // expanded !== 'panel' + index ?
              arrExpanded[index] === true ?
                  {
                      // width: '320px',
                      whiteSpace: 'nowrap', /* Keeps the text on one line */
                      overflow: 'hidden', /* Hides the overflow */
                      textOverflow: 'ellipsis', /* Adds the three dots at the end */
                      // backgroundColor: 'yellow',
                  }
                  :
                  {
                      display: 'flex',
                      // width: '320px',
                      //backgroundColor: 'red',
                  }
          }
      >
          {
              " ...  اقرأ المزيد "
          }
      </Typography>
  }

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
          // minWidth={'500px'}
          width={'98%'}
          height={'100%'}
          marginRight={'-12px'}
          xs={12}
      >

          {data?.data?.data1?.length > 0 ? (
              <>
                  <div className="programInnerSlide6-headerContainer">
                      <img className="programInnerSlide6-iconSubjectsList"
                          src={data?.data?.img === ""
                              ? iconPrepare2
                              : apiBaseUrlImage + data?.data?.img}
                          alt='' />
                      <span className="programInner-label programInnerSlide6-titleHeader">
                          <Highlighter>{data?.data?.title1}</Highlighter>
                      </span>
                  </div>


                  <div style={{ display: 'flex', position: 'relative', width: '100%', flexDirection: 'column' }}>
                      {arrExpanded?.length > 1 &&
                          < DashedLineVerticalComponent height={dashedlineHeight} />}

                      {
                          rows.map((row, index) => {
                              return <Accordion
                                  id={'container_' + index}
                                  expanded={arrExpanded[index]}
                                  onChange={handleChange(index)}
                                  elevation={0}
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
                                  <div className="programInnerSlides-innerContainer" style={{ width: '100%' }} >
                                      <AccordionNumberComponent number={index + 1} color={index % 2 === 0 ? data?.data?.data3?.color4 : data?.data?.data3?.color3} />

                                      <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1bh-content"
                                          id="panel1bh-header"
                                          // style={{ display: 'flex', width: '100%', marginTop: '3px', marginBottom: '3px' }}
                                          style={{ display: 'flex', width: '100%', backgroundColor: SetBgColor(index, index % 2 === 0 ? data?.data?.data3?.color2 : data?.data?.data3?.color1), borderRadius: '12px', borderColor: 'transparent', borderWidth: '0px', borderStyle: 'solid' }}
                                      >
                                          <Typography sx={{ textAlign: 'right' }}
                                              component={'span'}
                                              style={
                                                  // expanded !== 'panel' + index ?
                                                  arrExpanded[index] === true ?
                                                      {
                                                          //width: '870px',
                                                          // width: '63vw',
                                                          width: '90%',
                                                          // whiteSpace: 'nowrap', /* Keeps the text on one line */
                                                          // overflow: 'hidden', /* Hides the overflow */
                                                          textOverflow: 'ellipsis', /* Adds the three dots at the end */
                                                          // backgroundColor: 'orange',
                                                          paddingLeft: '5px',
                                                          paddingRight: '5px',
                                                          fontFamily: 'medium',
                                                          fontSize: '13px',
                                                          height: '25px',
                                                          maxHeight: '25px',
                                                          overflow: 'clip',
                                                          fontWeight: '550',
                                                          lineHeight:"26px",
                                                          textAlign: 'right' 
                                                      }
                                                      :
                                                      {
                                                          // display: 'flex',
                                                          // width: '950px',
                                                          // width: '69vw',
                                                          //backgroundColor: 'pink',
                                                          paddingLeft: '5px',
                                                          paddingRight: '5px',
                                                          fontFamily: 'medium',
                                                          fontSize: '13px',
                                                          fontWeight: '550',
                                                          lineHeight:"26px",
                                                          textAlign: 'right' 

                                                      }
                                              }
                                          >
                                              {/* {
                                      row.description
                                  } */}
                                              <div
                                                  style={{ }}
                                                  dangerouslySetInnerHTML={{ __html: row?.description }}
                                              />
                                          </Typography>

                                          {
                                              // expanded !== 'panel' + index &&
                                              arrExpanded[index] === true &&
                                              renderReadMore(index)
                                          }

                                      </AccordionSummary>
                                  </div>
                              </Accordion>
                          })
                      }
                  </div>
              </>
          ) : null}

          {data?.data?.data1?.length > 0 && data?.data?.data2?.length > 0 ? (
              <div className="programInnerSlide27-seperatorHorizontal" />
          ) : null}

          {data?.data?.data2?.length > 0 ? (
              <>
                  <div className="programInnerSlide6-headerContainer">
                      <span className="programInner-label programInnerSlide6-titleHeader">
                          <Highlighter>{data?.data?.title2 ? data?.data?.title2 : data?.title2}</Highlighter>
                      </span>
                  </div>

                  <Box
                      className="programInnerSlide27-goalsContainer"
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
                      {
                          data?.data?.data2.map((item, index) => {
                              return <ProgramInnerStickyNoteComponent
                                  //size={'177px'}
                                  size={item.description.length < 175 ? '200px' : item.description.length < 220 ? '235px' : '285px'}
                                  // borderRadius={'120px'}
                                  textAlign={'right'}
                                  textWidth='95%'
                                  data={item.description}
                                  index={index}
                              />
                          })
                      }
                  </Box>
              </>
          ) : null}
      </Grid >
  );
}
