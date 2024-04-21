import React, { useState, useEffect, useRef } from "react";
import { lighten } from "@mui/material/styles";

import _ from "@lodash";
import Button from "@mui/material/Button";
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
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import { TwitterPicker } from "react-color";

function ProgramsPage(props) {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [SelectProgram, setPrograms] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [AllprogramList, setAllprogramList] = useState([]);
  const [color1, setColor1] = useState("#fff");

  const Save = async () => {
    props.save(title, img, SelectProgram,color1);
  };

  const schema = yup.object().shape({});
  const defaultValues = {};

  const { control } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const Update = async (id) => {
    props.update(id, title, img, SelectProgram,color1);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const inputFile = useRef(null);
  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setPrograms(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    setAllprogramList(props?.Allprogram);
    if (props.check == true) {
      setTitle(props?.title);
      setImg(props?.img);
      setColor1(props?.color);
      let FilterCountry = [];
      props?.program?.forEach((element) => {
        FilterCountry.push(element?.id);
      });
      setPrograms(FilterCountry);
    }
  }, [props]);

  const handleChangeComplete1 = (color) => {
    setColor1(color.hex);
  };

  return (
    <div
      key={props?.id}
      style={{
        width: props?.check ? "25%" : "100%",
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
        id={"title_" + props?.id}
        variant="outlined"
        fullWidth
      />

      <FormControl style={{ marginTop: 20 }} fullWidth>
        <InputLabel id="demo-multiple-checkbox-label">{"Program"}</InputLabel>
        <Select
          open={showSelect}
          onOpen={() => setShowSelect(true)}
          onClose={() => setShowSelect(false)}
          labelId="demo-multiple-checkbox-label"
          id={"category_" + props?.id}
          key={"category_" + props?.id}
          multiple
          value={SelectProgram}
          onChange={handleChange1}
          input={<OutlinedInput label={"Program"} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          required
        >
          {AllprogramList.map((props, index) => (
            <MenuItem key={index} value={props.id}>
              <Checkbox checked={SelectProgram.indexOf(props.id) > -1} />
              <ListItemText primary={props.title} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ marginTop: 30 }}>
        <TwitterPicker
          color={color1}
          onChangeComplete={handleChangeComplete1}
          width="100%"
          colors={[
            "#FEEAEF",
            "#DBA6F9",
            "#F9D13F",
            "#EEA230",
            "#63cfe3",
            "#0088ce",
            "#000099",
            "#410099",
            "#b4008d",
            "#cc99cc",
            "#ed40a9",
            "#eeb2ca",
            "#ff0000",
            "#ff671d",
            "#f9b428",
            "#ffd400",
            "#99cc33",
            "#00ab4d",
            "#009999",
            "#2ed9c3",
            "#f4d0ce",
            "#dfd6ea",
            "#c9d0e9",
            "#b3d1e5",
            "#a0d3e0",
            "#d1ecdd",
            "#ebd9ad",
            "#d9d8d6",
            "#ebf7fd",
            "#f1f9ff",
            "#FEF7DC",
            "#F9DFB7",
            "#E7F3D0",
            "#F4FBF7",
            "#ff0000",
            "#fbeef3",
            "#f5dbe5",
            "#e6ddfa",
            "#CFCBED",
            "#E9F6FD",
            "#D4E8F3",
            "#f3f8e5",
            "#E2F2D6",
            "#FEF3E9",
            "#F9E4DB",
            "#ff0000",
            "#FBC591",
            "#E89572",
            "#C4DE7F",
            "#8ECB5E",
            "#FD71AF",
            "#DC36B7",
            "#93D1F5",
            "#56A5D1",
            "#BCACFC",
            "#8E83D4",
          ]}
        />
      </div>

      {props.check == true ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => Update(props?.id)}
            className="mx-8 whitespace-nowrap"
            variant="contained"
            color="secondary"
            style={{ width: "30%", height: 50, marginTop: 30 }}
          >
            <span className="mx-8">Update</span>
          </Button>
        </div>
      ) : null}

      {props.check == false ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => Save()}
            className="mx-8 whitespace-nowrap"
            variant="contained"
            color="secondary"
            style={{ width: "30%", height: 50, marginTop: 30 }}
          >
            <span className="mx-8">Save</span>
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default ProgramsPage;
