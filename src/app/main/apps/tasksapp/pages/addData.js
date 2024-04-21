import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Form from './../../forms/message'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl, baseUrl } from './../../../../../constants/config'

function Edit(props) {

    const [data, setData] = useState({});
    const navigate = useNavigate();
    const submitData = (dataVal) => {
        // let query = `
        // mutation {
        //     CreateSubject(subjectInput: { nameAr: "${dataVal.nameAr}",nameEn: "${dataVal.nameEn}" }),
        //     {
        //         name
        //     }
        //   }
        // `

        // axios
        //     .post(
        //         `${apiBaseUrl}/graphql`,
        //         {
        //             "query": query,
        //         }
        //     ).then((res) => {
        //         navigate(baseUrl + "subjects")
        //     });
    }

    useEffect(() => {

        // let query = `
        // query {
        //     GetSpecialtySingle(specialtyInput:{
        //         id:${id}
        //     }),
        //     {
        //         name
        //     }
        // }`
        // axios
        //     .post(
        //         `${apiBaseUrl}/graphql`,
        //         {
        //             "query": query,
        //         }
        //     ).then((res) => {
        //         setData(res.data.data.GetSpecialtySingle);
        //     });
    }, [])
    return (
        <FusePageCarded
            header={

                <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
                    <Typography
                        component={motion.span}
                        initial={{ x: -20 }}
                        animate={{ x: 0, transition: { delay: 0.2 } }}
                        delay={300}
                        className="text-24 md:text-32 font-extrabold tracking-tight"
                    >
                        Add message
                    </Typography>
                </div>
            }
            content={
                <div className="w-full flex flex-col min-h-full p-12" style={{ boxSizing: "border-box" }}>
                    <FuseScrollbars>
                        <Typography component={motion.span} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Form submit={submitData} />
                        </Typography>
                    </FuseScrollbars>

                </div>

            }
            leftSidebarContent={
                <div>Left Sidebar Content</div>
            }

            scroll="page"
        />
    )
}
export default Edit;