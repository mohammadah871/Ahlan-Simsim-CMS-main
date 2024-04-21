import * as React from 'react';
import './TabsContainerType2.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ProgrammInnerTextWithThumbComponent from './ProgrammInnerTextWithThumbComponent';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
    console.log("index",index)
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabsContainerType2({ data }) {
    const tabStyles = {
        color: '#3BC4FF', // set your desired color here
        backgroundColor: '#FFFFFF', // set your desired color here
        '&.Mui-selected': {
            color: '#FFFFFF', // set your desired color for the selected tab here
            backgroundColor: '#3BC4FF',
        },
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const addAlpha = (hexColor, opacity) => {
        var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
        return hexColor + _opacity.toString(16).toUpperCase();
    }

    var FilterHide=data?.data?.filter((item)=>item.hide==false);


    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', }}>
            <div style={{ display: 'flex', padding: '20px' }}>
                <Box xs={6} sx={{
                    position: 'absolute', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    //  width: '80%',
                    borderRadius: '12px',
                    overflow: 'hidden'
                }} >
                    <Tabs   
                    style={{minWidth:"1000px"}}
                    centered value={value} onChange={handleChange} aria-label="basic tabs example"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "rgba(0,0,0,.17)",
                            }
                        }}
                    >
                        {FilterHide?.map((item, index) => {
                                return (
                                 
                                    <Tab
                                        sx={tabStyles}
                                        className="tabsContainerType2-label tabsContainerType2-titleHeader"
                                        style={{
                                            fontFamily: "Medium", backgroundColor: item.bgColor, color: 'white',
                                            overflow: 'hidden', borderColor: 'transparent', borderWidth: '0px', borderStyle: 'solid',
                                        }}
                                        label={item.title}
                                        {...a11yProps(index)}
                                    />

                                )
                            })

                        }
                    </Tabs>
                </Box>
            </div>
            {FilterHide?.map((_data, index) => {
                    return (
                      
                        <TabPanel value={value} index={index}>
                            <div className="tabsContainerType2-contentContainer">
                                {_data.tags.map((item) => {
                                    return (
                                        <ProgrammInnerTextWithThumbComponent
                                            icon={null}
                                            iconBgColor='#AECF55'
                                            iconSize={0}
                                            htmlPaddingRight={'1px'}
                                            bgColor={addAlpha(item.bgColor, .2)}
                                            data={{
                                                title: item.title,
                                                description: "",
                                                duration: "",
                                                contentHtml: item.contentHtml
                                            }}
                                            isSameLine={false}
                                            width={'46%'}
                                            fontBold={true}
                                        />
                                    );
                                })}
                            </div>
                        </TabPanel> 
                    )
                })
            }

        </Box>
    );
}