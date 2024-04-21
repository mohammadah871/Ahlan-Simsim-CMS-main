import React, { useState } from "react";
import "./ProgramInnerScreen.css";
import "./ProgramInnerSlide3.css";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";
import Highlighter from "./SessionManager";


const TableComponent = ({ data, width }) => {

    const [headerColumns, setHeaderColumns] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (!data)
            return;

        if (!data.rows)
            return

        let cols = [];
        data.header.forEach((title, index) => {
            cols.push({
                id: index.toString(),
                label: title,
                align: 'right'
            });
        });

        let _rows = [];
        data.rows.forEach((item, index) => {
            _rows.push(item);
        });

        setRows(_rows);
        setHeaderColumns(cols);

    }, [data]);

    return (
        headerColumns.length > 0 &&
        <Paper
            sx={{
                width: width ? width : '100%',
                overflow: "hidden",
                borderRadius: "12px",
                border: "1px solid rgba(210, 218, 226,.4)",
                alignSelf: 'center'
            }}
        >
            <TableContainer sx={{ height: "100%" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {
                                headerColumns?.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        className="programInner-label programInnerSlide3-titleHeader"
                                        style={{
                                            width: column.width,
                                            backgroundColor: "#F2F4FD",
                                            fontSize: "14px",
                                            paddingX: "3px",
                                            fontFamily: "Medium",
                                            textAlign: "right"
                                        }}
                                        sx={{
                                            border: "1px solid rgba(210, 218, 226,.4)",
                                        }}
                                    >
                                        <Highlighter>{column.label}</Highlighter>
                                    </TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            rows.length > 0 &&
                            rows.map((_row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={_row.code}>
                                        {_row.map((row) => {
                                            return (
                                                <TableCell key={row.id} align={'right'}
                                                    className="programInnerSlide2-descriptionHeader"
                                                    style={{ fontSize: '13px', fontFamily: 'Medium', fontWeight: '600' }}
                                                    sx={{
                                                        border: "1px solid rgba(210, 218, 226,.4)",
                                                        backgroundColor: 'white', verticalAlign:'top'
                                                    }}
                                                >
                                                    {
                                                        row.text && row.text != '' ?
                                                            row.text
                                                            :
                                                            <div  dangerouslySetInnerHTML={{ __html: row?.contentHtml }} />
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default TableComponent;