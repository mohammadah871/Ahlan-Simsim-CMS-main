import React, { useState } from "react";
import "./ProgramInnerScreen.css";
import Grid from "@mui/material/Grid";


import ProgramInnerTextComponent from "./ProgramInnerTextComponent";
import ProgrammInnerTextWithThumbComponent from "./ProgrammInnerTextWithThumbComponent";


import iconSessionDuration from "../icons/iconDuration.svg";
import iconLinks from "../icons/iconLinks.svg";
import iconPaper from "../icons/iconPaper.svg";

const ProgramInnerType2Slide1 = ({ data }) => {

console.log("data",data)

    return (
    
    <Grid
        dir="rtl"
        container
        // spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        paddingBottom={2}
        paddingY={'20px'}
        overflow="hidden"
        // minWidth={'500px'}
        width={'100%'}
        xs={12}
    >
        <Grid
            dir="rtl"
            container
            // columnSpacing={2}
            direction="column"
            justifyContent="flex-start"
            alignItems="felx-start"
            paddingBottom={2}
            paddingRight={'15px'}
            overflow="hidden"
            width={'90%'}
            xs={12}
            rowGap={1}
        >
            {/* <Grid item justifyContent="center" alignItems="center" className="programInner-textContainer"> */}
            <ProgramInnerTextComponent data={{
                title: data?.title
            }}
                bgColor={'transparent'}
                paddingY={'3px'}
                fontBoldTitle={false}
            />
            <Grid
                dir="rtl"
                container
                // spacing={2}
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
                        title: 'مدّة المكالمة:',
                        duration: data?.data?.time,
                    }}
                    width='auto'
                    fontBold={true}
                />
            </Grid>

            <Grid
                dir="rtl"
                container
                // spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                overflow="hidden"
                minWidth={'500px'}
                // paddingX={'2px'}
                width={'99%'}
                xs={12}
            >
                <ProgrammInnerTextWithThumbComponent
                    icon={iconLinks}
                    iconBgColor='#AECF55'
                    data={{
                        title: 'روابط الفيديوهات والقصص:',
                        description: "",
                        duration: "",
                        contentHtml: data?.data?.description1
                    }}
                    isSameLine={false}
                    width={'46%'}
                    fontBold={true}
                />
                <ProgrammInnerTextWithThumbComponent
                    icon={iconPaper}
                    iconBgColor='#3BC4FF'
                    data={{
                        title: 'أوراق العمل:',
                        description: "",
                        duration: "",
                        contentHtml: data?.data?.description2
                    }}
                    isSameLine={false}
                    width={'46%'}
                    fontBold={true}
                />
            </Grid>
        </Grid>

    </Grid>
    
    )
}

export default ProgramInnerType2Slide1;