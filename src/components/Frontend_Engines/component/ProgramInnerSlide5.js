import React, { useEffect, useState } from "react";
import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide5.css";
import Grid from "@mui/material/Grid";
import DefaultImage from "../icons/8.png";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import ProgramInnerTextComponent from "./ProgramInnerTextComponent";
import Highlighter from "./SessionManager";
import { apiBaseUrlImage } from "src/constants/config";

const ProgramInnerSlide5 = ({ data }) => {
  return (
    <Grid
      dir="rtl"
      container
      // spacing={2}
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      paddingBottom={2}
      paddingY={"20px"}
      overflow="hidden"
      // minWidth={'500px'}
      width={"100%"}
      height={"100%"}
      xs={12}>
      <div className="programInnerSlide5-headerContainer">
        <img
          className="programInnerSlide5-iconSubjectsList"
          src={
            data?.data?.data2?.img == ""
              ? DefaultImage
              : apiBaseUrlImage + data?.data?.data2?.img
          }
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
          fontBoldTitle={false}

        />
      </div>

      <Paper
        sx={{
          width: "95%",
          overflow: "hidden",
          borderRadius: "12px",
          border: "1px solid rgba(210, 218, 226,.4)",
        }}
      >
        <TableContainer sx={{ height: "100%" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {data?.data?.data1?.map((item, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell
                      align={"right"}
                      className="programInnerSlide5-descriptionHeader"
                      style={{
                        width: "20%",
                        fontSize: "13px",
                        fontFamily: "Medium",
                        verticalAlign: "top",
                        padding: 25,
                        textAlign: "right",
                      }}
                      sx={{
                        backgroundColor: "rgba(210, 218, 226, .4)",
                        border: ".5 solid rgba(210, 218, 226,.4)",
                      }}
                    >
                      {item?.title}
                    </TableCell>

                    <TableCell
                      align={"right"}
                      className="programInnerSlide5-descriptionHeader"
                      style={{
                        width: "auto",
                        fontSize: "13px",
                        fontFamily: "Medium",
                        verticalAlign: "top",
                        padding: 25,
                        textAlign: "right",
                      }}
                      sx={{
                        backgroundColor: "white",
                        border: ".5 solid rgba(210, 218, 226,.4)",
                      }}
                    >
                      <div
                        style={{ marginRight: 10 }}
                        dangerouslySetInnerHTML={{ __html: item?.contentHtml }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};

export default ProgramInnerSlide5;
