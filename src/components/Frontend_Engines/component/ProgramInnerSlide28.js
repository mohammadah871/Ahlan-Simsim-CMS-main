import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide6.css";
import "./ProgramInnerSlide23.css";
import "./ProgramInnerSlide25.css";
import { useEffect } from "react";
import * as React from "react";
import { Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import iconActivity2 from "../icons/iconActivity2.svg";
import Highlighter from "./SessionManager";
import {  SetBgColor,apiBaseUrlImage } from "src/constants/config";
import AccordionNumberComponent from "./AccordionNumberComponent";
import DashedLineVerticalComponent from "./DashedLineVerticalComponent";

export default function ProgramInnerSlide28({ data }) {
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
          temp.push(createData(element?.description));
          arr.push(false);
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

  const renderReadMore = (index) => {

      // console.log("hereeeee " + index + ' content is : ', rows[index].description);
      if (rows[index].description.length < 180)
          return null;

      return <Typography sx={{ textAlign: 'right', color: '#757588', fontFamily: 'medium', fontSize: '13px', paddingLeft: '5px', paddingRight: '5px', }}
          style={
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
          width={'100%'}
          height={'100%'}
          xs={12}
      >

          <div className="programInnerSlide6-headerContainer">
              <img className="programInnerSlide6-iconSubjectsList"
                  src={data?.data?.img === ""
                      ? iconActivity2
                      : apiBaseUrlImage + data?.data?.img}
                  alt='' />
              <span className="programInner-label programInnerSlide6-titleHeader">
                  <Highlighter>{data?.title}</Highlighter>
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
                          sx={{
                              '&:before': {
                                  display: 'none',
                              }
                          }}
                          style={{ boxShadow: 'none', backgroundColor: 'transparent', marginBlock: '5px', display: 'flex', width: '98%', borderStyle: 'solid', borderColor: 'transparent', borderWidth: 0, }}
                      >
                          <div className="programInnerSlides-innerContainer" style={{ width: '100%', display: 'flex' }} >
                              <AccordionNumberComponent number={index + 1} color={index % 2 === 0 ? data?.data?.data2?.color4 : data?.data?.data2?.color3} />

                              <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                                  // style={{ display: 'flex', width: '100%', marginTop: '3px', marginBottom: '3px' }}
                                  style={{ display: 'flex', width: '100%', backgroundColor: SetBgColor(index, index % 2 === 0 ? data?.data?.data2?.color2 : data?.data?.data2?.color1), borderRadius: '12px', borderColor: 'transparent', borderWidth: '0px', borderStyle: 'solid' }}
                              >
                                  <Typography sx={{ textAlign: 'right' }}
                                      component={'span'}
                                      style={
                                          arrExpanded[index] === true ?
                                              {
                                                  //width: '870px',
                                                  // width: '63vw',
                                                  width: '90%',
                                                  // whiteSpace: 'nowrap', /* Keeps the text on one line */
                                                  // overflow: 'hidden', /* Hides the overflow */
                                                  textOverflow: 'ellipsis', /* Adds the three dots at the end */
                                                  //backgroundColor: 'orange',
                                                  paddingLeft: '5px',
                                                  paddingRight: '5px',
                                                  fontFamily: 'medium',
                                                  fontSize: '13px',
                                                  height: '25px',
                                                  maxHeight: '25px',
                                                  overflow: 'clip',
                                                  fontWeight: '550',
                                                  textAlign: 'right',
                                                  lineHeight:"26px"
                                              }
                                              :
                                              {
                                                  // display: 'flex',
                                                  // width: '950px',
                                                  //width: '69vw',
                                                  //backgroundColor: 'pink',
                                                  paddingLeft: '5px',
                                                  paddingRight: '5px',
                                                  fontFamily: 'medium',
                                                  fontSize: '13px',
                                                  fontWeight: '550',
                                                  textAlign: 'right',
                                                  lineHeight:"26px"

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
                                      arrExpanded[index] === true &&
                                      renderReadMore(index)
                                  }

                              </AccordionSummary>
                          </div>
                      </Accordion>
                  })
              }
          </div>

      </Grid >
  );
}