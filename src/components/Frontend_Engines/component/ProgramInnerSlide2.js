import React, { useEffect } from "react";
import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide2.css";
import Grid from "@mui/material/Grid";

import DefaultImage from "../icons/12.png";
import iconTarget from "../icons/iconTarget.svg";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TabsContainer from "./TabsContainer";
import Highlighter from "./SessionManager";
import { apiBaseUrlImage } from "src/constants/config";

const ProgramInnerSlide2 = ({ data }) => {

  const [columns, setcolumns] = React.useState([]);
  const [rows, setrows] = React.useState([]);

  function createData(duration, subject) {
    return { duration, subject };
  }

  useEffect(() => {
    setcolumns([
      {
        id: "duration",
        label: data?.data?.data2?.column_1,
        width: "25%",
        align: "right",
      },
      {
        id: "subject",
        label: data?.data?.data2?.column_2,
        width: "75%",
        align: "right",
      },
    ]);

    let temp = [];
    data?.data?.data1?.forEach((element) => {
      temp.push(createData(element?.column_1, element?.column_2));
    });
    setrows([...temp]);
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
      <div className="programInnerSlide2-headerContainer">
        
          <img
            className="programInnerSlide2-iconTimeTable"
            src={data?.data?.data2?.img==""?  DefaultImage : apiBaseUrlImage + data?.data?.data2?.img}
            alt=""
          />
      
        <span className="programInner-label programInnerSlide2-titleHeader">
          <Highlighter>الجدول الزّمنيّ وتفاصيل الجلسة</Highlighter>
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
                    className="programInner-label programInnerSlide2-titleHeader"
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
                      backgroundColor: "white",
                    }}
                  >
                    <Highlighter>{column.label}</Highlighter>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className="programInnerSlide2-descriptionHeader"
                          style={{
                            fontSize: "13px",
                            fontFamily: "Medium",
                            textAlign: "right",
                          }}
                          sx={{
                            border: "1px solid rgba(210, 218, 226,.4)",
                            backgroundColor: "white",
                          }}
                        >
                          <Highlighter>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </Highlighter>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <div className="programInner-separatorH  programInnerSlide2-extraTopPadding2" />

      <div className="programInnerSlide2-headerContainer programInnerSlide2-extraTopPadding1">
        <img
          className="programInnerSlide2-iconTimeTable"
          src={iconTarget}
          alt=""
        />
        <span className="programInner-label programInnerSlide2-titleHeader">
          أهداف الجلسة
        </span>
      </div>

      <TabsContainer data={data?.data?.data2} />
    </Grid>
  );
};

export default ProgramInnerSlide2;
