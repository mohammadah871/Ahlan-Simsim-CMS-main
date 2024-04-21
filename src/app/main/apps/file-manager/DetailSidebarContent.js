import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { lighten, styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { selectItemById, setSelectedItem } from "./store/itemsSlice";
import ItemIcon from "./ItemIcon";
import { useState, forwardRef, useEffect } from "react";
import { Snackbar } from "@mui/material";
import { apiBaseUrlImage } from "src/constants/config";
import {
  CreateFileManager,
  GetProgramList,
  RemoveImageFileManager,
  UpdateFolderNameEngin,
  UploadFileReplace,
  UpdateNameEngin,
} from "src/constants/Apis";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Controller, useForm } from "react-hook-form";
import { orange } from "@mui/material/colors";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

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

const schema = yup.object().shape({
  img: yup.string(),
  tags: yup.array().optional(),
});

const defaultValues = {
  img: "",
  tags: [],
};

function DetailSidebarContent(props) {
  const { control, getValues, setValue, watch, errors, handleSubmit } = useForm(
    {
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    }
  );

  const img = watch("img");

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [message, setMessage] = useState("");
  const [programName, setProgramName] = useState("");
  const [folder_name, setFolderName] = useState("");
  const [file_name, setFileName] = useState("");
  const [file_desktop_name, setFileDesktopName] = useState("");
  const [selectCategory, setSelectCategory] = useState(0);

  const item = useSelector((state) =>
    selectItemById(state, state.fileManagerApp.items.selectedItemId)
  );

  const handleClick = () => {
    setMessage("Copied to clibboard");
    setOpen(true);
    navigator.clipboard.writeText(apiBaseUrlImage + item?.image);
  };

  const Preview = () => {
    window.open(apiBaseUrlImage + item?.image, "_blank");
  };

  const handleClick2 = () => {
    setOpen2(false);
  };

  const handleClick3 = () => {
    setOpen3(false);
  };

  const Replace = async () => {
    await RemoveImageFileManager(item?.image);
  };

  const UpdateImage = async (url) => {
    let sendData = {
      id: item?.id,
      folderId: item?.folderId,
      name: item?.name,
      file_desktop_name: item?.file_desktop_name,
      selectCategory:item?.selectCategory,
      size: url?.size,
      type: url?.path?.split(".").pop(),
      image: url?.path,
      check_type: 0,
    };

    await CreateFileManager(sendData);
    props?.Refresh();
    handleClick2();
    setValue("img", "");
  };

  const OpenReplace = () => {
    handleClick3();
    setOpen2(true);
  };

  useEffect(() => {
    GetProgram();
  }, [props]);

  
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
    },
    {
      id:4,
      value:"Child and caregiver facing"
    }
  ];

  useEffect(() => {
    console.log("item", item);
    setFolderName(item?.name);
    setFileName(item?.name);
    setFileDesktopName(item?.file_desktop_name);
    setValue("tags", item?.tags);
    
    if(item?.selectCategory !=null || item?.selectCategory !=undefined){
      setSelectCategory(JSON.parse(item?.selectCategory))
    }

  }, [item]);

  const GetProgram = async () => {
    let DataNew = await GetProgramList();
    let p = DataNew.find((item2) => item2?.id == item?.program_id);
    setProgramName(p?.title);
  };

  const UpdateFolderName = async () => {
    let newDate = {
      name: folder_name,
      file_desktop_name: "",
      selectCategory:"",
      id: item?.id,
    };
    await UpdateFolderNameEngin(newDate);
    props.Refresh();
  };

  const UpdatetagsFile = async () => {
    let newDate = {
      name: file_name,
      file_desktop_name: file_desktop_name,
      selectCategory:selectCategory,
      tags: getValues("tags"),
      id: item?.id
    };
    await UpdateNameEngin(newDate);
    props.Refresh();
  };


  if (!item) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
      className="file-details p-24 sm:p-32"
    >
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClick2()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
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
                        onChange={async (e) => {
                          const file = e.target.files;

                          const fileName = file[0]?.name
                            .toLowerCase()
                            .trim()
                            .replaceAll(/(['"])/g, "")
                            .replaceAll(" / ", "-")
                            .replaceAll("/", "-")
                            .replaceAll("/\r?\n|\r/", "")
                            .replaceAll(" & ", "-")
                            .replaceAll("&", "")
                            .replaceAll(" ", "-");

                          let onrginalName = fileName.split(".");

                          onrginalName = onrginalName[0];

                          if (!file[0]) {
                            return;
                          }

                          //  await Replace();
                          const URL = await UploadFileReplace(
                            file,
                            item?.image
                          );
                          console.log("URL", URL);
                          await onChange(URL?.data[0]?.path);
                          await UpdateImage(URL?.data[0]);
                        }}
                      />
                      <FuseSvgIcon size={32} color="action">
                        heroicons-outline:upload
                      </FuseSvgIcon>
                      <span className="span-1">Upload File</span>
                    </Box>
                  )}
                />

                {img == "" ? null : (
                  <div>
                    <span style={{ width: "100%", height: "100%" }}>
                      {apiBaseUrlImage + img}
                    </span>
                  </div>
                )}
              </div>
            </Root>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-end w-full">
        <IconButton
          className=""
          size="large"
          onClick={() => dispatch(setSelectedItem(null))}
        >
          <FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
        </IconButton>
      </div>

      <Box
        className=" w-full rounded-8 border preview h-128 sm:h-256 file-icon flex items-center justify-center my-32"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? lighten(theme.palette.background.default, 0.4)
              : lighten(theme.palette.background.default, 0.02),
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.3 } }}
        >
          <ItemIcon className="" type={item.type} />
        </motion.div>
      </Box>

      {item.type != "folder" ? (
        <>
          <TextField
            style={{
              width: "100%",
              height: "50px",
              borderRadius: "8px",
            }}
            value={file_name}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="File Name"
            label="File Name"
            variant="outlined"
          />

          <TextField
            style={{
              width: "100%",
              height: "50px",
              borderRadius: "8px",
              marginTop: 25,
            }}
            value={file_desktop_name}
            onChange={(e) => setFileDesktopName(e.target.value)}
            placeholder="Desktop Name"
            label="Desktop Name"
            variant="outlined"
          />
        </>
      ) : (
        <TextField
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "8px",
          }}
          value={folder_name}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Folder Name"
          label="Folder Name"
          variant="outlined"
        />
      )}

      {item.type != "folder" ? (
        <div
          style={{
            textDecoration: "underline",
            color: "#4f46e5",
            fontSize: 20,
            cursor: "pointer",
          }}
          onClick={() => Preview()}
          className="text-16 font-medium mt-32"
        >
          Preview
        </div>
      ) : null}

      <div className="flex flex-col mt-16 border-t border-b divide-y font-medium">
        {item.type != "folder" ? (
          <div className="flex items-center justify-between py-12">
            <Typography color="text.secondary">Program Name</Typography>
            <Typography>{programName}</Typography>
          </div>
        ) : null}


        {item.type != "folder" ? (
          <Controller
            name="tags"
            control={control}
            id="tags"
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                style={{ marginTop: 15, marginBottom: 15 }}
                className="mt-8 mb-16"
                multiple={true}
                freeSolo
                fullWidth
                options={[]}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="ادخل النص هنا"
                    label="tags"
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 30, marginBottom: 0 }}
                    InputLabelProps={{
                      shrink: true,
                      style: { fontFamily: "Medium", fontSize: 14 },
                    }}
                  />
                )}
              />
            )}
          />
        ) : null}



