import * as React from "react";
import "./TabsContainer.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import ProgramInnerTextComponent from "./ProgramInnerTextComponent";

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
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

export default function TabsContainer({ data }) {
  const tabStyles = {
    color: "#3BC4FF", // set your desired color here
    backgroundColor: "#FFFFFF", // set your desired color here
    "&.Mui-selected": {
      color: "#FFFFFF", // set your desired color for the selected tab here
      backgroundColor: "#3BC4FF",
    },
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div style={{ display: "flex", position: "relative", padding: "20px" }}>
        <Box
          xs={6}
          sx={{
            borderRadius: "12px",
            overflow: "hidden",
            borderColor: "#3BC4FF",
            borderWidth: "2px",
            borderStyle: "solid",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Tabs
            centered
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: "transparent",
              },
            }}
          >
            <Tab
              sx={tabStyles}
              className="tabsContainer-label tabsContainer-titleHeader"
              style={{ fontFamily: "Medium" }}
              label={"1." + data?.title_second_section_1}
              {...a11yProps(0)}
            />
            <Tab
              sx={tabStyles}
              className="tabsContainer-label tabsContainer-titleHeader"
              style={{ fontFamily: "Medium" }}
              label={"2." + data?.title_second_section_2}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
      </div>

      <TabPanel value={value} index={0}>
        <div className="tabsContainer-contentContainer">
          {data?.tags_1.map((item) => {
            return (
              <ProgramInnerTextComponent
                data={{
                  description: item,
                }}
                width="29%"
                textAlign="right"
                bgColor="#d8f3ff"
                isPoint={false}
                fontBoldTitle={false}

              />
            );
          })}
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div className="tabsContainer-contentContainer">
          {data?.tags_2.map((item) => {
            return (
              <ProgramInnerTextComponent
                data={{
                  description: item,
                }}
                width="29%"
                textAlign="right"
                bgColor="#d8f3ff"
                isPoint={false}
                fontBoldTitle={false}
              />
            );
          })}
        </div>
      </TabPanel>
    </Box>
  );
}
