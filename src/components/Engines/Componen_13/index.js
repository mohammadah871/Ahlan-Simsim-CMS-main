import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useRef,
} from "react";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { TwitterPicker } from "react-color";
import JoditEditor from "jodit-react";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import iconSpeakerMale from "../../Frontend_Engines/icons/IconSpeakerMale.svg";
import iconSpeakerFemale from "../../Frontend_Engines/icons/iconSpeakerFemale.svg";
import iconFamily from "../../Frontend_Engines/icons/iconFamily.svg";
import Checkbox from "@mui/material/Checkbox";
import ImageCom from "../../Image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiBaseUrlImage } from "src/constants/config";
const Componen_13 = forwardRef((props, ref) => {
  const [addRoot, setaddRoot] = useState([]);
  const [conversation, setConversation] = useState([]);

  const [counter, setCounter] = useState(1);
  const [counter2, setCounter2] = useState(1);
  const [counter3, setCounter3] = useState(1);

  const [color1, setColor1] = useState("#fff");
  const [color2, setColor2] = useState("#fff");

  const [color3, setColor3] = useState("#fff");
  const [color4, setColor4] = useState("#fff");

  const [color5, setColor5] = useState("#fff");
  const [color6, setColor6] = useState("#fff");

  const [addTable, setAddTable] = useState([]);

  const [Img, setImage] = useState("");

  const types = [
    {
      name: "speakerMale",
      name2: "Speaker",
      img: iconSpeakerMale,
    },

    // {
    //   name: "speakerFemale",
    //   name2: "Speaker Female",
    //   img: iconSpeakerFemale,
    // },

    {
      name: "family",
      name2: "Family",
      img: iconFamily,
    },

    // {
    //   name: "boy",
    //   img:iconBoy
    // },
    // {
    //   name: "girl",
    //   img:iconGirl
    // }
  ];

  const Add_Root = () => {
    props?.scrollToTop();
    var temp = [...addRoot];
    temp.push({ id: counter, title: "" });
    setaddRoot(temp);
    setCounter(counter + 1);
  };

  const Remove_Root_Root = () => {
    var temp = [...addRoot];
    temp.pop();
    setaddRoot(temp);
    setCounter(counter - 1);
  };

  const Remove_Root = (id) => {
    var temp = addRoot;
    var removeOne = _.reject(temp, function (el) {
      return el.id == id;
    });
    setaddRoot([...removeOne]);
  };

  const schema = yup.object().shape({
    engin_title: yup.string().required("You must enter a valid string").min(1),
    time: yup.string().required("You must enter a valid string").min(1),
  });

  const defaultValues = {
    engin_title: "",
    time: "",
  };

  const { control, formState, handleSubmit, getValues, setValue, watch } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });

  const { errors } = formState;

  const editor = useRef(null);

  function onSubmit(data) {
    var NewDate = [];

    addRoot.forEach((element) => {
      NewDate.push({
        id: element.id,
        title: element.title,
        conversation: conversation?.filter(
          (item) => item.root_id == element.id
        ),
      });
    });

    let content = {
      img: Img,
      data1: NewDate,
      bgColors: [color3, color4],
      data2: {
        color1: color1,
        color2: color2,
        color5: color5,
        color6: color6,
      },
      addRoot: addRoot,
      conversation: conversation,
      time: data.time,
      table: addTable,
    };

    let getUrl = [];
    let getLinks = [];
    conversation?.forEach((element) => {
  
      var parser = new DOMParser();
      var doc = parser?.parseFromString(element.contentHtml, "text/html");
     doc?.querySelectorAll("a").forEach((element2) => {
      if (element2?.href?.split(apiBaseUrlImage)[1] != undefined) {
        getUrl.push(element2?.href?.split(apiBaseUrlImage)[1]);
      }
      else{
        getLinks.push(element2?.href);
      }
      });
    });

    addTable.forEach((element) => {

      var parser1 = new DOMParser();
      var doc1 = parser1?.parseFromString(element.contentHtml_1, "text/html");
       doc1?.querySelectorAll("a").forEach((element2) => {
        if (element2?.href?.split(apiBaseUrlImage)[1] != undefined) {
        getUrl.push(element2?.href?.split(apiBaseUrlImage)[1]);
        }
        else{
          getLinks.push(element2?.href);
        }
      });

      var parser2 = new DOMParser();
      var doc2 = parser2?.parseFromString(element.contentHtml_2, "text/html");
       doc2?.querySelectorAll("a").forEach((element2) => {
        if (element2?.href?.split(apiBaseUrlImage)[1] != undefined) {
        getUrl.push(element2?.href?.split(apiBaseUrlImage)[1]);
        }
        else{
          getLinks.push(element2?.href);
        }
      });

      var parser3 = new DOMParser();
      var doc3 = parser3?.parseFromString(element.contentHtml_3, "text/html");
       doc3?.querySelectorAll("a").forEach((element2) => {
        if (element2?.href?.split(apiBaseUrlImage)[1] != undefined) {
        getUrl.push(element2?.href?.split(apiBaseUrlImage)[1]);
        }
        else{
          getLinks.push(element2?.href);
        }
      });

      var parser4 = new DOMParser();
      var doc4 = parser4?.parseFromString(element.contentHtml_4, "text/html");
       doc4?.querySelectorAll("a").forEach((element2) => {
        if (element2?.href?.split(apiBaseUrlImage)[1] != undefined) {
        getUrl.push(element2?.href?.split(apiBaseUrlImage)[1]);
        }
        else{
          getLinks.push(element2?.href);
        }
      });
    });


    let sendData = {
      id: props.check == false ? props?.getData?.id : null,
      content: content,
      title: data.engin_title,
      name: "components13",
      type: 13,
      status: props.status,
      getUrl:getUrl,
      getLinks:getLinks
    };

    if (getLinks.length != 0) {
      props.saveLinks(getLinks);
    }

    if (getUrl.length != 0) {
      props.saveUrl(getUrl);
    }

    props.setData(sendData);
  }

  useEffect(() => {
    setTimeout(() => {
      DataFromApi();
    }, 1000);
  }, [props]);

  const DataFromApi = () => {
    if (props.check == false) {
      setImage(props?.getData?.data?.img);
      setValue("engin_title", props?.getData?.title);
      setValue("time", props?.getData?.data?.time);
      console.log("props", props?.getData?.data);

      setaddRoot([...props?.getData?.data?.addRoot]);
      setCounter(props?.getData?.data?.addRoot?.length + 1);

      setConversation([...props?.getData?.data?.conversation]);
      setCounter2(props?.getData?.data?.conversation?.length + 1);

      setColor1(props?.getData?.data?.data2?.color1);
      setColor2(props?.getData?.data?.data2?.color2);
      setColor3(props?.getData?.data?.bgColors[0]);
      setColor4(props?.getData?.data?.bgColors[1]);
      setColor5(props?.getData?.data?.data2?.color5);
      setColor6(props?.getData?.data?.data2?.color6);
      setAddTable([...props?.getData?.data?.table]);
      setCounter3(props?.getData?.data?.table?.length + 1);
    }
  };

  useImperativeHandle(ref, () => ({
    async SaveComponent() {
      handleSubmit(onSubmit)();
    },
  }));

  const changeColumn1 = (value, id) => {
    var temp = [...addRoot];
    let newData = temp.find((item) => item.id == id);
    newData.title = value;
    setaddRoot(temp);
  };

  const handleChangeComplete1 = (color) => {
    setColor1(color.hex);
  };

  const handleChangeComplete2 = (color) => {
    setColor2(color.hex);
  };

  const handleChangeComplete3 = (color) => {
    setColor3(color.hex);
  };

  const handleChangeComplete4 = (color) => {
    setColor4(color.hex);
  };

  const Add_Conv = (id) => {
    props?.scrollToTop();
    var temp = [...conversation];
    temp.push({
      root_id: id,
      id: counter2,
      type: 0,
      speaker: "",
      checked: false,
      checked2: false,
      contentHtml: "",
      column1: "",
      column2: "",
      column3: "",
      column4: "",
      check_1: false,
      check_2: false,
      check_3: false,
      check_4: false,
    });

    setConversation(temp);
    setCounter2(counter2 + 1);
  };

  const Remove_Conv = (id) => {
    var temp = conversation;
    var removeOne = _.reject(temp, function (el) {
      return el.id == id;
    });
    setConversation([...removeOne]);
  };

  const Remove_Conv_Root = () => {
    var temp = [...conversation];
    temp.pop();
    setConversation(temp);
    setCounter2(counter2 - 1);
  };

  const change1 = (value, id) => {
    var temp = [...conversation];
    let newData = temp.find((item) => item.id == id);
    newData.speaker = value;
    newData.type = value == "speakerMale" || value == "speakerFemale" ? 1 : 2;
    setConversation(temp);
  };

  const change2 = (value, id) => {
    var temp = [...conversation];
    let newData = temp.find((item) => item.id == id);
    newData.contentHtml = value;
    setConversation(temp);
  };

  const changeCheckBox = (value, id, check) => {
    var temp = [...conversation];
    let newData = temp.find((item) => item.id == id);
    newData.checked = check;
    newData.contentHtml =
      check == true
        ? value == "speakerMale" || value == "speakerFemale"
          ? ""
          : "انتظر الرد"
        : "";
    setConversation(temp);
  };

  const changeCheckBox2 = (id, check) => {
    var temp = [...conversation];
    let newData = temp.find((item) => item.id == id);
    newData.checked2 = check;
    setConversation(temp);
  };

  const getSubRoots = (id) => {
    const roots = conversation?.filter((item) => item.root_id === id);
    return roots;
  };

  const changeColumn_1_1 = (value, id) => {
    var temp = [...conversation];
    let newData = temp.find((item) => item.id == id);
    console.log("newData", newData);
    newData.column1 = value;
    setConversation(temp);
  };

  const changeColumn_2_2 = (value, id) => {
    var temp = [...conversation];
    let newData = temp.find((item) => item.id == id);
    newData.column2 = value;
    setConversation(temp);
  };

  const changeColumn_3_3 = (value, id) => {
    var temp = [...conversation];
    let newData = temp.find((item) => item.id == id);
    newData.column3 = value;
    setConversation(temp);
  };

  const changeColumn_4_4 = (value, id) => {
    var temp = [...conversation];
    let newData = temp.find((item) => item.id == id);
    newData.column4 = value;
    setConversation(temp);
  };

  const Remove_RootTable = () => {
    var temp = [...addTable];
    temp.pop();
    setAddTable(temp);
    setCounter3(counter3 - 1);
  };

  const Add_RootTable = (root_id) => {
    props?.scrollToTop();
    var temp = [...addTable];
    temp.push({
      root_id: root_id,
      id: counter3,
      contentHtml_1: "",
      contentHtml_2: "",
      contentHtml_3: "",
      contentHtml_4: "",
      check_1: false,
      check_2: false,
      check_3: false,
      check_4: false,
    });
    setAddTable(temp);
    setCounter3(counter3 + 1);
  };

  const changeTableHtml_1 = (value, id) => {
    var temp = [...addTable];
    let newData = temp.find((item) => item.id == id);
    newData.contentHtml_1 = value;
    setAddTable(temp);
  };

  const changeTableHtml_2 = (value, id) => {
    var temp = [...addTable];
    let newData = temp.find((item) => item.id == id);
    newData.contentHtml_2 = value;
    setAddTable(temp);
  };

  const changeTableHtml_3 = (value, id) => {
    var temp = [...addTable];
    let newData = temp.find((item) => item.id == id);
    newData.contentHtml_3 = value;
    setAddTable(temp);
  };

  const changeTableHtml_4 = (value, id) => {
    var temp = [...addTable];
    let newData = temp.find((item) => item.id == id);
    newData.contentHtml_4 = value;
    setAddTable(temp);
  };

  const getTable = (id) => {
    console.log("ID", id);
    console.log("addTable", addTable);
    console.log("conversation", conversation);
    const roots = addTable.filter((item) => item.root_id === id);
    return roots;
  };

  const saveImage = (img) => {
    setImage(img);
  };

  const Check_Hide_1 = (value, id) => {
    var temp = [...conversation];
    let newData = temp.find((item) => item.id == id);
    newData.check_1 = value;
    setConversation(temp);
  };

  const Check_Hide_2 = (value, id) => {
    var temp = [...conversation];
    let newData = temp.find((item) => item.id == id);
    newData.check_2 = value;
    setConversation(temp);
  };

  const Check_Hide_3 = (value, id) => {
    var temp = [...conversation];
    let newData = temp.find((item) => item.id == id);
    newData.check_3 = value;
    setConversation(temp);
  };

  const Check_Hide_4 = (value, id) => {
    var temp = [...conversation];
    let newData = temp.find((item) => item.id == id);
    newData.check_4 = value;
    setConversation(temp);
  };

  const changeTableHtml_Hide_1 = (value, id) => {
    var temp = [...addTable];
    let newData = temp.find((item) => item.id == id);
    newData.check_1 = value;
    setAddTable(temp);
  };

  const changeTableHtml_Hide_2 = (value, id) => {
    var temp = [...addTable];
    let newData = temp.find((item) => item.id == id);
    newData.check_2 = value;
    setAddTable(temp);
  };

  const changeTableHtml_Hide_3 = (value, id) => {
    var temp = [...addTable];
    let newData = temp.find((item) => item.id == id);
    newData.check_3 = value;
    setAddTable(temp);
  };

  const changeTableHtml_Hide_4 = (value, id) => {
    var temp = [...addTable];
    let newData = temp.find((item) => item.id == id);
    newData.check_4 = value;
    setAddTable(temp);
  };

  const handleChangeComplete5 = (color) => {
    setColor5(color.hex);
  };

  const handleChangeComplete6 = (color) => {
    setColor6(color.hex);
  };

  return (
    <div style={{ width: "100%" }}>
      <ImageCom Img={Img} saveImage={saveImage} />

      <Controller
        name="engin_title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.engin_title}
            helperText={errors?.engin_title?.message}
            variant="outlined"
            required
            className="width-input"
            label="العنوان"
            id="engin_title"
            fullWidth
            style={{ marginBottom: 15 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <Controller
        name="time"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.time}
            helperText={errors?.time?.message}
            variant="outlined"
            required
            className="width-input"
            label="الوقت"
            id="time"
            fullWidth
            style={{ marginBottom: 15 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <div
        style={{
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <span
          style={{
            padding: 10,
            fontWeight: "bolder",
            fontSize: 22,
            textAlign: "right",
            marginTop: 15,
          }}
        >
          Accordion colors
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <TwitterPicker
          color={color1}
          onChangeComplete={handleChangeComplete1}
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

        <TwitterPicker
          color={color2}
          onChangeComplete={handleChangeComplete2}
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

      <div
        style={{
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <span
          style={{
            padding: 10,
            fontWeight: "bolder",
            fontSize: 22,
            textAlign: "right",
            marginTop: 15,
          }}
        >
          Conversation colors
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <div>
          <span style={{ marginBottom: 10 }}>Right panel</span>

          <TwitterPicker
            styles={{ marginTop: 10 }}
            color={color3}
            onChangeComplete={handleChangeComplete3}
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

        <div>
          <span style={{ marginBottom: 10 }}>Left panel</span>

          <TwitterPicker
            styles={{ marginTop: 10 }}
            color={color4}
            onChangeComplete={handleChangeComplete4}
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
      </div>

      <span style={{ fontWeight: "bold" }}>Number</span>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <TwitterPicker
          color={color5}
          onChangeComplete={handleChangeComplete5}
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

        <TwitterPicker
          color={color6}
          onChangeComplete={handleChangeComplete6}
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

      <div
        style={{
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
          width: 120,
        }}
      >
        <span
          style={{
            padding: 10,
            fontWeight: "bolder",
            fontSize: 22,
            textAlign: "right",
            marginTop: 15,
            fontFamily: "Medium",
          }}
        >
          اضافه خطوة
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 10,
          marginBottom: 25,
        }}
      >
        <div
          style={{
            height: 40,
            display: "flex",
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#000",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            width: 40,
            borderRadius: 100,
          }}
          onClick={() => Add_Root()}
        >
          <FuseSvgIcon className="text-48" size={20} color="#000">
            heroicons-solid:plus
          </FuseSvgIcon>
        </div>

        <span
          style={{
            cursor: "pointer",
            paddingLeft: 20,
            paddingRight: 20,
            fontWeight: "bolder",
            fontSize: 20,
            marginTop: 8,
          }}
        >
          {addRoot.length}
        </span>

        <div
          style={{
            height: 40,
            display: "flex",
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#000",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            width: 40,
            borderRadius: 100,
          }}
          onClick={() => Remove_Root_Root()}
        >
          <FuseSvgIcon className="text-48" size={20} color="#000">
            heroicons-solid:minus
          </FuseSvgIcon>
        </div>
      </div>

      {addRoot.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              padding: 20,
              width: "100%",
              border: "2px solid #333",
              borderRadius: 10,
              marginTop: 25,
              position: "relative",
              marginBottom: 15,
            }}
          >
            <div
              onClick={() => Remove_Root(item.id)}
              style={{
                width: 30,
                height: 30,
                background: "red",
                borderRadius: 100,
                position: "absolute",
                top: -12,
                right: -10,
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <FuseSvgIcon className="text-48" size={20} color="#fff">
                material-solid:delete_forever
              </FuseSvgIcon>
            </div>

            <TextField
              variant="outlined"
              required
              className="width-input"
              label={"العنوان"}
              style={{ marginBottom: 15 }}
              id={"title_" + item.id}
              value={item.title}
              onChange={(e) => changeColumn1(e.target.value, item.id)}
              fullWidth
              InputLabelProps={{
                style: { fontFamily: "Medium", fontSize: 14 },
              }}
            />

            <div
              style={{
                marginTop: 5,
                display: "flex",
                flexDirection: "row",
                width: 120,
              }}
            >
              <span
                style={{
                  padding: 10,
                  fontWeight: "bolder",
                  fontSize: 18,
                  textAlign: "right",
                  fontFamily: "Medium",
                }}
              >
                إضافة محادثة
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
                marginBottom: 25,
              }}
            >
              <div
                style={{
                  height: 40,
                  display: "flex",
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  width: 40,
                  borderRadius: 100,
                }}
                onClick={() => Add_Conv(item?.id)}
              >
                <FuseSvgIcon className="text-48" size={20} color="#000">
                  heroicons-solid:plus
                </FuseSvgIcon>
              </div>

              <span
                style={{
                  cursor: "pointer",
                  paddingLeft: 20,
                  paddingRight: 20,
                  fontWeight: "bolder",
                  fontSize: 20,
                  marginTop: 8,
                }}
              >
                {getSubRoots(item?.id)?.length}
              </span>

              <div
                style={{
                  height: 40,
                  display: "flex",
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: "#000",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  width: 40,
                  borderRadius: 100,
                }}
                onClick={() => Remove_Conv_Root()}
              >
                <FuseSvgIcon className="text-48" size={20} color="#000">
                  heroicons-solid:minus
                </FuseSvgIcon>
              </div>
            </div>

            {getSubRoots(item?.id).map((item2, index2) => {
              return (
                <div
                  key={index2}
                  style={{
                    padding: 20,
                    width: "100%",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 10,
                    marginTop: 25,
                    position: "relative",
                    marginBottom: 15,
                  }}
                >
                  <div
                    onClick={() => Remove_Conv(item2.id)}
                    key={index2}
                    style={{
                      width: 30,
                      height: 30,
                      background: "red",
                      borderRadius: 100,
                      position: "absolute",
                      top: -12,
                      right: -10,
                      zIndex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <FuseSvgIcon className="text-48" size={20} color="#fff">
                      material-solid:delete_forever
                    </FuseSvgIcon>
                  </div>

                  <FormControl
                    style={{ marginBottom: 20, marginTop: 10 }}
                    fullWidth
                  >
                    <InputLabel
                      style={{ fontFamily: "Medium", fontSize: 14 }}
                      id="demo-simple-select-label"
                    >
                      Speaker
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id={"select_" + item2.id}
                      name="engines"
                      value={item2?.speaker}
                      label="Country"
                      onChange={(e) => change1(e.target.value, item2.id)}
                      required
                      className="font-custom2"
                    >
                      {types.map((item3, index) => (
                        <MenuItem
                          className="font-custom2"
                          value={item3.name}
                          key={index}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          >
                            <img width={50} height={50} src={item3.img} />
                            <span style={{ paddingRight: 5 }}>
                              {" "}
                              {item3.name2}
                            </span>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <ReactQuill
                    id={"contentHtml_" + item2.id}
                    value={item2?.contentHtml}
                    onChange={(e) => change2(e, item2.id)}
                    className="margin-jo-2"
                  />

                  {item2?.speaker == "family" ? (
                    <div style={{ marginTop: 5 }}>
                      <Checkbox
                        checked={item2?.checked}
                        onChange={(e) =>
                          changeCheckBox(
                            item2?.speaker,
                            item2.id,
                            e.target.checked
                          )
                        }
                      />
                      <span style={{ fontFamily: "Medium", fontSize: 14 }}>
                        انتظر الرد
                      </span>
                    </div>
                  ) : null}

                  <div style={{ marginBottom: 5, marginTop: 20 }}>
                    <Checkbox
                      checked={item2.checked2}
                      onChange={(e) =>
                        changeCheckBox2(item2.id, e.target.checked)
                      }
                    />
                    <span style={{ fontFamily: "Medium", fontSize: 14 }}>
                      show columns
                    </span>
                  </div>

                  {item2.checked2 ? (
                    <>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <TextField
                          variant="outlined"
                          required
                          className="width-input"
                          label={"العمود 1"}
                          style={{ marginBottom: 15, marginTop: 20 }}
                          id={"column_1_" + item2.id}
                          value={item2.column1}
                          onChange={(e) =>
                            changeColumn_1_1(e.target.value, item2.id)
                          }
                          fullWidth
                          InputLabelProps={{
                            style: { fontFamily: "Medium", fontSize: 14 },
                          }}
                        />
                        <Checkbox
                          checked={item2.check_1}
                          onChange={(e) =>
                            Check_Hide_1(e.target.checked, item2.id)
                          }
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <TextField
                          variant="outlined"
                          required
                          className="width-input"
                          label={"العمود 2"}
                          style={{ marginBottom: 15 }}
                          id={"column_2_" + item2.id}
                          value={item2.column2}
                          onChange={(e) =>
                            changeColumn_2_2(e.target.value, item2.id)
                          }
                          fullWidth
                          InputLabelProps={{
                            style: { fontFamily: "Medium", fontSize: 14 },
                          }}
                        />
                        <Checkbox
                          checked={item2.check_2}
                          onChange={(e) =>
                            Check_Hide_2(e.target.checked, item2.id)
                          }
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <TextField
                          variant="outlined"
                          required
                          className="width-input"
                          label={"العمود 3"}
                          style={{ marginBottom: 15 }}
                          id={"column_3_" + item2.id}
                          value={item2.column3}
                          onChange={(e) =>
                            changeColumn_3_3(e.target.value, item2.id)
                          }
                          fullWidth
                          InputLabelProps={{
                            style: { fontFamily: "Medium", fontSize: 14 },
                          }}
                        />
                        <Checkbox
                          checked={item2.check_3}
                          onChange={(e) =>
                            Check_Hide_3(e.target.checked, item2.id)
                          }
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <TextField
                          variant="outlined"
                          required
                          className="width-input"
                          label={"العمود 4"}
                          style={{ marginBottom: 15 }}
                          id={"column_4_" + item2.id}
                          value={item2.column4}
                          onChange={(e) =>
                            changeColumn_4_4(e.target.value, item2.id)
                          }
                          fullWidth
                          InputLabelProps={{
                            style: { fontFamily: "Medium", fontSize: 14 },
                          }}
                        />
                        <Checkbox
                          checked={item2.check_4}
                          onChange={(e) =>
                            Check_Hide_4(e.target.checked, item2.id)
                          }
                        />
                      </div>
                    </>
                  ) : null}

                  <div
                    style={{
                      marginTop: 5,
                      display: "flex",
                      flexDirection: "row",
                      width: 120,
                    }}
                  >
                    <span
                      style={{
                        padding: 10,
                        fontWeight: "bolder",
                        fontSize: 18,
                        textAlign: "right",
                        fontFamily: "Medium",
                      }}
                    >
                      إضافة صف
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 10,
                      marginBottom: 25,
                    }}
                  >
                    <div
                      style={{
                        height: 40,
                        display: "flex",
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: "#000",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        width: 40,
                        borderRadius: 100,
                      }}
                      onClick={() => Add_RootTable(item2?.id)}
                    >
                      <FuseSvgIcon className="text-48" size={20} color="#000">
                        heroicons-solid:plus
                      </FuseSvgIcon>
                    </div>

                    <span
                      style={{
                        cursor: "pointer",
                        paddingLeft: 20,
                        paddingRight: 20,
                        fontWeight: "bolder",
                        fontSize: 20,
                        marginTop: 8,
                      }}
                    >
                      {getTable(item2?.id)?.length}
                    </span>

                    <div
                      style={{
                        height: 40,
                        display: "flex",
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: "#000",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        width: 40,
                        borderRadius: 100,
                      }}
                      onClick={() => Remove_RootTable()}
                    >
                      <FuseSvgIcon className="text-48" size={20} color="#000">
                        heroicons-solid:minus
                      </FuseSvgIcon>
                    </div>
                  </div>

                  {getTable(item2?.id)?.map((itemTable, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          padding: 20,
                          width: "100%",
                          border: "1px solid #e2e8f0",
                          borderRadius: 10,
                          marginTop: 25,
                          position: "relative",
                          marginBottom: 15,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 50,
                            width: "100%",
                          }}
                        >
                          <ReactQuill
                            id={"contentHtml_1_" + itemTable.id}
                            value={itemTable?.contentHtml_1}
                            onChange={(e) => changeTableHtml_1(e, itemTable.id)}
                            className="margin-jo-2"
                            style={{ width: "90%" }}
                          />
                          <Checkbox
                            checked={itemTable.check_1}
                            onChange={(e) =>
                              changeTableHtml_Hide_1(
                                e.target.checked,
                                itemTable.id
                              )
                            }
                          />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 50,
                            width: "100%",
                          }}
                        >
                          <ReactQuill
                            id={"contentHtml_2_" + itemTable.id}
                            value={itemTable?.contentHtml_2}
                            onChange={(e) => changeTableHtml_2(e, itemTable.id)}
                            className="margin-jo-2"
                            style={{ width: "90%" }}
                          />
                          <Checkbox
                            checked={itemTable.check_2}
                            onChange={(e) =>
                              changeTableHtml_Hide_2(
                                e.target.checked,
                                itemTable.id
                              )
                            }
                          />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 50,
                            width: "100%",
                          }}
                        >
                          <ReactQuill
                            id={"contentHtml_3_" + itemTable.id}
                            value={itemTable?.contentHtml_3}
                            onChange={(e) => changeTableHtml_3(e, itemTable.id)}
                            className="margin-jo-2"
                            style={{ width: "90%" }}
                          />
                          <Checkbox
                            checked={itemTable.check_3}
                            onChange={(e) =>
                              changeTableHtml_Hide_3(
                                e.target.checked,
                                itemTable.id
                              )
                            }
                          />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: 50,
                            width: "100%",
                          }}
                        >
                          <ReactQuill
                            id={"contentHtml_4_" + itemTable.id}
                            value={itemTable?.contentHtml_4}
                            onChange={(e) => changeTableHtml_4(e, itemTable.id)}
                            className="margin-jo-2"
                            style={{ width: "90%" }}
                          />
                          <Checkbox
                            checked={itemTable.check_4}
                            onChange={(e) =>
                              changeTableHtml_Hide_4(
                                e.target.checked,
                                itemTable.id
                              )
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}

      <div ref={props.divRef} />
    </div>
  );
});

export default Componen_13;
