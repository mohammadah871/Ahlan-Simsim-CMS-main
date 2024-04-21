import React, { useState } from "react";
import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide5.css";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import Highlighter from "./SessionManager";
import ProgramInnerBreafComponent from "./ProgramInnerBreafComponent";

const ProgramInnerType4Slide5 = ({ data }) => {
  console.log("data?.data?.breif", data?.data);

  const addAlpha = (hexColor, opacity) => {
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return hexColor + _opacity.toString(16).toUpperCase();
  };

  return (
    <div
      dir="rtl"
      style={{
        display: "flex",
        position: "relative",
        width: "90%",
        alignSelf: "center",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "25px",
      }}
    >
      <div
        className="programInnerSlide5-headerContainer"
        style={{ flexDirection: "column", alignItems: "flex-start" }}
      >
        <span className="programInner-label programInnerSlide5-titleHeader">
          <Highlighter>{data?.title}</Highlighter>
        </span>
        <span
          className="programInner-label programInnerSlide5-descriptionHeader"
          style={{ fontSize: "13px", marginTop: "7px" }}
        >
          <Highlighter>{data?.data?.data2?.description}</Highlighter>
        </span>
      </div>

      <Paper
        sx={{
          width: "100%",
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
                        width: "25%",
                        fontSize: "14px",
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
      {data?.data?.breif && (
        <div style={{ marginTop: "10px",width:"100%" }}>
          <ProgramInnerBreafComponent
            data={{
              contentHtml: data?.data?.breif?.contentHtml,
              title: data?.data?.breif?.title,
            }}
            bgColor={addAlpha(data?.data?.breif?.bgColor, 0.2)}
            width="100%"
          />
        </div>
      )}
    </div>
  );
};

export default ProgramInnerType4Slide5;
