import Counts from './widgets/counts';
import Chart from './widgets/chart';
import { motion } from 'framer-motion';
import Donut from './widgets/donut';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiBaseUrl, baseUrl } from '../../../../constants/config';
import { Link } from 'react-router-dom';
import { Button, Paper } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function DashboardPage() {

    const [userNo, setUserNo] = useState(0)
    const [sessionNo, setSessionNo] = useState(0)
    const [countryData, setCountryData] = useState(0)
    const [countryLabels, setCountryLabels] = useState([]);
    const [userLabels, setUserLabels] = useState([]);
    const [userCounts, setUserCounts] = useState([]);

    const [genderData, setGenderData] = useState([]);
    const [programsCount, setProgramCount] = useState(0);
    const [value, setValue] = useState(1);
    const [ResourceDownloadCount, setResourceDownloadCount] = useState(0);
    const [ResourceViewCount, setResourceViewCount] = useState(0);
    const [downloadProgramCount, setDownloadProgramCount] = useState(0);
    const [downloadSessionCount, setDownloadSessionCount] = useState(0);

    const [plansCount, setPlansCount] = useState(0);


    const [ResourceDownloadList, setResourceDownloadList] = useState([]);
    const [ResourceViewList, setResourceViewList] = useState([]);

    const [downloadProgramList, setDownloadProgramList] = useState([]);
    const [downloadSessionsList, setDownloadSessionsList] = useState([]);


    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    const container = {
        show: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    useEffect(() => {
        // axios({
        //     method: "post",
        //     url: apiBaseUrl + "/graphql",
        //     data: {
        //         query: "query request { GetCountryUserNo {  _id,count,data{title_ar,country_key,id} }}"
        //     }
        // }).then((res) => {

        //     let total = 0;
        //     res.data.data.GetCountryUserNo.forEach(element => {
        //         total += element.count;
        //     });
        //     setUserNo(total);
        // });

        let promiseList = [];
        promiseList.push(axios({
            method: "post",
            url: apiBaseUrl + "/graphql",
            data: {
                query: "query request { GetCountryUserNo {  _id,count,data{title_ar,country_key,id} }}"
            }
        }))

        promiseList.push(axios({
            method: "post",
            url: apiBaseUrl + "/graphql",
            data: {
                "query": "query request { GetCountryUserSessions }"
            }
        }));

        promiseList.push(axios({
            method: "post",
            url: apiBaseUrl + "/graphql",
            data: {
                "query": "query request { GetUserLastMonths {  _id,count}}"
            }
        }));
        promiseList.push(axios({
            method: "post",
            url: apiBaseUrl + "/graphql",
            data: {
                "query": "query request { GetUserGender {  _id,count}}"
            }
        }));

        promiseList.push(

            axios({
                method: "post",
                url: apiBaseUrl + "/graphql",
                data: {
                    "query": "query request { ProgramList {  id,title}}"
                }
            })
        )

        promiseList.push(

            axios({
                method: "post",
                url: apiBaseUrl + "/graphql",
                data: {
                    "query": "query request { ResourcesDownloadAndViews {  downloads,views}}"
                }
            })
        );

        promiseList.push(

            axios({
                method: "post",
                url: apiBaseUrl + "/graphql",
                data: {
                    "query": "query request { ResourcesDownloadAndViewsList {  downloads { count,_id{name,type}},views{count,_id{name,type}}}}"
                }
            })
        );

        promiseList.push(

            axios({
                method: "post",
                url: apiBaseUrl + "/graphql",
                data: {
                    "query": "query request { ProgramsDownloadAndViews {  downloads,views}}"
                }
            })
        );

        promiseList.push(

            axios({
                method: "post",
                url: apiBaseUrl + "/graphql",
                data: {
                    "query": "query request { ProgramsDownloadAndViewsList {  programs { count,_id{name,type}},sessions{count,_id{name,type}}}}"
                }
            })
        );


        promiseList.push(

            axios({
                method: "post",
                url: apiBaseUrl + "/graphql",
                data: {
                    "query": "query request { PlanCounts }"
                }
            })
        );


        Promise.all(promiseList).then((promiseData) => {
            let total = 0;

            let countryChartLabels = [];
            let countryChartData = [];

            promiseData[0].data.data.GetCountryUserNo.forEach(element => {
                countryChartLabels.push(element.data[0].title_ar);
                countryChartData.push(element.count);

                total += element.count;
            });
            setCountryLabels(countryChartLabels);
            setCountryData(countryChartData);
            setUserNo(total);
            setSessionNo((promiseData[1].data.data.GetCountryUserSessions / total).toPrecision(3));

            let chartLabels = [];
            let chartCounts = [];
            promiseData[2].data.data.GetUserLastMonths.forEach((element) => {
                chartLabels.push(element._id);
                chartCounts.push(element.count);
            });

            setUserLabels(chartLabels);
            setUserCounts(chartCounts);

            let gendercounts = promiseData[3].data.data.GetUserGender.map((item) => item.count);



            setGenderData(gendercounts);

            setProgramCount(promiseData[4].data.data.ProgramList.length);

            setResourceDownloadCount(promiseData[5].data.data.ResourcesDownloadAndViews.downloads);
            setResourceViewCount(promiseData[5].data.data.ResourcesDownloadAndViews.views);

            setResourceDownloadList(promiseData[6].data.data.ResourcesDownloadAndViewsList.downloads);
            setResourceViewList(promiseData[6].data.data.ResourcesDownloadAndViewsList.views);


            setDownloadProgramCount(promiseData[7].data.data.ProgramsDownloadAndViews.downloads);
            setDownloadSessionCount(promiseData[7].data.data.ProgramsDownloadAndViews.views);
            setDownloadProgramList(promiseData[8].data.data.ProgramsDownloadAndViewsList.programs)
            setDownloadSessionsList(promiseData[8].data.data.ProgramsDownloadAndViewsList.sessions)

            setPlansCount(promiseData[9].data.data.PlanCounts)


        });


    }, [])


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (

        <div className='p-40'>



            <Tabs value={value} onChange={handleChange} centered className='pb-20'>
                <Tab label="Resources" />
                <Tab label="Users" />
            </Tabs>


            {value === 0 &&
                <>
                    <motion.div className='flex gap-20 flex-wrap md:flex-nowrap'
                        initial="hidden"
                        animate="show"
                        variants={container}
                    >
                        <motion.div variants={item} className='flex-1 w-1/2 md:w-full'><Counts title={"Downloadable resources"} count={ResourceDownloadCount} color={"text-orange-300"} /></motion.div>
                        <motion.div variants={item} className='flex-1 w-1/2 md:w-full'><Counts title={"Viewed resources"} count={ResourceViewCount} color={"text-blue-500"} /></motion.div>
                        <motion.div variants={item} className='flex-1 w-1/2 md:w-full'><Counts title={"Downloadable programs"} count={downloadProgramCount} color={"text-red-500"} /></motion.div>
                        <motion.div variants={item} className='flex-1 w-1/2 md:w-full'><Counts title={"Downloadable sessions"} count={downloadSessionCount} color={"text-green-500"} /></motion.div>

                    </motion.div>

                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={container}
                        className='pt-20 flex gap-0 flex-wrap'>
                        <motion.div variants={item} className='w-1/4 p-10 flex items-center justify-center'>
                            <Paper className='w-full h-[100%]'>
                                <div className='w-full p-20'>
                                    <div className='text-left text-xl'>Most downloadable resources</div>
                                    <div className='flex items-center p-20 gap-20 border-b justify-between'>
                                        <div className='flex items-center gap-10'>
                                            <div className='font-[medium] text-[15px] font-bold'>الاسم</div>
                                        </div>
                                        <div className='text-[15px] font-bold font-[medium]'>العدد</div>
                                    </div>
                                    {ResourceDownloadList.map((item) => {
                                        return (<div className='flex items-center p-20 gap-20 border-b justify-between'>
                                            <div className='flex items-center gap-10'>
                                                <div className="flex-0 w-8 h-8 rounded-full MuiBox-root muiltr-1jburdu bg-[#FFB74D]"></div>
                                                <div className='font-[medium] text-[15px]'>{item._id.name}</div>
                                            </div>
                                            <div className='text-[#6B7280] text-[15px]'>{item.count}</div>
                                        </div>)
                                    })}
                                </div>
                            </Paper>
                        </motion.div>
                        <motion.div variants={item} className='w-1/4 p-10 flex items-center justify-center'>
                            <Paper className='w-full h-[100%]'>
                                <div className='w-full p-20'>
                                    <div className='text-left text-xl'>Most viewed resources</div>
                                    <div className='flex items-center p-20 gap-20 border-b justify-between'>
                                        <div className='flex items-center gap-10'>
                                            <div className='font-[medium] text-[15px] font-bold'>الاسم</div>
                                        </div>
                                        <div className='text-[15px] font-bold font-[medium]'>العدد</div>
                                    </div>
                                    {ResourceViewList.map((item) => {
                                        return (<div className='flex items-center p-20 gap-20 border-b justify-between'>
                                            <div className='flex items-center gap-10'>
                                                <div className="flex-0 w-8 h-8 rounded-full MuiBox-root muiltr-1jburdu bg-blue-500"></div>
                                                <div className='font-[medium] text-[15px]'>{item._id.name}</div>
                                            </div>
                                            <div className='text-[#6B7280] text-[15px]'>{item.count}</div>
                                        </div>)
                                    })}
                                </div>
                            </Paper>
                        </motion.div>

                        <motion.div variants={item} className='w-1/4 p-10 flex items-center justify-center'>
                            <Paper className='w-full h-[100%]'>
                                <div className='w-full p-20'>
                                    <div className='text-left text-xl'>Most downloadable programs</div>
                                    <div className='flex items-center p-20 gap-20 border-b justify-between'>
                                        <div className='flex items-center gap-10'>
                                            <div className='font-[medium] text-[15px] font-bold'>الاسم</div>
                                        </div>
                                        <div className='text-[15px] font-bold font-[medium]'>العدد</div>
                                    </div>
                                    {downloadProgramList.map((item) => {
                                        return (<div className='flex items-center p-20 gap-20 border-b justify-between'>
                                            <div className='flex items-center gap-10'>
                                                <div className="flex-0 w-8 h-8 rounded-full MuiBox-root muiltr-1jburdu bg-blue-500"></div>
                                                <div className='font-[medium] text-[15px]'>{item._id.name}</div>
                                            </div>
                                            <div className='text-[#6B7280] text-[15px]'>{item.count}</div>
                                        </div>)
                                    })}
                                </div>
                            </Paper>
                        </motion.div>

                        <motion.div variants={item} className='w-1/4 p-10 flex items-center justify-center'>
                            <Paper className='w-full h-[100%]'>
                                <div className='w-full p-20'>
                                    <div className='text-left text-xl'>Most downloadable sessions</div>
                                    <div className='flex items-center p-20 gap-20 border-b justify-between'>
                                        <div className='flex items-center gap-10'>
                                            <div className='font-[medium] text-[15px] font-bold'>الاسم</div>
                                        </div>
                                        <div className='text-[15px] font-bold font-[medium]'>العدد</div>
                                    </div>
                                    {downloadSessionsList.map((item) => {
                                        return (<div className='flex items-center p-20 gap-20 border-b justify-between'>
                                            <div className='flex items-center gap-10'>
                                                <div className="flex-0 w-8 h-8 rounded-full MuiBox-root muiltr-1jburdu bg-blue-500"></div>
                                                <div className='font-[medium] text-[15px]'>{item._id.name}</div>
                                            </div>
                                            <div className='text-[#6B7280] text-[15px]'>{item.count}</div>
                                        </div>)
                                    })}
                                </div>
                            </Paper>
                        </motion.div>
                    </motion.div>
                </>
            }

            {value === 1 &&
                <>
                    <motion.div className='flex gap-20 flex-wrap md:flex-nowrap'
                        initial="hidden"
                        animate="show"
                        variants={container}
                    >
                        <motion.div variants={item} className='flex-1 w-1/2 md:w-full'>
                            <Link to={baseUrl + "desktop_accounts"} style={{ textDecoration: "none" }}>
                                <Counts title={"App users"} count={userNo} color={"text-red-500"} />
                            </Link>
                        </motion.div>
                        <motion.div variants={item} className='flex-1 w-1/2 md:w-full'><Counts title={"Session per login"} count={sessionNo} color={"text-green-500"} /></motion.div>
                        <motion.div variants={item} className='flex-1 w-1/2 md:w-full'><Counts title={"Programs"} count={programsCount} color={"text-orange-300"} /></motion.div>
                        <motion.div variants={item} className='flex-1 w-1/2 md:w-full'><Counts title={"Plans"} count={plansCount} color={"text-blue-300"} /></motion.div>

                    </motion.div>


                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={container}
                        className='pt-20 flex gap-0 flex-wrap'>
                        <motion.div variants={item} className='w-1/2 p-10 flex items-center justify-center'>
                            <Chart title={"Users"} labels={userLabels} data={userCounts} />
                        </motion.div>
                        <motion.div variants={item} className='w-1/2 p-10 flex items-center justify-center'>
                            <Donut height={300} title={"User Countries"} labels={countryLabels} data={countryData} />
                        </motion.div>

                        <motion.div variants={item} className='w-1/2 p-10 flex items-center justify-center'>
                            <Donut height={300} title={"User Countries"} labels={["Male", "Female"]} data={genderData} />
                        </motion.div>
                    </motion.div>
                </>
            }


        </div>
    )
}

export default DashboardPage;