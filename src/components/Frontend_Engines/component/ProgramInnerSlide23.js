import React, { useEffect, useState } from "react";
import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide5.css";
import "./ProgramInnerSlide3.css";
import "./ProgramInnerSlide23.css";
import Grid from "@mui/material/Grid";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import iconPrepare from "../icons/iconPrepare.svg";
import ProgrammInnerTextWithThumbComponent from "./ProgrammInnerTextWithThumbComponent";
import { apiBaseUrlImage ,SetBgColor} from "src/constants/config";
import DefaultImage from "../icons/iconPalette.svg";


import AccordionNumberComponent from "./AccordionNumberComponent";
import DashedLineVerticalComponent from "./DashedLineVerticalComponent";


const ProgramInnerSlide23 = ({ data }) => {
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
        data?.data?.data2?.forEach((element) => {
            temp.push(createData(element?.title, element?.description));
            arr.push(false);
        });
        setArrExpanded(arr);
        setrows([...temp]);
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
                        textOverflow: 'ellipsis', /* Adds the three dots at the end */
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
                style={{ }}
                dangerouslySetInnerHTML={{ __html: data }}
            />
        </Typography>
    }

    const renderReadMore = (index) => {

        if (rows[index].description.length < 150)
            return null;

        return <Typography sx={{ textAlign: 'right', color: '#757588', fontFamily: 'medium', fontSize: '13px', paddingLeft: '5px', paddingRight: '5px', }}
            style={
                arrExpanded[index] === true ?
                    {
                        whiteSpace: 'nowrap', /* Keeps the text on one line */
                        overflow: 'hidden', /* Hides the overflow */
                        textOverflow: 'ellipsis', /* Adds the three dots at the end */
                    }
                    :
                    {
                        display: 'flex',
                    }
            }
        >
            {
                " ...  اقرأ المزيد"
            }
        </Typography>
    }


    return (<Grid
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


        {
            data?.data?.data1?.length > 0 ?
                <>
                    <div className="programInnerSlide5-headerContainer">
                        <ProgrammInnerTextWithThumbComponent
                            icon={data?.data?.img === "" ? DefaultImage : apiBaseUrlImage + data?.data?.img}
                            iconBgColor='#3BC4FF'
                            bgColor={'transparent'}
                            titleFontSize={'16px'}
                            data={{
                                title: data?.data?.title1,
                            }}
                            width={'100%'}
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
                                                        fontWeight: '600'
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
                                                        textAlign: "right"
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

                </> : null
        }
        {
            data?.data?.data1?.length > 0 && data?.data?.data2?.length > 0 ?
                <div className="programInnerSlide23-seperatorHorizontal" /> : null
        }
        {
            data?.data?.data2?.length > 0 ?
                <>
                    <div className="programInnerSlide3-headerContainer" style={{ width: '96%' }}>
                        <img
                            className="programInnerSlide3-iconSubjectsList"
                            src={iconPrepare}
                            alt=""
                        />
                        <span className="programInner-label programInnerSlide3-titleHeader">
                            {data?.data?.title2}
                        </span>
                    </div>

                    <div style={{ display: 'flex', position: 'relative', width: '98%', flexDirection: 'column' }}>
                        {arrExpanded?.length > 1 &&
                            < DashedLineVerticalComponent height={dashedlineHeight} />}

                        {
                            rows.map((row, index) => {
                                return <Accordion
                                    id={'container_' + index}
                                    expanded={arrExpanded[index]}
                                    onChange={handleChange(index)}
                                    elevation={0}

                                    disableGutters={true}
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
                                            expandIcon={row?.description.length >= 200 ? <ExpandMoreIcon /> : null}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                            style={{ display: 'flex', width: '100%', backgroundColor: SetBgColor(index, index % 2 === 0 ? data?.data?.data3?.color2 : data?.data?.data3?.color1), borderRadius: '12px', borderColor: 'transparent', borderWidth: '0px', borderStyle: 'solid' }}
                                        >

                                            {
                                                renderItem(row?.description, index)
                                            }

                                            {
                                                arrExpanded[index] === true &&
                                                renderReadMore(index)
                                            }

                                        </AccordionSummary>

                                    </div>
                                </Accordion>
                            })
                        }
                    </div>

                </> : null
        }


    </Grid>
    );
}

export default ProgramInnerSlide23;