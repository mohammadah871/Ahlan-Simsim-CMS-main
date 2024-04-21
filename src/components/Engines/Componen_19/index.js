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
import JoditEditor from "jodit-react";
import _ from "lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import ImageCom from "src/components/Image";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiBaseUrlImage } from "src/constants/config";


const Componen_5 = forwardRef((props, ref) => {
  const [addRoot, setaddRoot] = useState([]);
  const [counter, setCounter] = useState(1);
  const [Img, setImage] = useState("");

  const editor = useRef(null);

  const schema = yup.object().shape({
    engin_title: yup.string().required("You must enter a valid string").min(1),
    time: yup.string().required("You must enter a valid string").min(1),
   description2: yup.string().required("You must enter a valid string").min(1),

  });

  const defaultValues = {
    engin_title: "الإعاقات التي يمكن دمجها و طريقة تكييف النشاط لدمج الأطفال ذوي الإعاقة :",
    time: "",
    description2:""
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


    addRoot?.forEach((element) => {
      var parser = new DOMParser();
      var doc = parser?.parseFromString(element?.contentHtml, "text/html");
      console.log("doc", doc);
       doc?.querySelectorAll("a").forEach((element)=>{
        if (element?.href?.split(apiBaseUrlImage)[1] != undefined) {
        getUrl.push(element?.href?.split(apiBaseUrlImage)[1]);
        }
        else{
          getLinks.push(element?.href);
        }
      })
    
    });




    let content = {
      data1: addRoot,
      data2: {
        description: data.time,
        img:Img,
      },
      breif: {
        title:"ملاحظات للميسر :",
        contentHtml:data.description2,
        bgColor: "#3BC4FF"
      }
    };




    let sendData = {
      id: props.check == false ? props?.getData?.id : null,
      content: content,
      title: data.engin_title,
      name: "components19",
      type: 19,
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
    setTimeout(()=>{
      DataFromApi();
    },1000)
  }, [props]);

  const DataFromApi = () => {
    if (props.check == false) {
      setImage(props?.getData?.data?.data2?.img);
      setValue("engin_title", props?.getData?.title);
      setValue("time", props?.getData?.data?.data2?.description);
      setValue("description2", props?.getData?.data?.breif?.contentHtml);
      setaddRoot([...props?.getData?.data?.data1]);
      setCounter(props?.getData?.data?.data1?.length + 1);
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

  const Add_Root = () => {
    props?.scrollToTop();
    var temp = [...addRoot];
    temp.push({ id: counter, title: "", contentHtml: "" });
    setaddRoot(temp);
    setCounter(counter + 1);
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
            style={{ marginBottom: 30 }}
            InputLabelProps={{ style: { fontFamily:"Medium" ,fontSize:14 } }} 

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
            label="الوصف"
            id="time"
            fullWidth
            style={{ marginBottom: 30 }}
            InputLabelProps={{ style: { fontFamily:"Medium" ,fontSize:14 } }} 

          />
        )}
      />


<Controller
        name="description2"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.description2}
            helperText={errors?.description2?.message}
            variant="outlined"
            required
            className="width-input"
            label="ملاحظات"
            id="description2"
            fullWidth
            style={{ marginBottom: 30 }}
            InputLabelProps={{ style: { fontFamily:"Medium" ,fontSize:14 } }} 

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
          cursor:"pointer"
        }}
      >

<FuseSvgIcon className="text-48" size={20} color="#000">
          heroicons-solid:plus
        </FuseSvgIcon>

        <span
          onClick={() => Add_Root()}
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

      {addRoot?.map((item, index) => {
        return (
          <div
            key={index}
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
              label="العنوان"
              fullWidth
              style={{ marginBottom: 15 }}
              id={"title_" + item.id}
              value={item.title}
              onChange={(e) => changeTitle(e.target.value, item.id)}
              InputLabelProps={{ style: { fontFamily:"Medium" ,fontSize:14 } }} 

            />

            <ReactQuill
              id={"html_" + item.id}
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

export default Componen_5;
