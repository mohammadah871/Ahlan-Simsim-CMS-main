import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
} from "react";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import JoditEditor from "jodit-react";
import ImageCom from "src/components/Image";

import _ from "lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { TwitterPicker } from "react-color";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiBaseUrlImage } from "src/constants/config";

const Componen_6 = forwardRef((props, ref) => {
  const [addRoot, setaddRoot] = useState([]);
  const [counter, setCounter] = useState(1);
  const [Img, setImage] = useState("");

  const [color1, setColor1] = useState("#fff");
  const [color2, setColor2] = useState("#fff");

  const [color3, setColor3] = useState("#fff");
  const [color4, setColor4] = useState("#fff");

  const Add_Root = () => {
    props?.scrollToTop();
    var temp = [...addRoot];
    temp.push({
      id: counter,
      title: "",
      contentHtml: "",
    });
    setaddRoot(temp);
    setCounter(counter + 1);
  };

  const Remove_Root_Root = () => {
    var temp = [...addRoot];
    temp.pop();
    setaddRoot(temp);
    setCounter(counter - 1);
  };

  const editor = useRef(null);

  const schema = yup.object().shape({
    engin_title: yup.string().required("You must enter a valid string").min(1),
  });

  const defaultValues = {
    engin_title: "إجراء النشاط",
  };

  const { control, formState, handleSubmit, getValues, setValue, watch } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });

  const { errors } = formState;

  function onSubmit(data) {

    let getUrl = [];
    let getLinks = [];

    addRoot?.forEach((element1) => {
      var parser = new DOMParser();
      var doc = parser?.parseFromString(element1?.contentHtml, "text/html");
  doc?.querySelectorAll("a").forEach((element2) => {
    if (element2?.href?.split(apiBaseUrlImage)[1] != undefined) {
        getUrl.push(element2?.href?.split(apiBaseUrlImage)[1]);
    }else{
      getLinks.push(element2?.href);
    }
      });
    });

    console.log("getUrl=", getUrl);

    let content = {
      data1: addRoot.filter(
        (item) => item.title != "" || item.contentHtml != ""
      ),
      data2: {
        color1: color1,
        color2: color2,
        color3: color3,
        color4: color4,
        img: Img,
      },
    };

    let sendData = {
      id: props.check == false ? props?.getData?.id : null,
      content: content,
      title: data.engin_title,
      name: "components6",
      type: 6,
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
      setImage(props?.getData?.data?.data2?.img);
      setValue("engin_title", props?.getData?.title);
      setaddRoot([...props?.getData?.data?.data1]);
      setCounter(props?.getData?.data?.data1?.length + 1);
      setColor1(props?.getData?.data?.data2?.color1);
      setColor2(props?.getData?.data?.data2?.color2);

      setColor3(props?.getData?.data?.data2?.color3);
      setColor4(props?.getData?.data?.data2?.color4);
    }
  };

  useImperativeHandle(ref, () => ({
    async SaveComponent() {
      handleSubmit(onSubmit)();
    },
  }));

  const changeTitle = (value, id) => {
    var temp = [...addRoot];
    let newData = temp.find((item) => item.id == id);
    newData.title = value;
    setaddRoot(temp);
  };

  const changeHtml = (value, id) => {
    var temp = [...addRoot];
    let newData = temp.find((item) => item.id == id);
    newData.contentHtml = value;
    setaddRoot(temp);
  };

  const Remove_Root = (id) => {
    var temp = addRoot;
    var removeOne = _.reject(temp, function (el) {
      return el.id == id;
    });
    setaddRoot([...removeOne]);
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

  const saveImage = (img) => {
    setImage(img);
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
            multiline
            rows={2}
            maxRows={4}
            style={{ marginBottom: 15 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <span style={{ fontWeight: "bold" }}>Slide</span>

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

      <span style={{ fontWeight: "bold" }}>Number</span>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <TwitterPicker
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

        <TwitterPicker
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
        console.log("item", item);
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
              label="الخطوة"
              fullWidth
              style={{ marginBottom: 15 }}
              id={"title_" + item.id}
              value={item.title}
              onChange={(e) => changeTitle(e.target.value, item.id)}
              InputLabelProps={{
                style: { fontFamily: "Medium", fontSize: 14 },
              }}
            />

            <ReactQuill
              id={"html_1_" + item.id}
              value={item?.contentHtml}
              onChange={(e) => changeHtml(e, item.id)}
            />
          </div>
        );
      })}

      <div ref={props.divRef} />
    </div>
  );
});

export default Componen_6;
