import React from "react";
import "./ProgramInnerScreen.css";
import Grid from "@mui/material/Grid";
import ProgramInnerTextComponent from "./ProgramInnerTextComponent";
import ProgrammInnerTextWithThumbComponent from "./ProgrammInnerTextWithThumbComponent";
import iconSessionDuration from "../icons/iconDuration.svg";
import iconTime from "../icons/iconTime.svg";
import iconAttendence from "../icons/iconAttendence.svg";
import iconFacilitator from "../icons/iconFacilitator.svg";
import iconParticipants from "../icons/iconParticipants.svg";
import ProgramInnerBreafComponent from "./ProgramInnerBreafComponent";

const ProgramInnerSlide1 = ({data}) => {

    return (
    
    
    <Grid
        dir="rtl"
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        paddingBottom={2}
        paddingY={'20px'}
        overflow="hidden"
        width={'100%'}
        xs={12}
    >
        <Grid
            dir="rtl"
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            paddingBottom={2}
            overflow="hidden"
            width={'50%'}
            xs={6}
            rowGap={1}>
            <ProgramInnerTextComponent data={{
                title: 'المكّون:',
                description: data?.data?.title_1
            }} 
            fontBoldTitle={false}
            />
            <Grid
                dir="rtl"
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                overflow="hidden"
                minWidth={'500px'}
                paddingX={'2px'}
                width={'90%'}
                xs={12}
            >
                <ProgrammInnerTextWithThumbComponent
                    icon={iconSessionDuration}
                    iconBgColor='#FF622F'
                    data={{
                        title: 'مدّة الجلسة:',
                        duration:  data?.data?.title_3,
                    }}
                    width='49%'
                    fontBold={true}
                />
                <ProgrammInnerTextWithThumbComponent
                    icon={iconTime}
                    iconBgColor="#3BC4FF"
                    data={{
                        title: 'وقت التّحضير:',
                        duration: data?.data?.title_4,
                    }}
                    width='49%'
                    fontBold={true}
                />
            </Grid>
     
            <ProgrammInnerTextWithThumbComponent
                icon={iconAttendence}
                iconBgColor='#AECF55'
                data={{
                    title: 'تسجيل الحضور:',
                    description:data?.data?.title_5,
                    duration: "",
                }}
                isSameLine={true}
                fontBold={true}
            />
        </Grid>

        <Grid
            dir="rtl"
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            overflow="hidden"
            width={'50%'}
            xs={6}
            columnSpacing={'2px'}
            rowGap={'8px'}
        >
            <ProgramInnerTextComponent
                data={{
                    title: 'الموضوع:',
                    description: data?.data?.title_2,
                }}
                fontBoldTitle={false}
            />

            <Grid
                dir="rtl"
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                overflow="hidden"
                minWidth={'500px'}
                paddingX={'2px'}
                width={'90%'}
                height={'100%'}
                xs={12}
            >

                <ProgrammInnerTextWithThumbComponent
                    icon={iconFacilitator}
                    iconBgColor="#FFC800"
                    data={{
                        title: 'عدد الميسّرين:',
                        duration: "",
                        description:  data?.data?.title_7,
                    }}
                    width='49%'
                    descriptionHeight='83px'
                    fontBold={true}
                />

                <ProgrammInnerTextWithThumbComponent
                    icon={iconParticipants}
                    iconBgColor="#FD71AF"
                    data={{
                        title: 'عدد المشاركين:',
                        duration:  "",
                        description:  data?.data?.title_9,
                    }}
                    width='49%'
                    descriptionHeight='83px'
                    fontBold={true}
                />

            </Grid>

        </Grid>

        <ProgramInnerBreafComponent data={{
            title: 'نبذة سريعة عن الجلسة',
            description: data?.data?.title_10,
        }} />


    </Grid>)
}

export default ProgramInnerSlide1;