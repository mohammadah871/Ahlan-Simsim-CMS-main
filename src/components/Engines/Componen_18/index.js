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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageCom from "../../Image";
import { apiBaseUrlImage } from "src/constants/config";

const Componen_3 = forwardRef((props, ref) => {
  const [addRoot, setaddRoot] = useState([]);
  const [counter, setCounter] = useState(1);

  const [Img, setImage] = useState("");

  const Add_Root = () => {
    props?.scrollToTop();
    var temp = [...addRoot];
    temp.push({ id: counter, title: "", color: "" });
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
    description: yup.string().optional(),
  });

  const defaultValues = {
    engin_title: "تكييف النشاط للفئات العمرية المختلفة",
    description: "",
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
        description: element.title,
        color: element.color,
      });
    });



    let getUrl = [];
    let getLinks = [];
    addRoot?.forEach((element) => {
      var parser = new DOMParser();
      var doc = parser?.parseFromString(element?.title, "text/html");
      console.log("doc", doc);
      doc?.querySelectorAll("a").forEach((element) => {
        if (element?.href?.split(apiBaseUrlImage)[1] != undefined) {
          getUrl.push(element?.href?.split(apiBaseUrlImage)[1]);
        }
        else{
          getLinks.push(element?.href);
        }
      });
    });

    let content = {
      img: Img,
      data: NewDate,
      addRoot: addRoot,
      description: data?.description
    };

    let sendData = {
      id: props.check == false ? props?.getData?.id : null,
      content: content,
      title: data.engin_title,
      name: "components18",
      type: 18,
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
      console.log("props?.getData", props?.getData);
      setImage(props?.getData?.data?.img);
      setValue("description", props?.getData?.data?.description);
      setValue("engin_title", props?.getData?.title);
      console.log("props", props?.getData?.data);
      setaddRoot([...props?.getData?.data?.addRoot]);
      setCounter(props?.getData?.data?.addRoot?.length + 1);
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

  const handleChangeComplete1 = (color, id) => {
    console.log("color", color.hex);
    var temp = [...addRoot];
    let newData = temp.find((item) => item.id == id);
    newData.color = color.hex;
    setaddRoot(temp);
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
            style={{ marginBottom: 15 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.description}
            helperText={errors?.description?.message}
            variant="outlined"
            required
            className="width-input"
            label="الوصف"
            id="description"
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

            <TwitterPicker
              id={"color_" + item.id}
              color={item?.color}
              onChangeComplete={(e) => handleChangeComplete1(e, item?.id)}
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
            <div style={{ marginBottom: 15 }} />
            <ReactQuill
              id={"title_" + item.id}
              value={item?.title}
              onChange={(e) => changeColumn1(e, item.id)}
              className="margin-jo-2"
            />
          </div>
        );
      })}

      <div ref={props.divRef} />
    </div>
  );
});

export default Componen_3;
