import React, { useRef, useState, useEffect } from "react";
import { lighten } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { GetCountriesControll, UploadFile } from "src/constants/Apis";
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
import { TwitterPicker } from "react-color";
import Checkbox from "@mui/material/Checkbox";
import OutlinedInput from "@mui/material/OutlinedInput";
import Autocomplete from "@mui/material/Autocomplete";

const schema = yup.object().shape({
  tags: yup.array().optional(),
});
const defaultValues = {
  tags: [],
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

function Cards(props) {
  const [img, setImg] = useState("");

  const [title, setTitle] = useState("");

  const [chooseClass, setChooseClass] = useState("");

  const [target_audience, setTarget_audience] = useState("");

  const [update, setUpdate] = useState(false);

  const [Countries, setCountries] = useState([]);

  const [color1, setColor1] = useState("#fff");

  const [current_progarm, setCurrentProgarm] = useState(false);

  const inputFile = useRef(null);

  const { formState, control, setValue, getValues } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  const [CountryName, setCountryName] = useState([]);

  const [showSelect, setShowSelect] = useState(false);

  useEffect(() => {
    if (props.check == true) {
      setImg(props?.data?.image);
      setTitle(props?.data?.title);

      let tags = props?.data?.tags;
      let tagsData = [];

      tags.forEach((item) => {
        tagsData.push(item?.name);
      });
      setValue("tags", tagsData);
      let FilterCountry = [];
      props?.data?.country_id?.forEach((element) => {
        FilterCountry.push(element?.name);
      });
      setCountryName(FilterCountry);
      setChooseClass(props?.data?.class);
      setTarget_audience(props?.data?.target_audience);
      setColor1(props?.data?.color);
      setCurrentProgarm(props?.data?.current_progarm);
    }
  }, [props]);

  const handleChange1 = (event) => {
    const {
      target: { value },
    } = event;
    setCountryName(typeof value === "string" ? value.split(",") : value);
  };

  const deleteFun = () => {
    props.delete(props?.id, props?.data?.title);
  };

  const updateFun = () => {
    let FilterCountry = [];

    CountryName.forEach((element) => {
      let f = Countries.find((item) => item.title == element);
      FilterCountry.push({ id: JSON.stringify(f.id), name: f.title });
    });

    let tags = getValues("tags");
    let tagsData = [];

    tags.forEach((item, index) => {
      tagsData.push({
        id: JSON.stringify(index + 1),
        name: item,
      });
    });

    props.update(
      props?.id,
      img,
      title,
      FilterCountry,
      chooseClass,
      target_audience,
      color1,
      tagsData,
      current_progarm
    );
  };

  const saveFun = () => {
    let FilterCountry = [];

    CountryName.forEach((element) => {
      let f = Countries.find((item) => item.title == element);
      FilterCountry.push({ id: JSON.stringify(f.id), name: f.title });
    });

    let tags = getValues("tags");
    let tagsData = [];

    tags.forEach((item, index) => {
      tagsData.push({
        id: JSON.stringify(index + 1),
        name: item,
      });
    });

    props.save(
      img,
      title,
      FilterCountry,
      chooseClass,
      target_audience,
      color1,
      tagsData,
      current_progarm
    );
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

  const TargetData = [
    {
      id: 1,
      value: "Caregivers Facing",
    },
    {
      id: 2,
      value: "Child Facing",
    },
    {
      id: 3,
      value: "Home Visits",
    },
    {
      id: 4,
      value: "Supervisors facing",
    },
  ];

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    let data = await GetCountriesControll();
    setCountries(data);
  };

  const handleChangeComplete1 = (color) => {
    setColor1(color.hex);
  };

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
            maxWidth: 345,
            height: update || props.check == false ? "auto" : "auto",
            minWidth: 345,
            position: "relative",
            background: "transparent",
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
                style={{ width: "100%", height: "100%" }}
                src={img == "" ? NoImage : apiBaseUrlImage + img}
              />
            </div>

            {props.check == false || update ? (
              <>
                <CardContent>
                  <TextField
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="width-input"
                    label="Title"
                    id="title"
                    variant="outlined"
                    fullWidth
                    disabled={props.check ? !update : false}
                  />
                </CardContent>

                <CardContent>
                  {/* <FormControl style={{}} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Country
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="engines"
                      value={chooseEngin}
                      label="Country"
                      onChange={(e) => {
                        setChooseEngin(e.target.value);
                      }}
                      disabled={props.check ? !update : false}
                      required
                    >
                      {Countries.map((item) => (
                        <MenuItem value={item.id} key={item.id}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}

                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">
                      {"Country"}
                    </InputLabel>
                    <Select
                      open={showSelect}
                      onOpen={() => setShowSelect(true)}
                      onClose={() => setShowSelect(false)}
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={CountryName}
                      onChange={handleChange1}
                      input={<OutlinedInput label={"Country"} />}
                      renderValue={(selected) => selected.join(", ")}
                      MenuProps={MenuProps}
                      disabled={props.check ? !update : false}
                      required
                    >
                      {Countries.map((item, index) => (
                        <MenuItem key={index} value={item.title}>
                          <Checkbox
                            checked={CountryName.indexOf(item.title) > -1}
                          />
                          <ListItemText primary={item.title} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl style={{ marginTop: 15 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">Class</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="engines"
                      value={chooseClass}
                      label="Class"
                      onChange={(e) => {
                        setChooseClass(e.target.value);
                      }}
                      disabled={props.check ? !update : false}
                      required
                    >
                      {Class.map((item) => (
                        <MenuItem value={item.id} key={item.id}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl style={{ marginTop: 15 }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Target audience
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="engines"
                      value={target_audience}
                      label="Class"
                      onChange={(e) => {
                        setTarget_audience(e.target.value);
                      }}
                      disabled={props.check ? !update : false}
                      required
                    >
                      {TargetData.map((item) => (
                        <MenuItem value={item.id} key={item.id}>
                          {item.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

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
                      onChange={(e) => setCurrentProgarm(e.target.checked)}
                      checked={current_progarm}
                    />
                    <span>Current Progarm</span>
                  </div>

                  <div className="">
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

                  {update ? (
                    <button
                      onClick={() => updateFun()}
                      style={{
                        marginTop: 18,
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <h3 style={{ fontWeight: "bold" }}>Update</h3>
                    </button>
                  ) : null}

                  {props.check == false ? (
                    <button
                      onClick={() => saveFun()}
                      style={{
                        marginTop: 18,
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <h3 style={{ fontWeight: "bold" }}>Save</h3>
                    </button>
                  ) : null}
                </CardContent>
              </>
            ) : null}
            {props.user?.role != "viewer" ? (
              <>
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
                  <FuseSvgIcon
                    className="text-48"
                    size={24}
                    color={props.check == false ? "red" : "#555"}
                  >
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
              </>
            ) : null}
          </CardActionArea>
        </Card>
      )}
    </>
  );
}

export default Cards;