{item.type != "folder" ? (
          <FormControl style={{ marginBottom: 30, marginTop: 10 }} fullWidth>
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


        <div className="flex items-center justify-between py-12">
          <Typography color="text.secondary">Created At</Typography>
          <Typography>{item.createdAt}</Typography>
        </div>
        <div className="flex items-center justify-between py-12">
          <Typography color="text.secondary">Modified At</Typography>
          <Typography>{item.modifiedAt}</Typography>
        </div>
        {item.type != "folder" ? (
          <div className="flex items-center justify-between py-12">
            <Typography color="text.secondary">Size</Typography>
            <Typography>{item.size}</Typography>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-16 w-full mt-32">
        {item.type == "folder" ? (
          <Button
            className="flex-auto"
            color="secondary"
            variant="contained"
            onClick={() => UpdateFolderName()}
          >
            Update
          </Button>
        ) : null}
      </div>

      <div
        className={`grid ${
          item.type != "folder" ? "grid-cols-2" : "grid-cols-1"
        }  gap-16 w-full mt-32`}
      >
        {item.type != "folder" ? (
          <Button
            onClick={() => handleClick()}
            className="flex-auto"
            color="secondary"
            variant="contained"
          >
            Copy
          </Button>
        ) : null}

        <Button
          onClick={() => props?.deleteCard(item?.id)}
          className="flex-auto"
          color="secondary"
          variant="contained"
        >
          Delete
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-16 w-full mt-32">
        {item.type != "folder" ? (
          <Button
            className="flex-auto"
            color="secondary"
            variant="contained"
            onClick={() => setOpen3(true)}
          >
            Replace
          </Button>
        ) : null}

        {item.type != "folder" ? (
          <Button
            className="flex-auto"
            color="secondary"
            variant="contained"
            onClick={() => UpdatetagsFile()}
          >
            Update
          </Button>
        ) : null}
      </div>

      <Snackbar
        message={message}
        style={{ marginTop: 75 }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />

      <Dialog
        open={open3}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClick3()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`To replace the file successfully ?`}</DialogTitle>
        <DialogContent>
          {"please make sure its the same file extension"}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClick3()}>No</Button>
          <Button onClick={() => OpenReplace()}>Yes</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}

export default DetailSidebarContent;
