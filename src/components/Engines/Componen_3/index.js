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

import JoditEditor from "jodit-react";
import ImageCom from "../../Image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiBaseUrlImage } from "src/constants/config";
const Componen_3 = forwardRef((props, ref) => {
  const [addRoot, setaddRoot] = useState([]);
  const [counter, setCounter] = useState(1);
  const [Img, setImage] = useState("");

  const Add_Root = () => {
    props?.scrollToTop();
    var temp = [...addRoot];
    temp.push({ id: counter, column_1: "", column_2: "", contentHtml: "" });
    setaddRoot(temp);
    setCounter(counter + 1);
  };

  const Remove_Root_Root = () => {
    var temp = [...addRoot];
    temp.pop();
    setaddRoot(temp);
    setCounter(counter - 1);
  };

  const schema = yup.object().shape({
    engin_title: yup.string().required("You must enter a valid string").min(1),

    column_1: yup.string().required("You must enter a valid string").min(1),
    column_2: yup.string().required("You must enter a valid string").min(1),
    column_3: yup.string().required("You must enter a valid string").min(1),
  });

  const defaultValues = {
    engin_title: "قائمة الموادّ",
    column_1: "التّمرين",
    column_2: "الموادّ والأدوات والقرطاسيّة",
    column_3: "المطبوعات والنّشرات واللوحات والموادّ الإعلاميّة",
  };

  const { control, formState, handleSubmit, getValues, setValue, watch } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });

  const { errors } = formState;

  const column_1 = watch("column_1");
  const column_2 = watch("column_2");
  const column_3 = watch("column_3");

  const editor = useRef(null);

  function onSubmit(data) {
    let content = {
      data1: addRoot?.filter(
        (item) =>
          item.column_1 != "" || item.column_2 != "" || item.contentHtml != ""
      ),

      data2: {
        img: Img,
        column_1: data.column_1,
        column_2: data.column_2,
        column_3: data.column_3,
      },
    };

    let getUrl = [];
    let getLinks = [];

    addRoot?.forEach((element) => {

      var parser = new DOMParser();
      var doc = parser?.parseFromString(element?.column_2, "text/html");
      console.log("doc", doc);
       doc?.querySelectorAll("a").forEach((element)=>{
        if (element?.href?.split(apiBaseUrlImage)[1] != undefined) {
        getUrl.push(element?.href?.split(apiBaseUrlImage)[1]);
        }
        else{
          getLinks.push(element?.href);
        }
      })
    
      var parser2 = new DOMParser();
      var doc2 = parser2?.parseFromString(element?.contentHtml, "text/html");
      doc2?.querySelectorAll("a").forEach((element)=>{
        if (element?.href?.split(apiBaseUrlImage)[1] != undefined) {
        getUrl.push(element?.href?.split(apiBaseUrlImage)[1]);
        }
        else{
          getLinks.push(element?.href);
        }
      })





    });


    let sendData = {
      id: props.check == false ? props?.getData?.id : null,
      content: content,
      title: data.engin_title,
      name: "components3",
      type: 3,
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
      setValue("column_1", props?.getData?.data?.data2?.column_1);
      setValue("column_2", props?.getData?.data?.data2?.column_2);
      setValue("column_3", props?.getData?.data?.data2?.column_3);
      setCounter(props?.getData?.data?.data1?.length + 1);
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
    newData.column_1 = value;
    setaddRoot(temp);
  };

  const Remove_Root = (id) => {
    var temp = addRoot;
    var removeOne = _.reject(temp, function (el) {
      return el.id == id;
    });
    setaddRoot([...removeOne]);
  };

  const changeHtml_1 = (value, id) => {
    var temp = [...addRoot];
    let newData = temp.find((item) => item.id == id);
    newData.column_2 = value;
    setaddRoot(temp);
  };

  const changeHtml_2 = (value, id) => {
    var temp = [...addRoot];
    let newData = temp.find((item) => item.id == id);
    newData.contentHtml = value;
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

      <div
        style={{
          marginTop: 0,
          display: "flex",
          flexDirection: "row",
        }}>
        <span style={{ padding: 10, fontWeight: "bold" }}>قائمة الموادّ</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}>
        <Controller
          name="column_1"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.column_1}
              helperText={errors?.column_1?.message}
              variant="outlined"
              required
              className="width-input"
              label={column_1}
              id="column_1"
              style={{ marginBottom: 15, width: "32%" }}
              InputLabelProps={{
                style: { fontFamily: "Medium", fontSize: 14 },
              }}
            />
          )}
        />

        <Controller
          name="column_2"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.column_2}
              helperText={errors?.column_2?.message}
              variant="outlined"
              required
              className="width-input"
              label={column_2}
              id="column_2"
              style={{ marginBottom: 15, width: "32%" }}
              InputLabelProps={{
                style: { fontFamily: "Medium", fontSize: 14 },
              }}
            />
          )}
        />

        <Controller
          name="column_3"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.column_3}
              helperText={errors?.column_3?.message}
              variant="outlined"
              required
              className="width-input"
              label={column_3}
              id="column_3"
              style={{ marginBottom: 15, width: "32%" }}
              InputLabelProps={{
                style: { fontFamily: "Medium", fontSize: 14 },
              }}
            />
          )}
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
        console.log(" item ==", item);
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
              label={column_1}
              style={{ marginBottom: 15 }}
              id={"column_1_" + item.id}
              value={item.column_1}
              onChange={(e) => changeColumn1(e.target.value, item.id)}
              fullWidth
              InputLabelProps={{
                style: { fontFamily: "Medium", fontSize: 14 },
              }}
            />

            <ReactQuill
              id={"html_1_" + item.id}
              value={item?.column_2}
              onChange={(e) => changeHtml_1(e, item.id)}
            />

            <div style={{ marginBottom: 20 }} />

            <ReactQuill
              id={"html_2_" + item.id}
              value={item?.contentHtml}
              onChange={(e) => changeHtml_2(e, item.id)}
            />
          </div>
        );
      })}

      <div ref={props.divRef} />
    </div>
  );
});

export default Componen_3;
