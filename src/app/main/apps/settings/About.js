import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import axios from 'axios';
import { apiBaseUrl } from 'src/constants/config';

function Terms() {

    useEffect(() => {


        axios.post(apiBaseUrl + "/graphql",
            {
                query: "query request { GetSettings {  aboutEn,aboutAr } }"
            }
        ).then((res) => {
            if (res.data.data.GetSettings.aboutEn === null) {
                res.data.data.GetSettings.aboutEn = "";
            }

            if (res.data.data.GetSettings.aboutAr === null) {
                res.data.data.GetSettings.aboutAr = "";
            }
            setAboutEn(res.data.data.GetSettings.aboutEn);
            setAboutAr(res.data.data.GetSettings.aboutAr);
        })

    }, [])

    const [aboutAr, setAboutAr] = useState("");
    const [aboutEn, setAboutEn] = useState("");

    const saveData = () => {
        axios.post(apiBaseUrl + "/graphql",
            {
                query: "mutation request($data: SettingsInput) { UpdateSettings(settingsInput: $data) }",
                variables: {
                    data: {
                        aboutEn: aboutEn,
                        aboutAr: aboutAr
                    }
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
                        About Us
                    </Typography>
                </div>
            }

            content={
                <div className="w-full flex flex-col min-h-full p-12" style={{ boxSizing: "border-box" }}>
                    <FuseScrollbars>
                        <div>
                            <Typography className='mb-10'><b>Arabic text</b></Typography>
                            <CKEditor
                                id="editor1"
                                editor={ClassicEditor}
                                key={"editor1"}

                                config={
                                    {
                                        language: "ar"
                                    }

                                }


                                data={aboutAr}
                                onChange={(event, editor) => {
                                    const editordata = editor.getData();
                                    setAboutAr(editordata);
                                }}
                            />

                        </div>

                        <div className='mt-20'>
                            <Typography className='mb-10'><b>English text</b></Typography>
                            <CKEditor
                                editor={ClassicEditor}
                                id="editor2"
                                key={"editor2"}

                                data={aboutEn}
                                onChange={(event, editor) => {
                                    const editordata = editor.getData();
                                    setAboutEn(editordata);
                                }}
                            />

                        </div>
                        <div className='mt-20'>
                            <Button onClick={saveData} variant="contained" color="primary">Save</Button>
                        </div>
                    </FuseScrollbars>
                </div>

            }
        />



    </div>)
}
export default Terms;