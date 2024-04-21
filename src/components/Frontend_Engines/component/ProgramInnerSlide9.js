import React, { useState } from "react";
import "./ProgramInnerScreen.css";
import Grid from "@mui/material/Grid";



import ProgramInnerTextComponent from "./ProgramInnerTextComponent";
import ProgrammInnerTextWithThumbComponent from "./ProgrammInnerTextWithThumbComponent";

import iconTic from "../icons/iconTick.svg";



const ProgramInnerType2Slide2 = ({data}) => {

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
                direction="column"
                justifyContent="space-between"
                alignItems="flex-start"
                overflow="hidden"
                minWidth={'500px'}
                paddingX={'2px'}
                width={'90%'}
                xs={12}
            >
                {
                    data?.data?.tags?.map((item, index) => {
                        return (<ProgrammInnerTextWithThumbComponent
                            icon={iconTic}
                            iconBgColor='#8ECB5E'
                            iconSize={20}
                            titleFontSize='13px'
                            bgColor={'transparent'}
                            data={{
                                title: item
                            }}
                            isSameLine={false}
                            width='auto'
                            fontBold={false}
                        />);
                    })
                }
            </Grid>
        </Grid>

    </Grid>
    
    )
}

export default ProgramInnerType2Slide2;