import React, { useState, useEffect, useRef } from "react";
import { orange } from "@mui/material/colors";
import { styled, lighten } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import FuseLoading from "@fuse/core/FuseLoading";
import _ from "@lodash";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import {
  CreateCountriesControll,
  GetCountriesControll,
  UploadFile,
} from "src/constants/Apis";
import { apiBaseUrlImage } from "src/constants/config";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
  const [title, setTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [countryKey, setCountry_key] = useState("");

  const [dataApi, setDataApi] = useState([]);
  const [img, setImg] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Save = async () => {
    if (title != "") {
      let data = {
        id: null,
        title: title,
        title_ar: titleAr,
        icon: img,
        country_key: countryKey,
      };
      await CreateCountriesControll(data);
      handleClose();
      setTitle("");
      setCountry_key("");
      setImg("");
      setTitleAr("")
      await GetData();
    }
  };
  const schema = yup.object().shape({});

  const defaultValues = {};
  const { formState, control, setValue, getValues } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const Update = async (id) => {
    var temp = [...dataApi];
    let data = {
      id: id,
      title: temp.find((item) => item.id == id).title,
      title_ar: temp.find((item) => item.id == id).title_ar,
      country_key: temp.find((item) => item.id == id).country_key,
      icon: temp.find((item) => item.id == id).icon,
    };
    await CreateCountriesControll(data);
  };

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    let data = await GetCountriesControll();
    setDataApi(data);
    setLoading(false);
  };

  const change1 = (value, id) => {
    var temp = [...dataApi];
    let newData = temp.find((item) => item.id == id);
    newData.title = value;
    setDataApi(temp);
  };

  const inputFile = useRef(null);

  const change2 = (value, id) => {
    var temp = [...dataApi];
    let newData = temp.find((item) => item.id == id);
    newData.icon = value;
    setDataApi(temp);
  };

  const change3 = (value, id) => {
    var temp = [...dataApi];
    let newData = temp.find((item) => item.id == id);
    newData.country_key = value;
    setDataApi(temp);
  };

  const change4 = (value, id) => {
    var temp = [...dataApi];
    let newData = temp.find((item) => item.id == id);
    newData.title_ar = value;
    setDataApi(temp);
  };

  return (
    <>
      <Root
        header={
          <div className="p-24 flex flex-row items-center justify-between flex-wrap gap-20">
            <h1>Countries</h1>
            {loading ? null : (
              <Button
                onClick={() => handleOpen()}
                className="mx-8 whitespace-nowrap"
                variant="contained"
                color="secondary"
              >
                <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
                <span className="mx-8">Add Country</span>
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
                gap: 40,
              }}
              className="p-24"
            >
              {dataApi?.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: "25%",
                      border: "1px solid #ccc",
                      padding: 35,
                      borderRadius: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: 10,
                        marginBottom: 25,
                      }}
                    >
                      <div
                        style={{ marginLeft: 10, marginRight: 10 }}
                        className="productImageUpload flex items-center justify-center relative w-128 h-128 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                      >
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={apiBaseUrlImage + item?.icon}
                        />
                      </div>

                      <Controller
                        name="img"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Box
                            sx={{
                              backgroundColor: (theme) =>
                                theme.palette.mode === "light"
                                  ? lighten(
                                    theme.palette.background.default,
                                    0.4
                                  )
                                  : lighten(
                                    theme.palette.background.default,
                                    0.02
                                  ),
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                            component="label"
                            htmlFor={`img_${item?.id}`}
                            className="productImageUpload flex items-center justify-center relative w-128 h-128 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                          >
                            <input
                              ref={inputFile}
                              accept="image/*"
                              className="hidden"
                              id={`img_${item?.id}`}
                              type="file"
                              onChange={async (e) => {
                                const file = e.target.files;
                                if (!file) {
                                  return;
                                }
                                const URL = await UploadFile(file);

                                console.log("URL", URL);

                                change2(URL?.data[0]?.path, item?.id);
                              }}
                            />
                            <FuseSvgIcon size={32} color="action">
                              heroicons-outline:upload
                            </FuseSvgIcon>
                            <span style={{ marginTop: 5 }} className="span-1">
                              Upload Image
                            </span>
                          </Box>
                        )}
                      />
                    </div>

                    <TextField
                      onChange={(e) => change1(e.target.value, item?.id)}
                      value={item?.title}
                      className="width-input"
                      label="Title"
                      id={"title_" + index}
                      variant="outlined"
                      fullWidth
                    />

                    <TextField
                      onChange={(e) => change4(e.target.value, item?.id)}
                      value={item?.title_ar}
                      className="width-input"
                      label="Title Arabic"
                      id={"title_ar_" + index}
                      variant="outlined"
                      fullWidth
                      style={{ marginTop: 15 }}
                    />

                    <TextField
                      onChange={(e) => change3(e.target.value, item?.id)}
                      value={item?.country_key}
                      className="width-input"
                      label="Country key"
                      id={"country_key_" + index}
                      variant="outlined"
                      fullWidth
                      style={{ marginTop: 15 }}
                    />

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        onClick={() => Update(item?.id)}
                        className="mx-8 whitespace-nowrap"
                        variant="contained"
                        color="secondary"
                        style={{ width: "30%", height: 50, marginTop: 30 }}
                      >
                        <span className="mx-8">Update</span>
                      </Button>
                    </div>
                  </div>
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            {img != "" ? (
              <div
                style={{ marginLeft: 10, marginRight: 10 }}
                className="productImageUpload flex items-center justify-center relative w-128 h-128 overflow-hidden cursor-pointer shadow hover:shadow-lg"
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={apiBaseUrlImage + img}
                />
              </div>
            ) : null}

            <Controller
              name="img"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                  component="label"
                  htmlFor={`img_1}`}
                  className="productImageUpload flex items-center justify-center relative w-128 h-128 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                >
                  <input
                    ref={inputFile}
                    accept="image/*"
                    className="hidden"
                    id={`img_1}`}
                    type="file"
                    onChange={async (e) => {
                      const file = e.target.files;
                      if (!file) {
                        return;
                      }
                      const URL = await UploadFile(file);

                      console.log("URL", URL);

                      setImg(URL?.data[0]?.path);
                    }}
                  />
                  <FuseSvgIcon size={32} color="action">
                    heroicons-outline:upload
                  </FuseSvgIcon>
                  <span style={{ marginTop: 5 }} className="span-1">
                    Upload Image
                  </span>
                </Box>
              )}
            />
          </div>


          <TextField
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="width-input"
            label="Title"
            id="title"
            variant="outlined"
            fullWidth
          />


          <TextField
            onChange={(e) => setTitleAr(e.target.value)}
            value={titleAr}
            className="width-input"
            label="Title Arabic"
            id="title_ar"
            variant="outlined"
            fullWidth
            style={{ marginTop: 15 }}
          />

          <TextField
            onChange={(e) => setCountry_key(e.target.value)}
            value={countryKey}
            className="width-input"
            label="Country key"
            id="country_key"
            variant="outlined"
            fullWidth
            style={{ marginTop: 15 }}
          />

          <Button
            onClick={() => Save()}
            className="mx-8 whitespace-nowrap"
            variant="contained"
            color="secondary"
            style={{ width: "30%", height: 50, marginTop: 30 }}
          >
            <span className="mx-8">Save</span>
          </Button>
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
  width: "50%",
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
