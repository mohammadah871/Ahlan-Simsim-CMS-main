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
import JoditEditor from "jodit-react";
import ImageCom from "../../Image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiBaseUrlImage } from "src/constants/config";
const Componen_8 = forwardRef((props, ref) => {
  const [Img, setImage] = useState("");

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [content2, setContent2] = useState("");

  const schema = yup.object().shape({
    engin_title: yup.string().required("You must enter a valid string").min(1),
    time: yup.string().required("You must enter a valid string").min(1),
  });

  const defaultValues = {
    engin_title: "خطة المكالمة",
    time: "",
  };

  const { control, formState, handleSubmit, getValues, setValue, watch } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });

  const { errors } = formState;

  function onSubmit(data) {
    if (content != "" || content2 != "") {
      let getUrl = [];
      let getLinks = [];

      var parser = new DOMParser();
      var doc = parser?.parseFromString(content, "text/html");
     doc?.querySelectorAll("a").forEach((element) => {
      if (element?.href?.split(apiBaseUrlImage)[1] != undefined) {
        getUrl.push(element?.href?.split(apiBaseUrlImage)[1]);
      }else{
        getLinks.push(element?.href);
      }
      });

      var parser2 = new DOMParser();
      var doc2 = parser2?.parseFromString(content2, "text/html");
       doc2?.querySelectorAll("a").forEach((element) => {
        if (element?.href?.split(apiBaseUrlImage)[1] != undefined) {
        getUrl.push(element?.href?.split(apiBaseUrlImage)[1]);
        }else{
          getLinks.push(element?.href);
        }
      });

      console.log("getUrl", getUrl);

      let newFormData = {
        time: data?.time,
        description1: content,
        description2: content2,
        img: Img,
      };
      let sendData = {
        id: props.check == false ? props?.getData?.id : null,
        content: newFormData,
        title: data?.engin_title,
        name: "components8",
        type: 8,
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
      setContent(props?.getData?.data?.description1);
      setContent2(props?.getData?.data?.description2);
    }
  };

  useImperativeHandle(ref, () => ({
    async SaveComponent() {
      handleSubmit(onSubmit)();
    },
  }));

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
            style={{fontFamily: "Medium", marginBottom: 25 }}
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
            label="مدّة المكالمة"
            id="time"
            fullWidth
            style={{ marginBottom: 25 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <ReactQuill
          value={content}
          onChange={(e) => setContent(e)}
        />

        <div style={{ marginBottom: 30 }} />

        <ReactQuill
    
          value={content2}
          onChange={(e) => setContent2(e)}
        />
      </div>
    </div>
  );
});

export default Componen_8;
