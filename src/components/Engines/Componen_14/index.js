import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useRef,
} from "react";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import JoditEditor from "jodit-react";
import ImageCom from "../../Image";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiBaseUrlImage } from "src/constants/config";
const Componen_7 = forwardRef((props, ref) => {
  const editor = useRef(null);

  const [content, setContent] = useState("");

  const [content2, setContent2] = useState("");

  const [Img, setImage] = useState("");

  const schema = yup.object().shape({
    engin_title: yup.string().required("You must enter a valid string").min(1),
    tags: yup.array().required("You must enter a valid string").min(1),
  });

  const defaultValues = {
    engin_title: "بعد الجلسة",
    tags: [],
  };

  const { control, formState, handleSubmit, getValues, setValue, watch } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });

  const { errors } = formState;

  function onSubmit(data) {
    if (content != "") {
      
      let getUrl = [];
      let getLinks = [];

      var parser = new DOMParser();
      var doc = parser?.parseFromString(content, "text/html");
      doc?.querySelectorAll("a").forEach((element) => {
        if (element?.href?.split(apiBaseUrlImage)[1] != undefined) {
          getUrl.push(element?.href?.split(apiBaseUrlImage)[1]);
        } else {
          getLinks.push(element?.href);
        }
      });

      var parser2 = new DOMParser();
    
      var doc2 = parser2?.parseFromString(content2, "text/html");
      doc2?.querySelectorAll("a").forEach((element) => {
        if (element?.href?.split(apiBaseUrlImage)[1] != undefined) {
          getUrl.push(element?.href?.split(apiBaseUrlImage)[1]);
        } else {
          getLinks.push(element?.href);
        }
      });

      let newFormData = {
        img: Img,
        tags: data.tags,
        description: content,
        description2: content2,
      };
    
      let sendData = {
        id: props.check == false ? props?.getData?.id : null,
        content: newFormData,
        title: data.engin_title,
        name: "components14",
        type: 14,
        status: props.status,
        getUrl: getUrl,
        getLinks: getLinks,
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
      setValue("tags", props?.getData?.data?.tags);
      setContent(props?.getData?.data?.description);
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
            style={{ marginBottom: 25 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
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
                label="بعد الجلسة"
                variant="outlined"
                fullWidth
                style={{ marginBottom: 25 }}
                InputLabelProps={{
                  shrink: true,
                  style: { fontFamily: "Medium", fontSize: 14 },
                }}
              />
            )}
          />
        )}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom: 25,
        }}
      >
        <span style={{ marginBlock: 10, fontFamily: "Medium", fontSize: 14 }}>
          {" "}
          التطبيق المطلوب{" "}
        </span>

        <ReactQuill value={content2} onChange={(e) => setContent2(e)} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <span style={{ marginBlock: 10, fontFamily: "Medium", fontSize: 14 }}>
          أرسل للمشاركين عبر الوسيلة المتّفق عليها معهم (مجموعة واتساب على سبيل
          المثال) مع النّصّ الآتي
        </span>

        <ReactQuill value={content} onChange={(e) => setContent(e)} />
      </div>
    </div>
  );
});

export default Componen_7;
