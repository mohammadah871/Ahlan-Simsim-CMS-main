import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import { apiBaseUrl } from 'src/constants/config';
import AndroidIcon from '@mui/icons-material/Android';
import InputAdornment from '@mui/material/InputAdornment';
import AppleIcon from '@mui/icons-material/Apple';
import WebIcon from '@mui/icons-material/DesktopWindowsSharp';
import Popup from './../../../../components/popup/sample';

function Terms() {

    useEffect(() => {


        axios.post(apiBaseUrl + "/graphql",
            {
                query: "query request { GetSettings {  webVersion,androidVersion,iosVersion,titleEn,titleAr,bodyEn,bodyAr,buttonEn,buttonAr } }"
            }
        ).then((res) => {
            console.log(res.data.data.GetSettings)
            setData(res.data.data.GetSettings)
        })

    }, [])

    const [data, setData] = useState({
        androidVersion: "0",
        iosVersion: "0",
        webVersion: "0",
        titleEn: "",
        titleAr: "",
        bodyEn: "",
        bodyAr: "",
        buttonEn: "",
        buttonAr: ""
    })
    const saveData = () => {
        axios.post(apiBaseUrl + "/graphql",
            {
                query: "mutation request($data: SettingsInput) { UpdateSettings(settingsInput: $data) }",
                variables: {
                    data: data
                }
            }
        ).then((res) => {

        })

    }

    return (<div className='m-20'>
        <FusePageCarded
            header={

                <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-center py-32 px-24 md:px-32 text-center">
                    <Typography
                        component={motion.span}
                        initial={{ x: -20 }}
                        animate={{ x: 0, transition: { delay: 0.2 } }}
                        delay={300}
                        className="text-24 md:text-32 font-extrabold tracking-tight text-center	"
                    >
                        Force update
                    </Typography>
                </div>
            }

            content={
                <div className="w-full flex flex-col min-h-full p-12" style={{ boxSizing: "border-box" }}>
                    <FuseScrollbars>
                        <div className='grid md:grid-cols-2 w-full p-[30px] gap-[30px]'>
                            <div>
                                <TextField
                                    className='w-full'
                                    label={"Android version"}
                                    value={data.androidVersion}
                                    onChange={(e) => {
                                        setData({ ...data, androidVersion: e.target.value })
                                    }}

                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AndroidIcon />
                                            </InputAdornment>
                                        ),
                                    }}

                                />
                            </div>

                            <div>
                                <TextField
                                    className='w-full'

                                    label={"IOS version"}
                                    value={data.iosVersion}

                                    onChange={(e) => {
                                        setData({ ...data, iosVersion: e.target.value })
                                    }}

                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AppleIcon />
                                            </InputAdornment>
                                        ),
                                    }}

                                />
                            </div>

                            <div>
                                <TextField
                                    className='w-full'

                                    label={"Desktop version"}
                                    value={data.webVersion}

                                    onChange={(e) => {
                                        setData({ ...data, webVersion: e.target.value })
                                    }}

                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <WebIcon />
                                            </InputAdornment>
                                        ),
                                    }}

                                />
                            </div>


                            <div>
                                <TextField
                                    className='w-full'
                                    label={"Title English"}
                                    value={data.titleEn}

                                    onChange={(e) => {
                                        setData({ ...data, titleEn: e.target.value })
                                    }}

                                />
                            </div>

                            <div>
                                <TextField
                                    className='w-full'
                                    value={data.titleAr}

                                    label={"Title arabic"}
                                    onChange={(e) => {
                                        setData({ ...data, titleAr: e.target.value })
                                    }}

                                />
                            </div>


                            <div>
                                <TextField
                                    className='w-full'
                                    label={"Body English"}
                                    value={data.bodyEn}

                                    onChange={(e) => {
                                        setData({ ...data, bodyEn: e.target.value })
                                    }}

                                />
                            </div>

                            <div>
                                <TextField
                                    className='w-full'
                                    value={data.bodyAr}

                                    label={"Body Arabic"}
                                    onChange={(e) => {
                                        setData({ ...data, bodyAr: e.target.value })
                                    }}


                                />
                            </div>


                            <div>
                                <TextField
                                    className='w-full'
                                    label={"Button English"}
                                    value={data.buttonEn}

                                    onChange={(e) => {
                                        setData({ ...data, buttonEn: e.target.value })
                                    }}


                                />
                            </div>

                            <div>
                                <TextField
                                    className='w-full'

                                    label={"Button Arabic"}
                                    value={data.buttonAr}

                                    onChange={(e) => {
                                        setData({ ...data, buttonAr: e.target.value })
                                    }}

                                />
                            </div>
                            <div>
                            </div>


                            <div className='mt-20'>
                                <Button onClick={saveData} variant="contained" color="primary">Save</Button>
                            </div>
                        </div>



                    </FuseScrollbars>
                </div>

            }
        />



    </div>)
}
export default Terms;