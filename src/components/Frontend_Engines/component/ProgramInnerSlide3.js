import React, { useEffect, useState } from "react";
import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide3.css";
import Grid from "@mui/material/Grid";

import DefaultImage from "../icons/11.png";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Highlighter from "./SessionManager";
import { apiBaseUrlImage } from "src/constants/config";

const ProgramInnerSlide3 = ({ data }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns([
      {
        id: "exercise",
        label: data?.data?.data2?.column_1,
        width: "20%",
        align: "right",
      },
      {
        id: "subject",
        label: data?.data?.data2?.column_2,
        width: "30%",
        align: "right",
      },
      {
        id: "details",
        label: data?.data?.data2?.column_3,
        width: "50%",
        align: "right",
      },
    ]);
  }, [data]);

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
      <div className="programInnerSlide3-headerContainer">
        <img
          className="programInnerSlide3-iconSubjectsList"
          src={
            data?.data?.data2?.img == ""
              ? DefaultImage
              : apiBaseUrlImage + data?.data?.data2?.img
          }
          alt=""
        />
        <span className="programInner-label programInnerSlide3-titleHeader">
          قائمة المواد
        </span>
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
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="programInner-label programInnerSlide3-titleHeader"
                    style={{
                      width: column.width,
                      backgroundColor: "#F2F4FD",
                      fontSize: "16px",
                      paddingX: "3px",
                      fontFamily: "Medium",
                      textAlign: "right",
                    }}
                    sx={{
                      border: "1px solid rgba(210, 218, 226,.4)",
                    }}
                  >
                    <Highlighter>{column.label}</Highlighter>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.data?.data1?.map((item) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={1}>
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
                      }}
                      sx={{
                        border: "1px solid rgba(210, 218, 226,.4)",
                        backgroundColor: "white",
                      }}
                    >
                      {item?.column_1}
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
                      }}
                      sx={{
                        border: "1px solid rgba(210, 218, 226,.4)",
                        backgroundColor: "white",
                      }}
                    >
                      <div
                        style={{ marginRight: 10 }}
                        dangerouslySetInnerHTML={{ __html: item?.column_2 }}
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
                      }}
                      sx={{
                        border: "1px solid rgba(210, 218, 226,.4)",
                        backgroundColor: "white",
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

export default ProgramInnerSlide3;
