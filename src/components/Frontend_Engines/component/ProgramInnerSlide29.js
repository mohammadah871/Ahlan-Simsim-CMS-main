import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide6.css";
import "./ProgramInnerSlide23.css";
import "./ProgramInnerSlide25.css";

import * as React from "react";
import { Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import iconMainActivity from "../icons/iconMainActivity.svg";
import iconClosure2 from "../icons/iconClosure2.svg";
import Highlighter from "./SessionManager";
import { useEffect } from "react";
import {SetBgColor , apiBaseUrlImage } from "src/constants/config";
import AccordionNumberComponent from "./AccordionNumberComponent";
import DashedLineVerticalComponent from "./DashedLineVerticalComponent";


export default function ProgramInnerSlide29({ data }) {
  //console.log('data', JSON.stringify(data))
  const [rows1, setrows1] = React.useState([]);
  const [rows2, setrows2] = React.useState([]);

  const [dashedlineHeight1, setDashedlineHeight1] = React.useState('100%');
  const [dashedlineHeight2, setDashedlineHeight2] = React.useState('100%');

  const [arrExpanded1, setArrExpanded1] = React.useState([]);
  const [arrExpanded2, setArrExpanded2] = React.useState([]);

  const createData = (description) => {
      return {
          description,
      };
  }

  useEffect(() => {
      let arr1 = [];

      let temp1 = [];
      data?.data?.data1?.forEach((element) => {
          temp1.push(createData(element?.contentHtml));
          arr1.push(false);
      });
      setArrExpanded1(arr1);
      setrows1([...temp1]);

      let arr2 = [];
      let temp2 = [];
      data?.data?.data2?.forEach((element) => {
          temp2.push(createData(element?.description));
          arr2.push(false);
      });
      setArrExpanded2(arr2);
      setrows2([...temp2]);

  }, [data]);

  useEffect(() => {
      if (!arrExpanded1)
          return;
      if (arrExpanded1[arrExpanded1.length - 1] === false) {
          const el = document.getElementById('container_1_' + (arrExpanded1.length - 1));
          if (!el)
              return;
          const rect = el.getBoundingClientRect();
          if (!rect)
              return;
          setDashedlineHeight1(rect.height);
      }
      else
          setDashedlineHeight1(0);
  }, [arrExpanded1]);

  useEffect(() => {
      if (!arrExpanded2)
          return;
      if (arrExpanded2[arrExpanded2.length - 1] === false) {
          const el = document.getElementById('container_2_' + (arrExpanded2.length - 1));
          if (!el)
              return;
          const rect = el.getBoundingClientRect();
          if (!rect)
              return;
          setDashedlineHeight2(rect.height);
      }
      else
          setDashedlineHeight2(0);
  }, [arrExpanded2]);


  // const handleChange1 = (panel) => (event, isExpanded) => {
  //     setExpanded1(isExpanded ? panel : false);
  // };

  // const handleChange2 = (panel) => (event, isExpanded) => {
  //     setExpanded2(isExpanded ? panel : false);
  // };


  const handleChange1 = (index) => (event, isExpanded) => {
      let arr = [...arrExpanded1];
      arr[index] = !arr[index];
      setArrExpanded1(arr);
  };

  const handleChange2 = (index) => (event, isExpanded) => {
      let arr = [...arrExpanded2];
      arr[index] = !arr[index];
      setArrExpanded2(arr);
  };

  const renderReadMore1 = (index) => {

      // console.log("hereeeee " + index + ' content is : ', rows[index].description);
      if (rows1[index].description.length < 180)
          return null;

      return <Typography sx={{ textAlign: 'right', color: '#757588', fontFamily: 'medium', fontSize: '13px', paddingLeft: '5px', paddingRight: '5px', }}
          style={
              arrExpanded1[index] === true ?
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

  const renderReadMore2 = (index) => {

      // console.log("hereeeee " + index + ' content is : ', rows[index].description);
      if (rows2[index].description.length < 180)
          return null;

      return <Typography sx={{ textAlign: 'right', color: '#757588', fontFamily: 'medium', fontSize: '13px', paddingLeft: '5px', paddingRight: '5px', }}
          style={
              arrExpanded2[index] === true ?
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

          {data?.data?.data1?.length > 0 ? (
              <>
                  <div className="programInnerSlide6-headerContainer">
                      <img className="programInnerSlide6-iconSubjectsList"
                          src={data?.data?.img === ""
                              ? iconMainActivity
                              : apiBaseUrlImage + data?.data?.img}
                          alt='' />
                      <span className="programInner-label programInnerSlide6-titleHeader">
                          <Highlighter>{data?.data?.title1}</Highlighter>
                      </span>
                  </div>


                  <div style={{ display: 'flex', position: 'relative', width: '100%', flexDirection: 'column' }}>
                      <DashedLineVerticalComponent height={dashedlineHeight1} />

                      {
                          rows1.map((row, index) => {
                              return <Accordion
                                  id={'container_1_' + index}
                                  // expanded1={expanded1 === 'panel' + index}
                                  //  onChange={handleChange1('panel' + index)}
                                  //     disableGutters={true}
                                  expanded={arrExpanded1[index]}
                                  onChange={handleChange1(index)}
                                  elevation={0}
                                  disableGutters={true}
                                  // style={{ marginBlock: '5px', display: 'flex', width: '98%', backgroundColor: index % 2 === 0 ? 'rgba(251, 197, 145, .2)' : 'rgba(232, 149, 114, .25)', borderWidth: 0 }}
                                  // style={{ marginBlock: '5px', display: 'flex', width: '98%', backgroundColor: index % 2 === 0 ? data?.data?.data3?.color2 + "12" : data?.data?.data3?.color1 + "24", borderWidth: 0 }}
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
                                              style={
                                                  arrExpanded1[index] === true ?
                                                      {
                                                          //width: '870px',
                                                          // width: '63vw',
                                                          // whiteSpace: 'nowrap', /* Keeps the text on one line */
                                                          //overflow: 'hidden', /* Hides the overflow */
                                                          width: '90%',
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
                                                          textAlign:"right",
                                                          lineHeight:"26px"
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
                                                          textAlign:"right",
                                                          lineHeight:"26px"
                                                      }
                                              }
                                          >
                                              {/* {
                                      row.description
                                  } */}
                                              <div
                                                  style={{  }}
                                                  dangerouslySetInnerHTML={{ __html: row?.description }}
                                              />
                                          </Typography>

                                          {
                                              //expanded1 !== 'panel' + index &&
                                              arrExpanded1[index] === true &&
                                              renderReadMore1(index)
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
              <div className="programInnerSlide23-seperatorHorizontal" />
          ) : null}

          {data?.data?.data2?.length > 0 ? (
              <>
                  <div className="programInnerSlide6-headerContainer">
                      <img className="programInnerSlide6-iconSubjectsList" src={iconClosure2} alt='' />
                      <span className="programInner-label programInnerSlide6-titleHeader">
                          <Highlighter>{data?.data?.title2}</Highlighter>
                      </span>
                  </div>


                  <div style={{ display: 'flex', position: 'relative', width: '100%', flexDirection: 'column' }}>
                      <DashedLineVerticalComponent height={dashedlineHeight2} />

                      {
                          rows2.map((row, index) => {
                              return <Accordion
                                  id={'container_2_' + index}
                                  // expanded2={expanded2 === 'panel' + index}
                                  // onChange={handleChange2('panel' + index)}
                                  // disableGutters={true}
                                  expanded={arrExpanded2[index]}
                                  onChange={handleChange2(index)}
                                  elevation={0}
                                  disableGutters={true}
                                  // style={{ marginBlock: '5px', display: 'flex', width: '98%', backgroundColor: index % 2 === 0 ? 'rgba(251, 197, 145, .2)' : 'rgba(232, 149, 114, .25)', borderWidth: 0 }}
                                  // style={{ marginBlock: '5px', display: 'flex', width: '98%', backgroundColor: index % 2 === 0 ? data?.data?.data3?.color2 + "12" : data?.data?.data3?.color1 + "24", borderWidth: 0 }}
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
                                                  //expanded2 !== 'panel' + index ?
                                                  arrExpanded2[index] === true ?
                                                      {
                                                          // width: '870px',
                                                          // width: '63vw',
                                                          // whiteSpace: 'nowrap', /* Keeps the text on one line */
                                                          width: '90%',
                                                          //overflow: 'hidden', /* Hides the overflow */
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
                                                          textAlign:"right",
                                                          lineHeight:"26px"
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
                                                          textAlign:"right",
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
                                              //expanded2 !== 'panel' + index &&
                                              arrExpanded2[index] === true &&
                                              renderReadMore2(index)
                                          }

                                      </AccordionSummary>
                                  </div>
                              </Accordion>
                          })
                      }
                  </div>
              </>
          ) : null}

      </Grid >
  );
}