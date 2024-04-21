import React, { useState } from "react";
import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide3.css";
import "./ProgramInnerSlide30.css";
import "./ProgramInnerSlide31.css";
import Grid from "@mui/material/Grid";
import Highlighter from "./SessionManager";
import "./ProgramInnerBreafComponent.css";

import ProgramInnerBreafComponent from "./ProgramInnerBreafComponent";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";

const ProgramInnerSlide31 = ({ data }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns([
      {
        id: "1",
        label: data?.data?.data1[0]?.title,
        align: "right",
      },
      {
        id: "2",
        label: data?.data?.data1[1]?.title,
        align: "right",
      },
      {
        id: "3",
        label: data?.data?.data1[2]?.title,
        align: "right",
      },
      {
        id: "4",
        label: data?.data?.data1[3]?.title,
        align: "right",
      },
      {
        id: "5",
        label: data?.data?.data1[4]?.title,
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
      <div className="programInnerSlide31-headerContainer">
        <div className="programInnerSlide30-textContainer">
          <span className="programInner-label programInnerSlide6-titleHeader">
            <Highlighter>{data?.title}</Highlighter>
          </span>

          <span className="programInner-label programInnerSlide30-description">
            <div
              dangerouslySetInnerHTML={{ __html: data?.data?.description }}
            />
          </span>
        </div>
      </div>

      <span
        className="programInnerSlide31-instructionsContainer"
        style={{ whiteSpace: "pre-line" }}
      >
        <div
          id="text"
          className="programInnerBreaf-textContainer"
          dir="rtl"
          style={{ width: "100%", background: "#93D1F5" + 0.2 }}
        >
          <Highlighter
            style={{ paddingRight: 20, paddingLeft: 20 }}
            isSameText={false}
          >
            <span className="programInnerBreaf-label programInnerBreaf-title">
              <span className="programInnerBreaf-label programInnerBreaf-description">
                <div
                  dangerouslySetInnerHTML={{ __html: data?.data?.instructions }}
                  style={{ padding: 20 }}
                />
              </span>
            </span>
          </Highlighter>
        </div>
      </span>
{/* 
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
       
                  <TableRow hover role="checkbox" tabIndex={-1} key={1}>
                    <TableCell
                      key={1}
                      align={"right"}
                      className="programInnerSlide3-descriptionHeader"
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
                      <div
                        dangerouslySetInnerHTML={{ __html: data?.data?.data1[0]?.contentHtml }}
                      />
                    </TableCell>

                    <TableCell
                      key={1}
                      align={"right"}
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
                      <div
                      
                        dangerouslySetInnerHTML={{ __html: data?.data?.data1[1]?.contentHtml }}
                      />
                    </TableCell>

                    <TableCell
                      key={1}
                      align={"right"}
                      className="programInnerSlide3-descriptionHeader"
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
                      <div
                        // style={{ marginRight: 10 }}
                        dangerouslySetInnerHTML={{ __html: data?.data?.data1[2]?.contentHtml }}
                      />
                    </TableCell>

                    <TableCell
                      key={1}
                      align={"right"}
                      className="programInnerSlide3-descriptionHeader"
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
                      <div
                        // style={{ marginRight: 10 }}
                        dangerouslySetInnerHTML={{ __html: data?.data?.data1[3]?.contentHtml }}
                      />
                    </TableCell>

                    <TableCell
                      key={1}
                      align={"right"}
                      className="programInnerSlide3-descriptionHeader"
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
                      <div
                        // style={{ marginRight: 10 }}
                        dangerouslySetInnerHTML={{ __html: data?.data?.data1[4]?.contentHtml }}
                      />
                    </TableCell>
                  </TableRow>
             
            </TableBody>
          </Table>
        </TableContainer>
      </Paper> */}
    </Grid>
  );
};

export default ProgramInnerSlide31;
