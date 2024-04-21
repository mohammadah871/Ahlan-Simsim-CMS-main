import React, { useRef, useState, useEffect } from "react";
import { lighten } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { UploadFile } from "src/constants/Apis";
import { apiBaseUrlImage } from "src/constants/config";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import i18n from "src/i18n";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import NoImage from "src/CustomImage/NoImage.png";
import Autocomplete from "@mui/material/Autocomplete";

import Checkbox from "@mui/material/Checkbox";

const schema = yup.object().shape({
  tags: yup.array().optional(),
});

const defaultValues = {
  tags: [],
};

function Cards(props) {
  const [img, setImg] = useState("");

  const [title, setTitle] = useState("");

  const [numberSession, setNumberSession] = useState("");

  const [update, setUpdate] = useState(false);

  const [chooseEngin, setChooseEngin] = useState("");

  const [isTraining, setisTraining] = useState(false);

  const inputFile = useRef(null);

  const { formState, control, setValue, getValues } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  useEffect(() => {
    if (props.check == true) {
      setImg(props?.data?.image);
      setTitle(props?.data?.title);
      setNumberSession(props?.data?.numberSession);
      setisTraining(props?.data?.isTraining);
      setChooseEngin(props?.data?.template);

      let tags = props?.data?.tags;
      let tagsData = [];

      tags?.forEach((item) => {
        tagsData.push(item?.name);
      });
      setValue("tags", tagsData);
    }
  }, [props]);

  const deleteFun = () => {
    props.delete(props?.id, props?.data?.title);
  };

  const updateFun = () => {
    let tags = getValues("tags");
    let tagsData = [];

    tags?.forEach((item, index) => {
      tagsData.push({
        id: JSON.stringify(index + 1),
        name: item,
      });
    });

    props.update(
      props?.id,
      img,
      title,
      chooseEngin,
      numberSession,
      tagsData,
      isTraining
    );
  };

  const saveFun = () => {
    let tags = getValues("tags");
    let tagsData = [];

    tags?.forEach((item, index) => {
      tagsData.push({
        id: JSON.stringify(index + 1),
        name: item,
      });
    });

    props.save(img, title, chooseEngin, numberSession, tagsData, isTraining);
  };

  const Templates = [
    {
      id: 1,
      value: "Template #1",
    },

    {
      id: 2,
      value: "Template #2 (ECE Remote)",
    },

    {
      id: 3,
      value: "Template #3 (AS Families Phone call Modality Template)",
    },
    {
      id: 4,
      value: "Template #4 (AS Friends)",
    },
    {
      id: 5,
      value: "Template #5 (School Readiness Caregivers Facing)",
    },
    {
      id: 6,
      value: "Template #6 School Readiness Child Facing",
    },
    {
      id: 7,
      value: `Template #7 ECD Emergency Caregivers Facing`,
    },
    {
      id: 8,
      value: `Template #8 ECD Emergency Child Facing`,
    },
    {
      id: 9,
      value: `Template #9 PDF`,
    },
  ];

  return (
    <>
      {props?.edit ? (
        <Draggable
          draggableId={JSON.stringify(props?.index)}
          index={props?.index}
          type="list"
        >
          {(provided, snapshot) => (
            <>
              <ListItem
                style={{ zIndex: -1 }}
                className={clsx(
                  snapshot.isDragging ? "shadow-lg" : "shadow",
                  "px-40 py-12 group"
                )}
                sx={{ bgcolor: "background.paper" }}
                button
                ref={provided.innerRef}
                {...provided.draggableProps}
              >
                <div
                  className={
                    i18n.dir() == "rtl"
                      ? "md:hidden absolute flex items-center justify-center inset-y-0 right-0 w-32 cursor-move md:group-hover:flex"
                      : "md:hidden absolute flex items-center justify-center inset-y-0 left-0 w-32 cursor-move md:group-hover:flex"
                  }
                  {...provided.dragHandleProps}
                >
                  <FuseSvgIcon sx={{ color: "text.disabled" }} size={20}>
                    heroicons-solid:menu
                  </FuseSvgIcon>
                </div>

                <ListItemText
                  classes={{ root: "m-0", primary: "truncate" }}
                  style={{ paddingLeft: 15, paddingRight: 15 }}
                  primary={props?.data?.title}
                />
              </ListItem>

              <Divider />
            </>
          )}
        </Draggable>
      ) : (
        <Card
          sx={{
            maxWidth: 199,
            // maxWidth: update || props.check == false ?  345 : 199,
            height: update || props.check == false ? "auto" : "auto",
            minWidth: 199,
            //            minWidth: update || props.check == false ?  345:199,

            position: "relative",
            boxShadow:
              "0px 2px 0px 0px rgba(0,0,0,0.2), 0px 2px 0px 0px rgba(0,0,0,0.14), 0px 2px 0px 0px rgba(0,0,0,0.12) !important",
          }}
        >
          <CardActionArea>
            <Controller
              name="img"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box
                  style={{ display: "none" }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                  component="label"
                  htmlFor={`img_${props?.id}`}
                  className="productImageUpload flex items-center justify-center relative w-128 h-128 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                >
                  <input
                    ref={inputFile}
                    accept="image/*"
                    className="hidden"
                    id={`img_${props?.id}`}
                    type="file"
                    onChange={async (e) => {
                      const file = e.target.files;
                      if (!file) {
                        return;
                      }
                      const URL = await UploadFile(file);
                      setImg(URL?.data[0]?.path);
                    }}
                  />
                  <FuseSvgIcon size={32} color="action">
                    heroicons-outline:upload
                  </FuseSvgIcon>
                  <span style={{ marginTop: 5 }} className="span-1">
                    Upload Image
                  </span>
                  <span
                    style={{ marginTop: 5, fontWeight: "bold" }}
                    className="span-1"
                  >
                    Size: 277*183
                  </span>
                </Box>
              )}
            />

            <div
              onClick={() =>
                props.check
                  ? update == true
                    ? inputFile.current.click()
                    : props.Go(props?.id)
                  : inputFile.current.click()
              }
              className="productImageUpload flex items-center justify-center relative w-128 h-128 overflow-hidden cursor-pointer shadow hover:shadow-lg"
            >
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src={img == "" ? NoImage : apiBaseUrlImage + img}
              />
            </div>

            {props.check == false || update ? (
              <CardContent>
                <FormControl style={{}} fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Template
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="engines"
                    value={chooseEngin}
                    label="Template"
                    onChange={(e) => {
                      setChooseEngin(e.target.value);
                    }}
                    disabled={props.check ? !update : false}
                    required
                  >
                    {Templates.map((item) => (
                      <MenuItem value={item.id} key={item.id}>
                        {item.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="width-input"
                  label="Title"
                  id="title"
                  variant="outlined"
                  fullWidth
                  disabled={props.check ? !update : false}
                  style={{ marginTop: 20 }}
                />

                <TextField
                  onChange={(e) => setNumberSession(e.target.value)}
                  value={numberSession}
                  className="width-input"
                  label="Session’s Number"
                  id="numberSession"
                  variant="outlined"
                  fullWidth
                  disabled={props.check ? !update : false}
                  style={{ marginTop: 20 }}
                />

                <Controller
                  name="tags"
                  control={control}
                  id="tags"
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
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
                          error={!!errors.tags}
                          helperText={errors?.tags?.message}
                          placeholder="ادخل النص هنا"
                          label="tags"
                          variant="outlined"
                          fullWidth
                          style={{ marginTop: 10 }}
                          InputLabelProps={{
                            shrink: true,
                            style: { fontFamily: "Medium", fontSize: 14 },
                          }}
                        />
                      )}
                    />
                  )}
                />

                <div>
                  <Checkbox
                    onChange={(e) => setisTraining(e.target.checked)}
                    checked={isTraining}
                  />
                  <span>isTraining</span>
                </div>
              </CardContent>
            ) : null}

            {props.user?.role != "viewer" ? (
              <>
                {update ? (
                  <button
                    onClick={() => updateFun()}
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      paddingBottom: 15,
                    }}
                  >
                    <h3 style={{ fontWeight: "bold" }}>Update</h3>
                  </button>
                ) : null}

                {props.check == false ? (
                  <button
                    onClick={() => saveFun()}
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      paddingBottom: 15,
                    }}
                  >
                    <h3 style={{ fontWeight: "bold" }}>Save</h3>
                  </button>
                ) : null}

                <div
                  onClick={() =>
                    props.check == false ? props.RemoveCard() : deleteFun()
                  }
                  style={{
                    zIndex: 100,
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 35,
                    height: 35,
                    background: "#fff",
                    borderRadius: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FuseSvgIcon className="text-48" size={24} color="#555">
                    material-solid:delete_forever
                  </FuseSvgIcon>
                </div>

                {props.check ? (
                  <div
                    onClick={() => setUpdate(!update)}
                    style={{
                      zIndex: 100,
                      position: "absolute",
                      top: 55,
                      right: 10,
                      width: 35,
                      height: 35,
                      background: "#fff",
                      borderRadius: 100,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FuseSvgIcon className="text-48" size={24} color="#555">
                      material-solid:edit_note
                    </FuseSvgIcon>
                  </div>
                ) : null}

                {props.check ? (
                  <div
                    onClick={() => props.Go(props?.id)}
                    style={{
                      zIndex: 100,
                      position: "absolute",
                      top: 100,
                      right: 10,
                      width: 35,
                      height: 35,
                      background: "#fff",
                      borderRadius: 100,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    
                    <FuseSvgIcon className="text-48" size={20} color="#555">
                      heroicons-solid:arrow-right
                    </FuseSvgIcon>

                  </div>
                ) : null}

                {props.check ? (
                  <div
                    onClick={() =>
                      props.SaveOffline({
                        type: "session",
                        session_id: props?.id,
                        program_id: props?.program_id,
                      })
                    }
                    style={{
                      zIndex: 100,
                      position: "absolute",
                      top: 145,
                      right: 10,
                      width: 35,
                      height: 35,
                      background: "#fff",
                      borderRadius: 100,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FuseSvgIcon className="text-48" size={20} color="#555">
                      heroicons-solid:download
                    </FuseSvgIcon>
                  </div>
                ) : null}
              </>
            ) : null}
          </CardActionArea>
        </Card>
      )}
    </>
  );
}

export default Cards;
