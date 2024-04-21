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
import { useParams } from "react-router-dom";
import { getAppFileInOneProgram } from "src/constants/Apis";
import Searchable from "react-searchable-dropdown";
import { apiBaseUrlImage } from "src/constants/config";

const Componen_39 = forwardRef((props, ref) => {
  const routeParams = useParams();

  const [allData, setData] = useState([]);
  const [ValueData, setValueData] = useState(null);
  const [getLabel, setLabel] = useState(null);

  const schema = yup.object().shape({
    engin_title: yup.string().required("You must enter a valid string").min(1),
  });

  const defaultValues = {
    engin_title: "",
  };

  const { control, formState, handleSubmit, setValue, watch } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { errors } = formState;

  async function onSubmit(data) {
    let content = {
      pdf: ValueData,
      label: getLabel,
    };

    let sendData = {
      id: props.check == false ? props?.getData?.id : null,
      content: content,
      title: data.engin_title,
      name: "components39",
      type: 39,
      status: props.status,
      getUrl:[ValueData]
    };

    await props.saveUrl([ValueData]);
    await props.setData(sendData);
  }

  useEffect(() => {
    getData();
    setTimeout(() => {
      DataFromApi();
    }, 1000);
  }, [props]);

  const DataFromApi = () => {
    if (props.check == false) {
      setValueData(props?.getData?.data?.pdf);
      setLabel(props?.getData?.data?.label);
      setValue("engin_title", props?.getData?.title);
    }
  };

  useImperativeHandle(ref, () => ({
    async SaveComponent() {
      handleSubmit(onSubmit)();
    },
  }));

  const getData = async () => {
    let d = await getAppFileInOneProgram(routeParams.programId);
    let local = [];
    d.forEach((element) => {
      console.log("element", element);
      local.push({ value: element?.image, label: element?.name });
    });
    setData([...local]);
  };

  const SelectValue = (value) => {
    setValueData(value);
    let label = allData?.find((item) => item?.value == value);
    setLabel(label?.label);
  };

  return (
    <div style={{ width: "100%" }}>
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

      <div style={{ marginTop: 30 }} className="file-details">
        <div
          style={{
            minWidth: 300,
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          {props.check == false ? (
            <div>{apiBaseUrlImage + ValueData}</div>
          ) : null}

          <div style={{ marginTop: 20, marginBottom: 300, width: "50%" }}>
            <Searchable
              value={''}
              placeholder={props.check == false ? getLabel : "Search file"} // by default "Search"
              notFoundText="No result found" // by default "No result found"
              options={allData}
              onSelect={(value) => SelectValue(value)}
              listMaxHeight={300}
              
            />
          </div>
        </div>
      </div>

      <div ref={props.divRef} />
    </div>
  );
});

export default Componen_39;
