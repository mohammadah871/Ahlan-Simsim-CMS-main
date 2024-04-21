import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Form from './../../forms/taskapp'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl, baseUrl } from './../../../../../constants/config'

function Edit(props) {

    const [data, setData] = useState({});
    const navigate = useNavigate();
    const submitData = (dataVal) => {

        dataVal.fromdate = Math.floor(dataVal.fromdate.getTime() / 1000);
        dataVal.date = Math.floor(dataVal.date.getTime() / 1000);
        dataVal.country = parseInt(dataVal.country);

        let final_query = {
            "query": "mutation request($data: TaskInput) { CreateTask(taskInput: $data) }",
            "variables": {
                "data": dataVal
            }
        }

        axios
            .post(
                `${apiBaseUrl}/graphql`, final_query
            ).then((res) => {
                navigate(baseUrl + "taskapp")
            });
    }

    useEffect(() => {


        // http://localhost:4000/api/cms/engin/countries_controll



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
                        Add event
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