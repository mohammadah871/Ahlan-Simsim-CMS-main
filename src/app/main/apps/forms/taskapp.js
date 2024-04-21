import { Menu, Select, TextField, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { useEffect, useState } from "react";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import * as React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';

import { apiBaseUrl, baseUrl } from './../../../../constants/config'

function SubjectForm(props) {
    const [data, setData] = useState({
        title: "",
        fromdate: new Date(),
        date: new Date(),
        status: true,
        color: "",
        author: 0,
        country: ""
    });

    const [countryList, setCountryList] = useState([]);


    // const uploadFile = async (e) => {
    //     let filedata = await uploadFileData(e.target.files[0], "article_images");
    //     setData({ ...data, image: filedata.data.uploadFile });
    // }
    useEffect(() => {
        if (props.mode === "edit") {
            setData({ ...data, ...props.data });
        }

        axios.get(apiBaseUrl + "/api/cms/engin/countries_controll").then((res) => {
            setCountryList(res.data.data)
        });
    }, [props.data])

    return (<form className="w-full" onSubmit={(e) => {
        e.preventDefault();
        props.submit(data);
    }}>
        <div className="md:w-1/2 p-20">
            <TextField label={"Title"} required email className={"w-full"} value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
        </div>


        <div className="md:w-1/2 p-20">

            <LocalizationProvider>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker value={data.fromdate} label="From date" onChange={(date) => setData({ ...data, fromdate: date })} />
                </DemoContainer>
            </LocalizationProvider>

        </div>

        <div className="md:w-1/2 p-20">

            <LocalizationProvider>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker value={data.date} label="To date" onChange={(date) => setData({ ...data, date: date })} />
                </DemoContainer>
            </LocalizationProvider>

        </div>

        <div className="md:w-1/2 p-20 max-w-[250px]">

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Color</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Color"
                    value={data.color}
                    onChange={(e) => {
                        console.log(e.target.value)
                        setData({ ...data, color: e.target.value })
                    }}
                >
                    <MenuItem value={"#FFEB3B"}>
                        <div className="flex items-center justify-between w-full">
                            <div>Yellow</div>
                            <div><div className="bg-yellow-500 w-32 h-32"></div></div>
                        </div>
                    </MenuItem>
                    <MenuItem value={"#4CAF50"}>
                        <div className="flex items-center justify-between w-full">

                            <div>Green</div>
                            <div><div className="bg-green-500 w-32 h-32"></div></div>
                        </div>
                    </MenuItem>
                    <MenuItem value={"#2196F3"}>
                        <div className="flex items-center justify-between w-full">

                            <div>Blue</div>
                            <div><div className="bg-blue-500 w-32 h-32"></div></div>
                        </div>
                    </MenuItem>
                    <MenuItem value={"#FF9800"}>
                        <div className="flex items-center justify-between w-full">

                            <div>Orange</div>
                            <div><div className="bg-orange-500 w-32 h-32"></div></div>
                        </div>
                    </MenuItem>
                    <MenuItem value={"#9E9E9E"}>
                        <div className="flex items-center justify-between w-full">

                            <div>Grey</div>
                            <div><div className="bg-grey-500 w-32 h-32"></div></div>
                        </div>
                    </MenuItem>
                    <MenuItem value={"#9C27B0"}>
                        <div className="flex items-center justify-between w-full">

                            <div>Purple</div>
                            <div><div className="bg-purple-500 w-32 h-32"></div></div>
                        </div>
                    </MenuItem>
                </Select>
            </FormControl>
        </div>




        <div className="md:w-1/2 p-20 max-w-[250px]">

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Country"
                    value={data.country}
                    onChange={(e) => {
                        setData({ ...data, country: e.target.value })
                    }}
                >

                    {countryList.map((item) => <MenuItem value={item.id}>
                        <div className="flex items-center justify-between w-full">
                            <div>{item.title}</div>
                        </div>
                    </MenuItem>)}

                </Select>
            </FormControl>
        </div>
        <div className="md:w-1/2 p-20" align="right">
            <Button color="primary" variant="contained" type="submit">Save</Button>
        </div>
    </form>)
}
export default SubjectForm;