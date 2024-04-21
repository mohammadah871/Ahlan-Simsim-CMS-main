import React, { useState, useEffect, useRef } from "react";
import { orange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import FuseLoading from "@fuse/core/FuseLoading";
import _ from "@lodash";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {
  GetProgramCategory,
  GetProgramList,
  CreateProgramCategory,
} from "src/constants/Apis";

import Card3 from "../../../components/Cards_3";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
  "& .productImageFeaturedStar": {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
    display: "none",
  },

  "& .productImageUpload": {
    width: "100%",
    height: 194,
    background: "transparent",
  },

  "& .productImageItem": {
    "&:hover": {
      "& .productImageFeaturedStar": {
        background: "transparent",
      },
    },
    "&.featured": {},
  },
}));

function ProgramsPage() {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [dataApi, setDataApi] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [AllprogramList, setAllprogramList] = useState([]);

  const Save = async (title, img, programSelect, color1) => {
    console.log("programSelect", programSelect);

    let FilterCountry = [];
    programSelect.forEach((element) => {
      let f = AllprogramList.find((item) => item.id == element);

      FilterCountry.push({

        id: f.id,

        title: f.title,

        order: f.order,

        image: f.image,

        country_id: f.country_id,

        class: f.class,

        target_audience: f.target_audience,

        color: f.color,

        tags: f.tags,

        current_progarm: f.current_progarm,

        type: f.type

      });
    });

    let data = {
      id: null,
      title: title,
      image: img,
      program: FilterCountry,
      color: color1,
    };

    await CreateProgramCategory(data);

    handleClose();

    await GetData();
  };

  const Update = async (id, title, img, programSelect, color1) => {
    let FilterCountry = [];
    programSelect.forEach((element) => {
      let f = AllprogramList.find((item) => item.id == element);

      FilterCountry.push({

        id: f.id,

        title: f.title,

        order: f.order,

        image: f.image,

        country_id: f.country_id,

        class: f.class,

        target_audience: f.target_audience,

        color: f.color,

        tags: f.tags,

        current_progarm: f.current_progarm,

        type: f.type

      });
    });

    let data = {
      id: id,
      title: title,
      image: img,
      program: FilterCountry,
      color: color1,
    };

    await CreateProgramCategory(data);

    handleClose();

    await GetData();
  };

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    let data = await GetProgramCategory();
    let Allprogram = await GetProgramList();
    setAllprogramList(Allprogram);
    setDataApi(data);
    setLoading(false);
  };

  return (
    <>
      <Root
        header={
          <div className="p-24 flex flex-row items-center justify-between flex-wrap gap-20">
            <h1>Program Category</h1>
            {loading ? null : (
              <Button
                onClick={() => handleOpen()}
                className="mx-8 whitespace-nowrap"
                variant="contained"
                color="secondary"
              >
                <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
                <span className="mx-8">Add Category</span>
              </Button>
            )}
          </div>
        }
        content={
          loading ? (
            <div className="flex items-center justify-center h-full w-full">
              <FuseLoading />
            </div>
          ) : (
            <div
              style={{
                maxWidth: "100%",
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                gap: 30,
                flexDirection: "row",
              }}
              className="p-24"
            >
              {dataApi?.map((item, index) => {
                return (
                  <Card3
                    key={"create_card_" + item?.id}
                    id={item?.id}
                    check={true}
                    update={Update}
                    Allprogram={AllprogramList}
                    title={item?.title}
                    img={item?.image}
                    program={item?.program}
                    color={item?.color}
                  />
                );
              })}
            </div>
          )
        }
        scroll="content"
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <Box sx={style}>
          <Card3
            key={"create_card_" + Math.random(1000)}
            id={"create_card_" + Math.random(1000)}
            check={false}
            save={Save}
            Allprogram={AllprogramList}
          />
        </Box>
      </Modal>
    </>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "auto",
  bgcolor: "background.paper",
  border: "2px solid #e2e8f0",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  display: "grid",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

export default ProgramsPage;
