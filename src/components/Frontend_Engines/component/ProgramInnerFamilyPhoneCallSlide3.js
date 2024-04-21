import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide3.css";
import "./ProgramInnerSlide6.css";
import "./ProgramInnerSlide7.css";
import * as React from "react";
import { Grid } from "@mui/material";
import Highlighter from "./SessionManager";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
export default function ProgramInnerFamilyPhoneCallSlide3({ data }) {

  return (
    <Grid
      dir="rtl"
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      paddingBottom={2}
      paddingY={"20px"}
      overflow="hidden"
      width={"100%"}
      height={"100%"}
      xs={12}
      paddingRight={"5px"}
    >
      <div className="programInnerSlide12-headerContainer">
        <span className="programInner-label programInnerSlide12-titleHeader">
          <Highlighter>{data?.title}</Highlighter>
        </span>
      </div>



      <div className="programInnerSlide12-pointsContainer">
        {data?.data.tags.map((item, index) => {
          return (
            <span
              id={index}
              className="programInnerSlide12-label programInnerSlide12-pointContainer"
            >
              <Highlighter>{item}</Highlighter>
            </span>
          );
        })}
      </div>
      <div className="programInnerSlide12-headerContainer">
        <span className="programInner-label programInnerSlide12-titleHeader">
          <Highlighter>
            أرسل للمشاركين عبر الوسيلة المتّفق عليها معهم (مجموعة واتساب على
            سبيل المثال) مع النّصّ الآتي
          </Highlighter>
        </span>
      </div>
      <div className="programInnerSlide12-headerContainer">
      <TableContainer sx={{ height: "100%" }}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                
                                      <TableCell
                                        align={"right"}
                                        className="programInner-label programInnerSlide3-titleHeader"
                                        style={{
                                          width: "30%",
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
                               {"التطبيق المطلوب"}
                                        </Highlighter>
                                      </TableCell>


                                      <TableCell
                                        align={"right"}
                                        className="programInner-label programInnerSlide3-titleHeader"
                                        style={{
                                          width: "70%",
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
                                          {"أرسلْ إلى المشارك بواسطة الوسيلة المتَّفق عليها معه (مجموعة واتساب مثلًا) مع النَّصِّ الآتي:"}
                                        </Highlighter>
                                      </TableCell>

                                  
                                  </TableRow>
                                </TableHead>




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
                                            width: "30%",
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
                                              __html: data?.data?.description2
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
                                            width: "70%",
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
                                              __html:data?.data?.description
                                            }}
                                          />
                                        </TableCell>


                            
                                      </TableRow>
                                    </TableBody>
                              

                              </Table>
                            </TableContainer>


                            </div>


    </Grid>
  );
}
