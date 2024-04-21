import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
  useState,
} from "react";
import { Checkbox, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import JoditEditor from "jodit-react";
import ImageCom from "../../Image";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiBaseUrlImage } from "src/constants/config";

const Componen_10 = forwardRef((props, ref) => {
  const editor = useRef(null);
  const [Img, setImage] = useState("");

  const [content_1_1, setContent_1_1] = useState("");
  const [content_1_2, setContent_1_2] = useState("");
  const [content_1_3, setContent_1_3] = useState("");
  const [content_1_4, setContent_1_4] = useState("");
  const [content_1_5, setContent_1_5] = useState("");
  const [content_1_6, setContent_1_6] = useState("");
  const [content_1_7, setContent_1_7] = useState("");
  const [content_1_8, setContent_1_8] = useState("");

  const [content_1_9, setContent_1_9] = useState("");
  const [content_1_10, setContent_1_10] = useState("");

  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [hide4, setHide4] = useState(false);
  const [hide5, setHide5] = useState(false);

  const schema = yup.object().shape({
    engin_title: yup.string().required("You must enter a valid string").min(1),

    title_second_section_1: yup
      .string()
      .optional()
      .min(1),

    title_second_section_2: yup.string()
      .optional()
      .min(1),

    title_second_section_3: yup
      .string()
      .optional()
      .min(1),

    title_second_section_4: yup
      .string()
      .optional()
      .min(1),

    title_second_section_5: yup
      .string()
      .optional()
      .min(1),
  });

  const defaultValues = {
    engin_title:
      "النتاجات التعليمية التعلمية المتوقعة من الطفل بعد الانتهاء من الجلسة",

    title_second_section_1: "المجال الانفعالي/الاجتماعي",
    title_second_section_2: "المجال اللغوي",

    title_second_section_3: "المجال الحركي",
    title_second_section_4: "المجال المعرفي",
    title_second_section_5: "المجال الصحي",
  };

  const { control, formState, handleSubmit, getValues, setValue, watch } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });

  const { errors } = formState;

  const title_second_section_1 = watch("title_second_section_1");
  const title_second_section_2 = watch("title_second_section_2");
  const title_second_section_3 = watch("title_second_section_3");
  const title_second_section_4 = watch("title_second_section_4");
  const title_second_section_5 = watch("title_second_section_5");

  function onSubmit(data) {
    let newData = [
      {
        id: 1,
        title: data.title_second_section_1,
        bgColor: "#AECF55",
        tags: [
          {
            title: "النتاجات العامة:",
            contentHtml: content_1_1,
            bgColor: "#7B68EE",
          },
          {
            title: "النتاجات الخاصة:",
            contentHtml: content_1_2,
            bgColor: "#FFC800",
          },
        ],
        hide: hide1,
      },
      {
        id: 2,
        title: data.title_second_section_2,
        bgColor: "#FFC800",
        tags: [
          {
            title: "النتاجات العامة:",
            contentHtml: content_1_3,
            bgColor: "#7B68EE",
          },
          {
            title: "النتاجات الخاصة:",
            contentHtml: content_1_4,
            bgColor: "#FFC800",
          },
        ],
        hide: hide2,
      },
      {
        id: 3,
        title: data.title_second_section_3,
        bgColor: "#3BC4FF",
        tags: [
          {
            title: "النتاجات العامة:",
            contentHtml: content_1_5,
            bgColor: "#7B68EE",
          },
          {
            title: "النتاجات الخاصة:",
            contentHtml: content_1_6,
            bgColor: "#FFC800",
          },
        ],
        hide: hide3,
      },
      {
        id: 4,
        title: data.title_second_section_4,
        bgColor: "#FD71AF",
        tags: [
          {
            title: "النتاجات العامة:",
            contentHtml: content_1_7,
            bgColor: "#7B68EE",
          },
          {
            title: "النتاجات الخاصة:",
            contentHtml: content_1_8,
            bgColor: "#FFC800",
          },
        ],
        hide: hide4,
      },
      {
        id: 5,
        title: data.title_second_section_5,
        bgColor: "#AECF55",
        tags: [
          {
            title: "النتاجات العامة:",
            contentHtml: content_1_9,
            bgColor: "#7B68EE",
          },
          {
            title: "النتاجات الخاصة:",
            contentHtml: content_1_10,
            bgColor: "#FFC800",
          },
        ],
        hide: hide5,
      },
    ];


    let getUrl = [];
    let getLinks = [];

    newData.forEach((item) => {
      item.tags.forEach((item2) => {
        var parser = new DOMParser();
        var doc = parser?.parseFromString(item2.contentHtml, "text/html");
         doc?.querySelectorAll("a").forEach((element) => {
          if (element?.href?.split(apiBaseUrlImage)[1] != undefined) {
          getUrl.push(element?.href?.split(apiBaseUrlImage)[1]);
          }else{
            getLinks.push(element?.href);
          }
        });
      });
    });

    console.log("getUrl=", getUrl);

    const dataApi = {
      img: Img,
      data: newData,
    };

    let sendData = {
      id: props.check == false ? props?.getData?.id : null,
      content: dataApi,
      title: data.engin_title,
      name: "components10",
      type: 10,
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
      setValue("engin_title", props?.getData?.title);

      setValue("title_second_section_1", props?.getData?.data?.data[0]?.title);
      setValue("title_second_section_2", props?.getData?.data?.data[1]?.title);
      setValue("title_second_section_3", props?.getData?.data?.data[2]?.title);

      setValue("title_second_section_4", props?.getData?.data?.data[3]?.title);

      setValue("title_second_section_5", props?.getData?.data?.data[4]?.title);

      setImage(props?.getData?.data?.img);
      setContent_1_1(props?.getData?.data?.data[0]?.tags[0]?.contentHtml);
      setContent_1_2(props?.getData?.data?.data[0]?.tags[1]?.contentHtml);
      setContent_1_3(props?.getData?.data?.data[1]?.tags[0]?.contentHtml);
      setContent_1_4(props?.getData?.data?.data[1]?.tags[1]?.contentHtml);
      setContent_1_5(props?.getData?.data?.data[2]?.tags[0]?.contentHtml);
      setContent_1_6(props?.getData?.data?.data[2]?.tags[1]?.contentHtml);
      setContent_1_7(props?.getData?.data?.data[3]?.tags[0]?.contentHtml);
      setContent_1_8(props?.getData?.data?.data[3]?.tags[1]?.contentHtml);
      setContent_1_9(props?.getData?.data?.data[4]?.tags[0]?.contentHtml);
      setContent_1_10(props?.getData?.data?.data[4]?.tags[1]?.contentHtml);
      setHide1(props?.getData?.data?.data[0]?.hide);
      setHide2(props?.getData?.data?.data[1]?.hide);
      setHide3(props?.getData?.data?.data[2]?.hide);
      setHide4(props?.getData?.data?.data[3]?.hide);
      setHide5(props?.getData?.data?.data[4]?.hide);
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
            style={{ marginBottom: 40 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 10,
          width: "100%",
        }}
      >
        <Controller
          name="title_second_section_1"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.title_second_section_1}
              helperText={errors?.title_second_section_1?.message}
              variant="outlined"
              required
              className="width-input"
              label={title_second_section_1}
              id="title_second_section_1"
              style={{ marginBottom: 30 }}
              fullWidth
              InputLabelProps={{
                style: { fontFamily: "Medium", fontSize: 14 },
              }}
            />
          )}
        />

        <div style={{ marginBottom: 5, marginTop: -20 }}>
          <Checkbox
            checked={hide1}
            onChange={(e) => setHide1(e.target.checked)}
          />
          <span style={{ fontFamily: "Medium", fontSize: 14 }}>إخفاء</span>
        </div>

        <ReactQuill
          value={content_1_1}
          placeholder="النتاجات العامة:"
          onChange={(e) => setContent_1_1(e)}
          className="margin-jo-1"
        />

        <ReactQuill
          value={content_1_2}
          placeholder="النتاجات الخاصة:"
          onChange={(e) => setContent_1_2(e)}
          className="margin-jo-1"
        />

        <Controller
          name="title_second_section_2"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.title_second_section_2}
              helperText={errors?.title_second_section_2?.message}
              variant="outlined"
              required
              className="width-input"
              label={title_second_section_2}
              id="title_second_section_2"
              style={{ marginBottom: 30 }}
              fullWidth
              InputLabelProps={{
                style: { fontFamily: "Medium", fontSize: 14 },
              }}
            />
          )}
        />

        <div style={{ marginBottom: 5, marginTop: -20 }}>
          <Checkbox
            checked={hide2}
            onChange={(e) => setHide2(e.target.checked)}
          />
          <span style={{ fontFamily: "Medium", fontSize: 14 }}>إخفاء</span>
        </div>

        <ReactQuill
          value={content_1_3}
            placeholder= "النتاجات العامة:"
          onChange={(e) => setContent_1_3(e)}
          className="margin-jo-1"
        />

        <ReactQuill
          value={content_1_4}
          placeholder= "النتاجات الخاصة:"
          onChange={(e) => setContent_1_4(e)}
          className="margin-jo-1"
        />

        <Controller
          name="title_second_section_3"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.title_second_section_3}
              helperText={errors?.title_second_section_3?.message}
              variant="outlined"
              required
              className="width-input"
              label={title_second_section_3}
              id="title_second_section_3"
              style={{ marginBottom: 30 }}
              fullWidth
              InputLabelProps={{
                style: { fontFamily: "Medium", fontSize: 14 },
              }}
            />
          )}
        />

        <div style={{ marginBottom: 5, marginTop: -20 }}>
          <Checkbox
            checked={hide3}
            onChange={(e) => setHide3(e.target.checked)}
          />
          <span style={{ fontFamily: "Medium", fontSize: 14 }}>إخفاء</span>
        </div>

        <ReactQuill
          value={content_1_5}
          placeholder= "النتاجات العامة:"
          onChange={(e) => setContent_1_5(e)}
          className="margin-jo-1"
        />

        <ReactQuill
          value={content_1_6}
            placeholder= "النتاجات الخاصة:"
            onChange={(e) => setContent_1_6(e)}
          className="margin-jo-1"
      
        />

        <Controller
          name="title_second_section_4"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.title_second_section_4}
              helperText={errors?.title_second_section_4?.message}
              variant="outlined"
              required
              className="width-input"
              label={title_second_section_4}
              id="title_second_section_4"
              style={{ marginBottom: 30 }}
              fullWidth
              InputLabelProps={{
                style: { fontFamily: "Medium", fontSize: 14 },
              }}
            />
          )}
        />

        <div style={{ marginBottom: 5, marginTop: -20 }}>
          <Checkbox
            checked={hide4}
            onChange={(e) => setHide4(e.target.checked)}
          />
          <span style={{ fontFamily: "Medium", fontSize: 14 }}>إخفاء</span>
        </div>
        <ReactQuill
          value={content_1_7}
            placeholder= "النتاجات العامة:"
          onChange={(e) => setContent_1_7(e)}
          className="margin-jo-1"
        />

        <ReactQuill
          value={content_1_8}
            placeholder= "النتاجات الخاصة:"
          onChange={(e) => setContent_1_8(e)}
          className="margin-jo-1"
        />

        <Controller
          name="title_second_section_5"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.title_second_section_5}
              helperText={errors?.title_second_section_5?.message}
              variant="outlined"
              required
              className="width-input"
              label={title_second_section_5}
              id="title_second_section_5"
              style={{ marginBottom: 30 }}
              fullWidth
              InputLabelProps={{
                style: { fontFamily: "Medium", fontSize: 14 },
              }}
            />
          )}
        />

        <div style={{ marginBottom: 5, marginTop: -20 }}>
          <Checkbox
            checked={hide5}
            onChange={(e) => setHide5(e.target.checked)}
          />
          <span style={{ fontFamily: "Medium", fontSize: 14 }}>إخفاء</span>
        </div>

        <ReactQuill
          value={content_1_9}
            placeholder="النتاجات العامة:"
          onChange={(e) => setContent_1_9(e)}
          className="margin-jo-1"
        />

        <ReactQuill
          value={content_1_10}
          placeholder= "النتاجات الخاصة:"
          onChange={(e) => setContent_1_10(e)}
          className="margin-jo-1"
        />
      </div>

      <div ref={props.divRef} />
    </div>
  );
});

export default Componen_10;
