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
import ImageCom from "src/components/Image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiBaseUrlImage } from "src/constants/config";
import Checkbox from '@mui/material/Checkbox';


const Componen_7 = forwardRef((props, ref) => {
  const [content, setContent] = useState("");

  const [content2, setContent2] = useState("");

  const [hide1, setHide1] = useState(false);


  
  const [Img, setImage] = useState("");

  const schema = yup.object().shape({
    engin_title: yup.string().optional(""),
    engin_title2: yup.string().optional("")
  });

  const defaultValues = {
    engin_title: "ملاحظات للميسر",
    engin_title2: "مواد إعلامية لإرسالها للمشاركين",
  };

  const { control, formState, handleSubmit, getValues, setValue, watch } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });

  const { errors } = formState;

  function removeTag(str) {
    str = str.replace(/<br>/g, "");
    return str;
  }

  function onSubmit(data) {

      let getUrl = [];
      let getLinks = [];



      var parser = new DOMParser();
      var doc = parser?.parseFromString(content, "text/html");
      doc?.querySelectorAll("a").forEach((element) => {
        if (element?.href?.split(apiBaseUrlImage)[1] != undefined) {
          getUrl.push(element?.href?.split(apiBaseUrlImage)[1]);
        }
        else{
          getLinks.push(element?.href);
        }
      });


      let newFormData = { 
        description: content,
        description_for_mobile: removeTag(content),
        description2: content2,
        description_for_mobile: removeTag(content2),
        title2: data.engin_title2,
        img: Img,
        hide1:hide1,
      };


      let sendData = {
        id: props.check == false ? props?.getData?.id : null,
        content: newFormData,
        title: data.engin_title,
        name: "components33",
        type: 33,
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
      setValue("engin_title2", props?.getData?.data?.title2);
      setContent(props?.getData?.data?.description);
      setContent2(props?.getData?.data?.description2);
      setHide1(props?.getData?.data?.hide1)
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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <span style={{ marginBlock: 10, fontFamily: "Medium" }}>
          ملاحظات للميسر
        </span>
        <ReactQuill value={content} onChange={(e) => setContent(e)} />


        <div style={{ marginBottom: 5, marginTop: 20 }}>
          <Checkbox
            checked={hide1}
            onChange={(e) => setHide1(e.target.checked)}
          />
          <span style={{ fontFamily: "Medium", fontSize: 14 }}>إخفاء</span>
        </div>



      </div>

      <Controller
        name="engin_title2"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.engin_title2}
            helperText={errors?.engin_title2?.message}
            variant="outlined"
            required
            className="width-input"
            label="العنوان"
            id="engin_title2"
            fullWidth
            style={{ marginTop: 40 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: 20,
        }}
      >
        <span style={{ marginBlock: 10, fontFamily: "Medium" }}>
          مواد إعلامية لإرسالها للمشاركين
        </span>
        <ReactQuill value={content2} onChange={(e) => setContent2(e)} />
      </div>
    </div>
  );
});

export default Componen_7;
