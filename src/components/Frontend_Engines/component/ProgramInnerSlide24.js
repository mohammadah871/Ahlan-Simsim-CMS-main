import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide6.css";

import * as React from "react";
import { Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import iconSteps from "../icons/iconSteps.svg";

import { useEffect } from "react";
import Highlighter from "./SessionManager";
import { apiBaseUrlImage } from "src/constants/config";

export default function ProgramInnerSlide24({ data }) {
  const [rows, setrows] = React.useState([]);

  const [expanded, setExpanded] = React.useState(false);

  const createData = (name, description) => {
    return {
      name,
      description,
    };
  };

  useEffect(() => {
    let temp = [];
    data?.data?.data1?.forEach((element) => {
      temp.push(createData(element?.name, element?.description));
    });
    setrows([...temp]);
  }, [data]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const renderReadMore = (index) => {
    // console.log("hereeeee " + index + ' content is : ', rows[index].description);
    if (rows[index].description.length < 200) return null;

    return (
      <Typography
        sx={{
          textAlign: "right",
          color: "#757588",
          fontFamily: "medium",
          fontSize: "13px",
          paddingLeft: "5px",
          paddingRight: "5px",
        }}
        style={
          expanded !== "panel" + index
            ? {
                // width: '320px',
                whiteSpace: "nowrap" /* Keeps the text on one line */,
                overflow: "hidden" /* Hides the overflow */,
                textOverflow: "ellipsis" /* Adds the three dots at the end */,
                // backgroundColor: 'yellow',
              }
            : {
                display: "flex",
                // width: '320px',
                //backgroundColor: 'red',
              }
        }
      >
        {" ...  اقرأ المزيد"}
      </Typography>
    );
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
            data?.data?.img == ""
            ? iconSteps
            : apiBaseUrlImage + data?.data?.img
          }
          alt=""
        />
        <span className="programInner-label programInnerSlide6-titleHeader">
          <Highlighter>{data?.title}</Highlighter>
        </span>
      </div>

      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          flexDirection: "column",
        }}
      >
        {rows.map((row, index) => {
          console.log("row====", row);

          return (
            <Accordion
              expanded={expanded === "panel" + index}
              onChange={handleChange("panel" + index)}
              disableGutters={true}
              style={{
                marginBlock: "5px",
                display: "flex",
                width: "98%",
                backgroundColor:
                  index % 2 === 0
                    ? data?.data?.data2?.color2 
                    : data?.data?.data2?.color1 ,
                borderWidth: 0,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                style={{
                  display: "flex",
                  width: "100%",
                  marginTop: "3px",
                  marginBottom: "3px",
                }}
              >
                <Typography
                  sx={{ textAlign: "right" }}
                  style={
                    expanded !== "panel" + index
                      ? {
                          width: "320px",
                          whiteSpace: "nowrap" /* Keeps the text on one line */,
                          overflow: "hidden" /* Hides the overflow */,
                          textOverflow:
                            "ellipsis" /* Adds the three dots at the end */,
                          // backgroundColor: 'yellow',
                          paddingLeft: "5px",
                          paddingRight: "5px",
                          fontFamily: "medium",
                          fontSize: "13px",
                          fontWeight: "550",
                          textAlign: "right",
                          // borderColor:'white',
                          // borderStyle:'solid',
                          // borderWidth:0,
                          // borderLeftWidth:'2px',
                        }
                      : {
                          display: "flex",
                          width: "320px",
                          //backgroundColor: 'red',
                          paddingLeft: "5px",
                          paddingRight: "5px",
                          fontFamily: "medium",
                          fontSize: "13px",
                          fontWeight: "550",
                          textAlign: "right",
                        }
                  }
                >
                  {row?.name}
                </Typography>
                <Typography
                  sx={{ textAlign: "right" }}
                  style={
                    expanded !== "panel" + index
                      ? {
                          width: "490px",
                          whiteSpace: "nowrap" /* Keeps the text on one line */,
                          overflow: "hidden" /* Hides the overflow */,
                          textOverflow:
                            "ellipsis" /* Adds the three dots at the end */,
                          paddingLeft: "5px",
                          paddingRight: "5px",
                          fontFamily: "medium",
                          fontSize: "13px",
                          height: "25px",
                          maxHeight: "25px",
                          overflow: "clip",
                          fontWeight: "550",
                        }
                      : {
                          display: "flex",
                          width: "610px",
                          paddingLeft: "5px",
                          paddingRight: "5px",
                          fontFamily: "medium",
                          fontSize: "13px",
                          fontWeight: "550",
                        }
                  }
                >
                  <div
                    style={{
                      textAlign: "right",
                      display: expanded !== "panel" + index ? "flex" : "unset",
                    }}
                    dangerouslySetInnerHTML={{ __html: row?.description }}
                  />
                </Typography>

                {expanded !== "panel" + index && renderReadMore(index)}
              </AccordionSummary>
            </Accordion>
          );
        })}
      </div>
    </Grid>
  );
}
