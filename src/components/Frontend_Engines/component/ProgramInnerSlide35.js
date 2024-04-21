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
import DefaultImage  from "../icons/incon_35.png";
import Highlighter from "./SessionManager";
import {SetBgColor , apiBaseUrlImage } from "src/constants/config";
import AccordionNumberComponent from "./AccordionNumberComponent";
import DashedLineVerticalComponent from "./DashedLineVerticalComponent";

export default function ProgramInnerlide35({ data }) {
  // console.log('data', JSON.stringify(data))
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
          temp.push(createData(element?.title, element?.description));
          arr.push(false);
      });
      setrows([...temp]);
      setArrExpanded(arr);
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

  const renderItem = (data, index) => {
      return <Typography sx={{ textAlign: 'right' }}
          component={'span'}
          style={
              arrExpanded[index] === true ?
                  {
                      width: '90%',
                      // whiteSpace: 'nowrap', /* Keeps the text on one line */
                      //overflow: 'hidden', /* Hides the overflow */
                      textOverflow: 'ellipsis', /* Adds the three dots at the end */
                      // backgroundColor: 'orange',
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
                      display: 'flex',
                      // width: '60vw',
                      //backgroundColor: 'pink',
                      paddingLeft: '5px',
                      paddingRight: '5px',
                      fontFamily: 'medium',
                      fontSize: '13px',
                      textAlign: 'right',
                      lineHeight:"26px"
                  }
          }
      >
          <div
              id='content1'
              style={{  }}
              dangerouslySetInnerHTML={{ __html: data }}
          />
      </Typography>
  }

  const renderReadMore = (index) => {

      // console.log("hereeeee " + index + ' content is : ', rows[index].description);
      if (rows[index].description.length < 150)
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
              " ...  اقرأ المزيد"
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
                  // src={data?.icon ? data.icon : iconSlide5}
                  src={
                      data?.data?.img == ""
                          ? DefaultImage
                          : apiBaseUrlImage + data?.data?.img
                  }
                  alt='' />
              <span className="programInner-label programInnerSlide6-titleHeader">
                  <Highlighter>{data?.title}</Highlighter>
              </span>
          </div>


          <div style={{ display: 'flex', position: 'relative', width: '100%', flexDirection: 'column' }}>
              {arrExpanded?.length > 1 &&
                  < DashedLineVerticalComponent height={dashedlineHeight} />}

              {
                  rows &&
                  rows.map((row, index) => {
                      return <Accordion
                          id={'container_' + index}
                          // expanded={row?.description.length < 200 ? true : expanded === 'panel' + index} 
                          // onChange={handleChange('panel' + index)}
                          expanded={arrExpanded[index]}
                          onChange={handleChange(index)}
                          elevation={0}
                          disableGutters={true}
                          // style={{ marginBlock: '5px', display: 'flex', width: '98%', backgroundColor: index % 2 === 0 ? 'rgba(251, 197, 145, .2)' : 'rgba(232, 149, 114, .25)', borderWidth: 0 }}
                          // style={{ marginBlock: '5px', display: 'flex', width: '98%', backgroundColor: index % 2 === 0 ? addAlpha(data?.data?.data2?.color2, .18) : addAlpha(data?.data?.data2?.color1, .35), borderWidth: 0 }}
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
                                  expandIcon={row?.description?.length >= 200 ? <ExpandMoreIcon /> : null}
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                                  // style={{ display: 'flex', width: '100%', marginTop: '3px', marginBottom: '3px' }}
                                  style={{ display: 'flex', width: '100%', backgroundColor: SetBgColor(index, index % 2 === 0 ? data?.data?.data2?.color2 : data?.data?.data2?.color1), borderRadius: '12px', borderColor: 'transparent', borderWidth: '0px', borderStyle: 'solid' }}
                              >

                                  {
                                      renderItem(row?.description, index)
                                  }

                                  {
                                      //expanded !== 'panel' + index &&
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