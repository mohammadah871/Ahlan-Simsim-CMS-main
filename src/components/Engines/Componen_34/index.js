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
import ImageCom from "../../Image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { apiBaseUrlImage } from "src/constants/config";

const Componen_22 = forwardRef((props, ref) => {
  const [Img, setImage] = useState("");

  const [addRoot, setaddRoot] = useState([]);
  const [addRoot2, setaddRoot2] = useState([]);
  const [counter, setCounter] = useState(1);
  const [counter2, setCounter2] = useState(1);

  const schema = yup.object().shape({
    engin_title: yup.string().optional("You must enter a valid string").min(1),
    title_1: yup.string().optional("You must enter a valid string").min(1),
    title_2: yup.string().optional("You must enter a valid string").min(1),
    title_3: yup.string().optional("You must enter a valid string").min(1),
    title_4: yup.string().optional("You must enter a valid string").min(1),
    title_section_2: yup.string().optional(),
  });

  const defaultValues = {
    engin_title: "المقدمه",
    title_1: "",
    title_2: "",
    title_3: "",
    title_4: "",
    title_section_2: "ملاحظات للميسر",
  };

  const { control, formState, handleSubmit, setValue } = useForm({
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
      console.log("doc", doc);
      doc?.querySelectorAll("a").forEach((element2) => {
        if (element2?.href?.split(apiBaseUrlImage)[1] != undefined) {
          getUrl.push(element2?.href?.split(apiBaseUrlImage)[1]);
        }
        else{
          getLinks.push(element2?.href);
        }
      });
    });

    addRoot2?.forEach((element1) => {
      var parser = new DOMParser();
      var doc = parser?.parseFromString(element1?.contentHtml, "text/html");
      console.log("doc", doc);
      doc?.querySelectorAll("a").forEach((element2) => {
        if (element2?.href?.split(apiBaseUrlImage)[1] != undefined) {
          getUrl.push(element2?.href?.split(apiBaseUrlImage)[1]);
        }
        else{
          getLinks.push(element2?.href);
        }
      });
    });

    let newFormData = {
      img: Img,
      title_1: data.title_1,
      title_2: data.title_2,
      title_3: data.title_3,
      title_4: data.title_4,
      title_section_2: data?.title_section_2,
      goals: addRoot.filter((item) => item.contentHtml != ""),
      notes: addRoot2.filter((item) => item.contentHtml != ""),
    };

    let newData = {
      id: props.check == false ? props?.getData?.id : null,
      content: newFormData,
      title: data.engin_title,
      name: "components34",
      type: 34,
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

    props.setData(newData);
  }

  useImperativeHandle(ref, () => ({
    async SaveComponent() {
      handleSubmit(onSubmit)();
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      DataFromApi();
    }, 1000);
  }, [props]);

  const DataFromApi = () => {
    if (props.check == false) {
      setImage(props?.getData?.data?.img);
      setValue("engin_title", props?.getData?.title);
      setValue("title_1", props?.getData?.data?.title_1);
      setValue("title_2", props?.getData?.data?.title_2);
      setValue("title_3", props?.getData?.data?.title_3);
      setValue("title_4", props?.getData?.data?.title_4);
      setValue("title_section_2", props?.getData?.data?.title_section_2);
      setaddRoot([...props?.getData?.data?.goals]);
      setaddRoot2([...props?.getData?.data?.notes]);
      setCounter(props?.getData?.data?.goals?.length + 1);
      setCounter2(props?.getData?.data?.notes?.length + 1);
    }
  };

  const saveImage = (img) => {
    setImage(img);
  };

  const Add_Root = () => {
    props?.scrollToTop();
    var temp = [...addRoot];
    temp.push({
      id: counter,
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

  const Add_Root2 = () => {
    props?.scrollToTop();
    var temp = [...addRoot2];
    temp.push({
      id: counter2,
      contentHtml: "",
    });
    setaddRoot2(temp);
    setCounter2(counter2 + 1);
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

  const Remove_Root_Root2 = () => {
    var temp = [...addRoot2];
    temp.pop();
    setaddRoot2(temp);
    setCounter2(counter2 - 1);
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
            className="width-input font-custom3"
            label="العنوان"
            id="engin_title"
            fullWidth
            style={{ marginBottom: 30 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <Controller
        name="title_2"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.title_2}
            helperText={errors?.title_2?.message}
            variant="outlined"
            required
            className="width-input font-custom3"
            label="اسم النشاط"
            id="title_2"
            fullWidth
            style={{ marginBottom: 30 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <Controller
        name="title_3"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.title_3}
            helperText={errors?.title_3?.message}
            variant="outlined"
            required
            className="width-input font-custom3"
            label="رقم النشاط"
            id="title_3"
            fullWidth
            style={{ marginBottom: 30 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <Controller
        name="title_4"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.title_4}
            helperText={errors?.title_4?.message}
            variant="outlined"
            required
            className="width-input font-custom3"
            label="مدة النشاط"
            id="title_4"
            fullWidth
            style={{ marginBottom: 30 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <Controller
        name="title_1"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.title_1}
            helperText={errors?.title_1?.message}
            variant="outlined"
            required
            className="width-input font-custom3"
            label="الوصف: "
            id="title_1"
            fullWidth
            style={{ marginBottom: 30 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

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
            id={item.id}
            key={item.id}
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

            <ReactQuill
              key={item.id}
              id={"html_1_" + item.id}
              value={item?.contentHtml}
              onChange={(e) => changeHtml(e, item.id)}
            />
          </div>
        );
      })}

      <Controller
        name="title_section_2"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.title_section_2}
            helperText={errors?.title_section_2?.message}
            variant="outlined"
            required
            className="width-input font-custom3"
            label="العنوان"
            id="title_section_2"
            fullWidth
            style={{ marginBottom: 30, marginTop: 20 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 10,
          marginBottom: 25,
        }}>
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
          onClick={() => Add_Root2()}
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
          {addRoot2.length}
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
          onClick={() => Remove_Root_Root2()}
        >
          <FuseSvgIcon className="text-48" size={20} color="#000">
            heroicons-solid:minus
          </FuseSvgIcon>
        </div>
      </div>

      {addRoot2.map((item, index) => {
        return (
          <div
            id={item.id}
            key={item.id}
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

            <ReactQuill
              key={item.id}
              id={"html_2_" + item.id}
              value={item?.contentHtml}
              onChange={(e) => changeHtml2(e, item.id)}
            />
          </div>
        );
      })}
    </div>
  );
});

export default Componen_22;
