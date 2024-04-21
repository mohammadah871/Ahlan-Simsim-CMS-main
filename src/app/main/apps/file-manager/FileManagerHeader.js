import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useSelector } from "react-redux";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {
  getItems,
  selectFiles,
  selectFolders,
  selectPath,
} from "./store/itemsSlice";

import React, { forwardRef, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { apiBaseUrlImage, baseUrl } from "src/constants/config";
import Box from "@mui/material/Box";

import { orange } from "@mui/material/colors";
import { lighten, styled } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import {
  CheckFileManager,
  CreateFileManager,
  UploadFile,
  GetProgramList,
} from "src/constants/Apis";

import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";

import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { useDispatch } from "react-redux";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Root = styled("div")(({ theme }) => ({
  "& .productImageFeaturedStar": {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
    display: "none",
  },

  "& .productImageUpload": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },

  "& .productImageItem": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& .productImageFeaturedStar": {
        opacity: 0.8,
        display: "none",
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& .productImageFeaturedStar": {
        opacity: 1,
        display: "none",
      },
      "&:hover .productImageFeaturedStar": {
        opacity: 1,
        display: "none",
      },
    },
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FileManagerHeader(props) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const folders = useSelector(selectFolders);

  const files = useSelector(selectFiles);

  const path = useSelector(selectPath);

  const schema = yup.object().shape({
    img: yup.string(),
    titleUpload: yup.string(),
    desktop_name: yup.string(),
  });

  const defaultValues = {
    img: "",
    titleUpload: "",
    desktop_name: "",
  };

  const { control, getValues, setValue, watch, errors, handleSubmit } = useForm(
    {
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    }
  );

  const types = [
    {
      name: "Folder",
      id: 1,
    },
    {
      name: "File",
      id: 2,
    },
  ];

  const img = watch("img");

  const [open, setOpen] = useState(false);

  const [DataImage, setDataImage] = useState([]);

  const [programList, setprogramList] = useState([]);

  const [selectType, setSelectType] = useState(1);

  const [selectProgram, setSelectProgram] = useState(null);

  const [selectCategory, setSelectCategory] = useState(0);

  const [check, setCheck] = useState({
    open: false,
    message: "",
    fileName: "",
  });

  const routeParams = useParams();

  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
    setValue("img", "");
    setValue("titleUpload", "");
    setValue("desktop_name", "");
    setSelectType(1);
    setDataImage([]);
  };

  async function onSubmit(data) {
    if (selectProgram != null) {
      if (DataImage.length !== 0 && selectType == 2) {
        for (const file of DataImage) {
          let sendData1 = {
            id: null,
            folderId:
              routeParams.folderId == undefined ? null : routeParams.folderId,
            name: file?.name,
            file_desktop_name: data.desktop_name,
            size: file?.size,
            type: file?.type,
            image: file?.path,
            check_type: 1,
            program_id: selectProgram,
            selectCategory: selectCategory,
          };

          await CreateFileManager(sendData1);
        }

        await dispatch(getItems(routeParams.folderId));
        handleClose();
        setDataImage([]);
      }
    }

    if (data.titleUpload != "") {
      let sendData2 = {
        id: null,
        folderId:
          routeParams.folderId == undefined ? null : routeParams.folderId,
        name: data.titleUpload,
        file_desktop_name: data.desktop_name,
        size: "",
        type: "folder",
        check_type: 1,
        program_id: null,
        selectCategory: selectCategory,
      };
      await CreateFileManager(sendData2);
      handleClose();
      dispatch(getItems(routeParams.folderId));
    }
  }

  const UploadAndCreate = (id) => {
    setSelectType(id);
    setOpen(true);
  };

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    let apiData = await GetProgramList();
    console.log("apiData=", apiData);
    setprogramList(apiData);
  };

  const Class = [
    {
      id: 0,
      value: "none",
    },

    {
      id: 1,
      value: "KG1",
    },

    {
      id: 2,
      value: "KG2",
    },

    {
      id: 3,
      value: "KG3",
    },

    {
      id: 4,
      value: "0-8",
    },
  ];

  const getClass = (id) => {
    switch (true) {
      case id == 0:
        return "none";

      case id == 1:
        return "KG1";

      case id == 2:
        return "KG2";

      case id == 3:
        return "KG3";

      case id == 4:
        return "0-8";
    }
  };

  const getTarget = (id) => {
    switch (true) {
      case id == 1:
        return "Caregivers Facing";

      case id == 2:
        return "Child Facing";

      case id == 3:
        return "Home Visits";

      case id == 4:
        return "Supervisors facing";
    }
  };

  const category = [
    
    {
      id: 0,
      value: "All",
    },

    {
      id: 1,
      value: "Facilitators",
    },

    {
      id: 2,
      value: "Caregiver",
    },

    {
      id: 3,
      value: "Child facing",
    }

  ];

  return (
    <div className="p-24 sm:p-32 w-full flex flex-col sm:flex-row space-y-8 sm:space-y-0 items-center justify-between">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0">
        <motion.span
          className="flex items-end"
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
        >
          <Typography
            component={Link}
            to={baseUrl + "apps/file-manager"}
            className="text-20 md:text-32 font-extrabold tracking-tight leading-none"
            role="button"
          >
            File Manager
          </Typography>
          {path.length > 0 && (
            <Breadcrumbs
              aria-label="breadcrumb"
              className="mx-12"
              separator={<NavigateNextIcon fontSize="small" />}
            >
              <div />
              {path.map((item, index) =>
                index + 1 === path.length ? (
                  <Typography key={index}>{item.name}</Typography>
                ) : (
                  <Link
                    key={index}
                    color="text.primary"
                    to={baseUrl + `apps/file-manager/${item.id}`}
                  >
                    {item.name}
                  </Link>
                   )
              )}
            </Breadcrumbs>
          )}
        </motion.span>
        <Typography
          component={motion.span}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          delay={500}
          className="text-14 font-medium mx-2"
          color="text.secondary"
          style={{ marginTop: 10 }}
        >
          {`${folders.length} folders, ${files.length} files`}
        </Typography>
      </div>

      <div className="flex items-center -mx-8">
        <Button
          className="mx-8 whitespace-nowrap"
          variant="contained"
          color="secondary"
          startIcon={
            <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
          }
          onClick={() => UploadAndCreate(2)}
        >
          Upload file
        </Button>

        <Button
          className="mx-8 whitespace-nowrap"
          variant="contained"
          color="secondary"
          startIcon={
            <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
          }
          onClick={() => UploadAndCreate(1)}
        >
          Create Folder
        </Button>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <FormControl
            style={{ display: "none", marginBottom: 20, marginTop: 10 }}
            fullWidth
          >
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id={"select_1"}
              name="engines"
              value={selectType}
              label="Type"
              onChange={(e) => setSelectType(e.target.value)}
              required
              disabled={true}
            >
              {types.map((item3, index) => {
                return (
                  <MenuItem value={item3.id} key={index}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ paddingRight: 5 }}>{item3.name}</span>
                    </div>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {selectType == 2 ? (
            <FormControl style={{ marginBottom: 20, marginTop: 20 }} fullWidth>
              <InputLabel id="demo-simple-select-label">Program</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id={"select_1"}
                name="engines"
                value={selectProgram}
                label="Program"
                onChange={(e) => setSelectProgram(e.target.value)}
                required
                disabled={false}
              >
                {programList.map((item3, index) => (
                  <MenuItem value={item3.id} key={index}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ paddingRight: 5 }}>
                        {" "}
                        {item3?.title} ({getClass(item3?.class)}) (
                        {getTarget(item3?.target_audience)})
                      </span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}

          {selectType == 1 ? (
            <Controller
              name="titleUpload"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="width-input"
                  label="Title"
                  id="titleUpload"
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 15 }}
                />
              )}
            />
          ) : null}

          {selectType == 2 ? (
            <Controller
              name="desktop_name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="width-input"
                  label="Desktop Title"
                  id="desktop_name"
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 15 }}
                />
              )}
            />
          ) : null}

          {selectType == 2 ? (
            <FormControl style={{ marginTop: 40 }} fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id={"select_1"}
                name="category"
                value={selectCategory}
                label="Category"
                onChange={(e) => setSelectCategory(e.target.value)}
                required
                disabled={false}
              >
                {category.map((item3, index) => (
                  <MenuItem value={item3.id} key={item3.id}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ paddingRight: 5 }}>{item3?.value}</span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}

          {selectType == 2 ? (
            <div
              style={{
                minWidth: 300,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Root style={{ marginTop: 30 }}>
                <div
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="flex justify-center sm:justify-start flex-wrap -mx-16 audio-container"
                >
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
                          display: "flex",
                        }}
                        component="label"
                        htmlFor={`file_1`}
                        className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                      >
                        <input
                          className="hidden"
                          id={`file_1`}
                          type="file"
                          multiple="multiple"
                          onChange={async (e) => {
                            const file = e.target.files;

                            console.log("file", file);

                            let temp = [...DataImage];

                            let checkError = [];

                            Array.from(file)?.forEach(async (element) => {
                              const fileName = element?.name
                                .toLowerCase()
                                .trim()
                                .replaceAll(/(['"])/g, "")
                                .replaceAll(" / ", "-")
                                .replaceAll("/", "-")
                                .replaceAll("/\r?\n|\r/", "")
                                .replaceAll(" & ", "-")
                                .replaceAll("&", "")
                                .replaceAll(" ", "-");

                              console.log("fileName", fileName);

                              let onrginalName = fileName.split(".");

                              onrginalName = onrginalName[0];

                              console.log("onrginalName", onrginalName);

                              let check = await CheckFileManager(onrginalName);

                              checkError.push(check?.code);

                              if (
                                checkError.filter((filterC) => filterC == 400)
                                  .length == 0
                              ) {
                                setCheck({
                                  open: false,
                                  message: check?.message,
                                  fileName: onrginalName,
                                });
                              } else {
                                setCheck({
                                  open: true,
                                  message:
                                    "The file with the same name has been duplicated.",
                                  fileName: onrginalName,
                                });
                                handleClose();
                              }
                            });

                            if (
                              checkError.filter((filterC) => filterC == 400)
                                .length == 0
                            ) {
                              let URL = await UploadFile(file);

                              console.log("URL", URL);

                              setDataImage([...URL?.data]);
                            }
                          }}
                        />
                        <FuseSvgIcon size={32} color="action">
                          heroicons-outline:upload
                        </FuseSvgIcon>
                        <span
                          style={{ textAlign: "center", marginTop: 10 }}
                          className="span-1"
                        >
                          Upload one or more files
                        </span>
                      </Box>
                    )}
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {DataImage?.map((item) => {
                      return (
                        <span
                          style={{
                            width: "100%",
                            height: "100%",
                            marginBottom: 15,
                          }}
                        >
                          {apiBaseUrlImage + item?.path}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </Root>
            </div>
          ) : null}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleClose()}>No</Button>
          <Button onClick={() => handleSubmit(onSubmit)()}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        style={{ marginTop: 120 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={check?.open}
        autoHideDuration={3000}
        onClose={() =>
          setCheck({
            open: false,
            message: "",
            fileName: "",
          })
        }
      >
        <Alert severity="info" sx={{ width: "100%", background: "red" }}>
          <span>{check?.message}</span>
        </Alert>
      </Snackbar>
    </div>
  );
}

export default FileManagerHeader;
