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
import Autocomplete from "@mui/material/Autocomplete";
import ImageCom from "src/components/Image";

const Componen_2 = forwardRef((props, ref) => {
  const [addRoot, setaddRoot] = useState([]);
  const [counter, setCounter] = useState(1);
  const [Img, setImage] = useState("");

  const ref2 = useRef(null);

  const Add_Root = () => {
    props?.scrollToTop();
    var temp = [...addRoot];
    temp.push({ id: counter, title: "", column_1: "", column_2: "" });
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

    title_second_section_1: yup
      .string()
      .required("You must enter a valid string")
      .min(1),
    title_second_section_2: yup
      .string()
      .required("You must enter a valid string")
      .min(1),
    tags_1: yup.array().required("You must enter a valid string").min(1),
    tags_2: yup.array().required("You must enter a valid string").min(1),
  });

  const defaultValues = {
    engin_title: "الجدول الزّمنيّ وتفاصيل الجلسة",
    column_1: "الفترة الزّمنيّة",
    column_2: "الموضوع",
    title_second_section_1: "الأهداف المعرفيّة",
    title_second_section_2: "الأهداف المهاريّة",
    tags_1: [],
    tags_2: [],
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

  const title_second_section_1 = watch("title_second_section_1");
  const title_second_section_2 = watch("title_second_section_2");

  function onSubmit(data) {
    let content = {
      data1: addRoot.filter(
        (item) => item.column_1 != "" || item.column_2 != ""
      ),
      data2: {
        img: Img,
        column_1: data.column_1,
        column_2: data.column_2,
        title_second_section_1: data.title_second_section_1,
        title_second_section_2: data.title_second_section_2,
        tags_1: data.tags_1,
        tags_2: data.tags_2,
      }
    };

    let sendData = {
      id: props.check == false ? props?.getData?.id : null,
      content: content,
      title: data.engin_title,
      name: "components2",
      type: 2,
      status: props.status,
      getUrl:[],
    };
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
      setValue(
        "title_second_section_1",
        props?.getData?.data?.data2?.title_second_section_1
      );
      setValue(
        "title_second_section_2",
        props?.getData?.data?.data2?.title_second_section_2
      );
      setValue("tags_1", props?.getData?.data?.data2?.tags_1);
      setValue("tags_2", props?.getData?.data?.data2?.tags_2);

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

  const changeColumn2 = (value, id) => {
    var temp = [...addRoot];
    let newData = temp.find((item) => item.id == id);
    newData.column_2 = value;
    setaddRoot(temp);
  };

  const Remove_Root = (id) => {
    var temp = addRoot;
    var removeOne = _.reject(temp, function (el) {
      return el.id == id;
    });
    setaddRoot([...removeOne]);
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
        }}
      >
        <span
          style={{
            padding: 10,
            fontWeight: "bold",
            fontFamily: "Medium",
            marginBottom: 10,
          }}
        >
          الجدول الزّمنيّ وتفاصيل الجلسة
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
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
              style={{ marginBottom: 15, width: "48%" }}
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
              style={{ marginBottom: 15, width: "48%" }}
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

      {addRoot?.map((item, index) => {
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <TextField
                variant="outlined"
                required
                className="width-input"
                label={column_1}
                style={{ marginBottom: 15, width: "48%" }}
                id={"column_1_" + item.id}
                value={item.column_1}
                onChange={(e) => changeColumn1(e.target.value, item.id)}
                InputLabelProps={{
                  style: { fontFamily: "Medium", fontSize: 14 },
                }}
              />

              <TextField
                variant="outlined"
                required
                className="width-input"
                label={column_2}
                style={{ marginBottom: 15, width: "48%" }}
                id={"column_2_" + item.id}
                value={item.column_2}
                onChange={(e) => changeColumn2(e.target.value, item.id)}
                InputLabelProps={{
                  style: { fontFamily: "Medium", fontSize: 14 },
                }}
              />
            </div>
          </div>
        );
      })}

      <div
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <span style={{ padding: 10, fontWeight: "bold", fontFamily: "Medium" }}>
          أهداف الجلسة
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
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
              style={{ marginBottom: 15, width: "48%" }}
              InputLabelProps={{
                style: { fontFamily: "Medium", fontSize: 14 },
              }}
            />
          )}
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
              style={{ marginBottom: 15, width: "48%" }}
              InputLabelProps={{
                style: { fontFamily: "Medium", fontSize: 14 },
              }}
            />
          )}
        />
      </div>

      <Controller
        name="tags_1"
        control={control}
        id="tags_1"
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
                error={!!errors.tags_1}
                helperText={errors?.tags_1?.message}
                placeholder={title_second_section_1}
                label={title_second_section_1}
                variant="outlined"
                fullWidth
                style={{ marginTop: 15, marginBottom: 25 }}
                InputLabelProps={{
                  shrink: true,
                  style: { fontFamily: "Medium", fontSize: 14 },
                }}
              />
            )}
          />
        )}
      />

      <Controller
        name="tags_2"
        control={control}
        id="tags_2"
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
                error={!!errors.tags_2}
                helperText={errors?.tags_2?.message}
                placeholder={title_second_section_2}
                label={title_second_section_2}
                variant="outlined"
                fullWidth
                style={{}}
                InputLabelProps={{
                  shrink: true,
                  style: { fontFamily: "Medium", fontSize: 14 },
                }}
              />
            )}
          />
        )}
      />

      <div ref={props.divRef} />
    </div>
  );
});

export default Componen_2;
