import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageCom from "../../Image";

const Componen_9 = forwardRef((props, ref) => {
  const schema = yup.object().shape({
    engin_title: yup.string().required("You must enter a valid string").min(1),
    tags: yup.array().required("You must enter a valid string").min(1),
  });

  const defaultValues = {
    engin_title:
      "عند الانتهاء من هذه الجلسة يتوقع من مقدم الرعاية أن يتعرف إلى:",
    tags: [],
  };

  const { control, formState, handleSubmit, getValues, setValue, watch } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    });

  const { errors } = formState;

  const [Img, setImage] = useState("");

  function onSubmit(data) {
    if (data?.tags?.length != 0) {
      let newFormData = {
        tags: data.tags,
        img: Img,
      };
      let sendData = {
        id: props.check == false ? props?.getData?.id : null,
        content: newFormData,
        title: data.engin_title,
        name: "components9",
        type: 9,
        status: props.status,
        getUrl:[],
      };
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
                label=""
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
    </div>
  );
});

export default Componen_9;
