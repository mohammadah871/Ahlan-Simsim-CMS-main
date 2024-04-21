import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Form from './../../forms/user'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiBaseUrl, baseUrl } from './../../../../../constants/config'

function Edit(props) {

    const { id } = useParams();
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const submitData = (dataVal) => {
        let query = `
        mutation {
            UpdateUserData(userAppInput:{
                id:${id},
                email:"${dataVal.email}",
                fname:"${dataVal.fname}",
                lname:"${dataVal.lname}",
                gender:"${dataVal.gender}",
                country:"${dataVal.country}",
                phoneNo:"${dataVal.phoneNo}",
                role:"${dataVal.role}"
            }),{
                id,
                fname
            }
        }
        `

        axios
            .post(
                `${apiBaseUrl}/graphql`,
                {
                    "query": query,
                }
            ).then((res) => {
                navigate(baseUrl + "specialists")
            });
    }

    useEffect(() => {

        let query = `
        query {
            GetAppUserSingle(userAppInput:{
                id:${id}
            }),
            {
                email,
                country,
                fname,
                lname,
                gender,
                role,
                phoneNo
            }
        }`
        axios
            .post(
                `${apiBaseUrl}/graphql`,
                {
                    "query": query,
                }
            ).then((res) => {
                setData(res.data.data.GetAppUserSingle);
            });
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
                        Edit user
                    </Typography>
                </div>
            }
            content={
                <div className="w-full flex flex-col min-h-full p-12" style={{ boxSizing: "border-box" }}>
                    <FuseScrollbars>
                        <Typography component={motion.span} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Form data={data} mode={"edit"} submit={submitData} />
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