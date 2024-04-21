import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageCom from "../../Image";
import { apiBaseUrlImage } from "src/constants/config";

const Componen_23 = forwardRef((props, ref) => {
  

  const [addRoot2, setaddRoot2] = useState([]);
  const [counter2, setCounter2] = useState(1);
  const [Img, setImage] = useState("");


  const schema = yup.object().shape({
    engin_title: yup.string().required("You must enter a valid string").min(1),
  });

  const defaultValues = {
    engin_title: ""
    };

  const { control, formState, handleSubmit, getValues, setValue, watch } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });

  const { errors } = formState;

  function onSubmit(data) {

    let content = {
      img: Img,
      data1: addRoot2,
      title1: data?.engin_title
        };

    let getUrl = [];

    let getLinks = [];



    addRoot2?.forEach((element) => {
      var parser = new DOMParser();
      var doc = parser?.parseFromString(element?.contentHtml, "text/html");
      console.log("doc", doc);
      doc?.querySelectorAll("a").forEach((element) => {
        if (element?.href?.split(apiBaseUrlImage)[1] != undefined) {
        getUrl.push(element?.href?.split(apiBaseUrlImage)[1]);
        }else{
            getLinks.push(element?.href);  
        }
      });
    });

    console.log("getUrl", getUrl);

    let sendData = {
      id: props.check == false ? props?.getData?.id : null,
      content: content,
      title: data.engin_title,
      name: "components26",
      type: 26,
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
      setValue("engin_title", props?.getData.data?.title1);
      setaddRoot2([...props?.getData?.data?.data1]);
      setCounter2(props?.getData?.data?.data1?.length + 1);
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

  const Add_Root2 = () => {
    props?.scrollToTop();
    var temp = [...addRoot2];
    temp.push({ id: counter2, title: "", contentHtml: "" });
    setaddRoot2(temp);
    setCounter2(counter2 + 1);
  };

  const changeTitle2 = (value, id) => {
    var temp = [...addRoot2];
    let newData = temp.find((item) => item.id == id);
    newData.title = value;
    setaddRoot2(temp);
  };

  const changeHtml2 = (value, id) => {
    var temp = [...addRoot2];
    let newData = temp.find((item) => item.id == id);
    newData.contentHtml = value;
    setaddRoot2(temp);
  };

  const Remove_Root2 = (id) => {
    var temp = addRoot2;
    var removeOne = _.reject(temp, function (el) {
      return el.id == id;
    });
    setaddRoot2([...removeOne]);
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
          marginTop: 5,
          display: "flex",
          flexDirection: "row",
          borderWidth: 1,
          width: 120,
          borderColor: "#000",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <FuseSvgIcon className="text-48" size={20} color="#000">
          heroicons-solid:plus
        </FuseSvgIcon>

        <span
          onClick={() => Add_Root2()}
          style={{
            cursor: "pointer",
            padding: 10,
            fontWeight: "bolder",
            fontSize: 20,
          }}
        >
          إضافة صف
        </span>
      </div>

      {addRoot2?.map((item, index) => {
        return (
          <div
            key={item.id}
            style={{
              padding: 20,
              width: "100%",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              marginTop: 15,
              position: "relative",
            }}
          >
            <div
              onClick={() => Remove_Root2(item.id)}
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
              label="العنوان"
              fullWidth
              style={{ marginBottom: 15 }}
              id={"title_" + item.id}
              value={item.title}
              onChange={(e) => changeTitle2(e.target.value, item.id)}
              InputLabelProps={{
                style: { fontFamily: "Medium", fontSize: 14 },
              }}
            />

            <ReactQuill
              id={item.id}
              key={item.id}
              value={item?.contentHtml}
              onChange={(e) => changeHtml2(e, item.id)}
            />
          </div>
        );
      })}







      <div ref={props.divRef} />
    </div>
  );
});

export default Componen_23;
