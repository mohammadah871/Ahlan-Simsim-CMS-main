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

const Componen_30 = forwardRef((props, ref) => {
  const [addRoot2, setaddRoot2] = useState([]);
  const [counter2, setCounter2] = useState(addRoot2.length + 1);
  const [Img, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");

  const schema = yup.object().shape({
    engin_title: yup.string().required("You must enter a valid string").min(1),
  });

  const defaultValues = {
    engin_title: "",
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
      title: data?.engin_title,
      description: description,
      instructions: instructions,
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
        } else {
          getLinks.push(element?.href);
        }
      });
    });

    console.log("getUrl", getUrl);

    let sendData = {
      id: props.check == false ? props?.getData?.id : null,
      content: content,
      title: data.engin_title,
      name: "components31",
      type: 31,
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

  useEffect(() => {
    setTimeout(() => {
      DataFromApi();
    }, 1000);
  }, [props]);

  const DataFromApi = () => {
    if (props.check == false) {
      setImage(props?.getData?.data?.img);
      setValue("engin_title", props?.getData.data?.title);
      setaddRoot2([...props?.getData?.data?.data1]);
      setCounter2(props?.getData?.data?.data1?.length + 1);
      setDescription(props?.getData.data?.description);
      setInstructions(props?.getData.data?.instructions);
    } else {
      setaddRoot2([
        { id: 1, title: "", contentHtml: "" },
        { id: 2, title: "", contentHtml: "" },
        { id: 3, title: "", contentHtml: "" },
        { id: 4, title: "", contentHtml: "" },
        { id: 5, title: "", contentHtml: "" },
      ]);
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
            style={{ marginBottom: 25 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <ReactQuill value={description} onChange={(e) => setDescription(e)} />

      <ReactQuill
        style={{ marginTop: 25 }}
        value={instructions}
        onChange={(e) => setInstructions(e)}
      />

      <div ref={props.divRef} />
    </div>
  );
});

export default Componen_30;
