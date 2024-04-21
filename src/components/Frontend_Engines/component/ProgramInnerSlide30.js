import React from "react";
import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide5.css";
import "./ProgramInnerSlide6.css";
import "./ProgramInnerSlide3.css";
import "./ProgramInnerSlide23.css";
import "./ProgramInnerSlide30.css";
import Grid from "@mui/material/Grid";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from "@mui/material";

import iconWheelChair from "../icons/iconWheelChair.svg";
import Highlighter from "./SessionManager";
import { apiBaseUrlImage } from "src/constants/config";
 


const ProgramInnerSlide30 = ({ data }) => {

    return (<Grid
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
        xs={12}
    >
        <div className="programInnerSlide30-headerContainer">
            <img className="programInnerSlide30-icon" src={
                data?.data?.img == ""
                ? iconWheelChair
                : apiBaseUrlImage + data?.data?.img
                } alt='' />

            <div className="programInnerSlide30-textContainer">
                <div style={{ paddingTop: "35px" }} />
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
                                            fontWeight: '600',
                                            lineHeight:'27px'
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
                                            lineHeight:'27px'
                                        }}
                                        sx={{
                                            backgroundColor: "white",
                                            border: ".5 solid rgba(210, 218, 226,.4)",
                                        }}>
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
}

export default ProgramInnerSlide30;