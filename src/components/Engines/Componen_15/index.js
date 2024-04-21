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
const Componen_15 = forwardRef((props, ref) => {
  const [Img, setImage] = useState("");

  const schema = yup.object().shape({
    engin_title: yup.string().optional("You must enter a valid string").min(1),
    title_1: yup.string().optional("You must enter a valid string").min(1),
    title_2: yup.string().optional("You must enter a valid string").min(1),
    title_3: yup.string().optional("You must enter a valid string").min(1),
    title_4: yup.string().optional("You must enter a valid string").min(1),
    title_5: yup.string().optional("You must enter a valid string").min(1),
  });

  const defaultValues = {
    engin_title: "",

    title_1: "",
    title_2: "",
    title_3: "",
    title_4: "",
    title_5: "",
    title_7: "",
    title_9: "",
    title_10: "",
  };

  const { control, formState, handleSubmit, setValue } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  function onSubmit(data) {
    let newFormData = {
      img:Img,
      title_1: data.title_1,
      title_2: data.title_2,
      title_3: data.title_3,
      title_4: data.title_4,
      title_5: data.title_5,
      title_7: data.title_7,
      title_9: data.title_9,
      title_10: data.title_10,
    };

    let newData = {
      id: props.check == false ? props?.getData?.id : null,
      content: newFormData,
      title: data.engin_title,
      name: "components15",
      type: 15,
      status: props.status,
      getUrl:[],
    };
    props.setData(newData);
  }

  useImperativeHandle(ref, () => ({
    async SaveComponent() {
      handleSubmit(onSubmit)();
    }
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
      setValue("title_5", props?.getData?.data?.title_5);
      setValue("title_7", props?.getData?.data?.title_7);
      setValue("title_9", props?.getData?.data?.title_9);
      setValue("title_10", props?.getData?.data?.title_10);
    }
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
            label="المجال  النَّمائيُّ"
            id="title_1"
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
            label="الموضوع"
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
            label="مدّة الجلسة"
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
            label="العمر المناسب"
            id="title_4"
            fullWidth
            style={{ marginBottom: 30 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <Controller
        name="title_5"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.title_5}
            helperText={errors?.title_5?.message}
            variant="outlined"
            required
            className="width-input font-custom3"
            label="عدد المشاركين"
            id="title_5"
            fullWidth
            style={{ marginBottom: 30 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <Controller
        name="title_7"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.title_7}
            helperText={errors?.title_7?.message}
            variant="outlined"
            required
            className="width-input font-custom3"
            label="المساحة المطلوبة"
            id="title_7"
            fullWidth
            style={{ marginBottom: 30 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <Controller
        name="title_9"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.title_9}
            helperText={errors?.title_9?.message}
            variant="outlined"
            required
            className="width-input font-custom3"
            label="الترتيب"
            id="title_9"
            fullWidth
            style={{ marginBottom: 30 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />

      <Controller
        name="title_10"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.title_10}
            helperText={errors?.title_10?.message}
            variant="outlined"
            required
            className="width-input font-custom3"
            label="الهدف من الجلسة"
            id="title_10"
            fullWidth
            style={{ marginBottom: 30 }}
            InputLabelProps={{ style: { fontFamily: "Medium", fontSize: 14 } }}
          />
        )}
      />
    </div>
  );
});

export default Componen_15;
