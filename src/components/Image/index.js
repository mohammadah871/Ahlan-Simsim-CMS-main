import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { lighten, styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { apiBaseUrlImage } from "src/constants/config";
import { UploadFile } from "src/constants/Apis";
import { Controller, useForm } from "react-hook-form";
import { orange } from "@mui/material/colors";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const Root = styled("div")(({ theme }) => ({
  "& .productImageFeaturedStar": {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
    display: "none",
  },

  "& .productImageUpload": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },

  "& .productImageItem": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& .productImageFeaturedStar": {
        opacity: 0.8,
        display: "none",
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& .productImageFeaturedStar": {
        opacity: 1,
        display: "none",
      },
      "&:hover .productImageFeaturedStar": {
        opacity: 1,
        display: "none",
      },
    },
  },
}));

function ImageCom(props) {
  console.log("props", props);

  const schema = yup.object().shape({
    img: yup.string(),
  });

  const defaultValues = {
    img: "",
  };

  const { control, getValues, setValue, watch, errors, handleSubmit } = useForm(
    {
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema),
    }
  );

  const img = watch("img");

  useEffect(() => {
    setValue("img", props?.Img);
  }, [props]);

  const UpdateImage = async (path) => {
    props.saveImage(path);
  };

  const clearImage =()=>{
    setValue("img",""); 
    props.saveImage("");
  }

  return (
    <div style={{ marginBottom: 15 }} className="file-details">
      <div
        style={{
          minWidth: 300,
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Root>
          <div
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="flex justify-center sm:justify-start flex-wrap -mx-16 audio-container"
          >
            <Controller
              name="img"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Box
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? lighten(theme.palette.background.default, 0.4)
                        : lighten(theme.palette.background.default, 0.02),
                    flexDirection: "column",
                    justifyContent: "center",
                    display: "flex",
                  }}
                  component="label"
                  htmlFor={`file_1`}
                  className="productImageUpload flex items-center justify-center relative rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                  style={{ width: 100, height: 100 }}
                >
                  <input
                    className="hidden"
                    id={`file_1`}
                    type="file"
                    onChange={async (e) => {
                      const file = e.target.files;
                      if (!file) {
                        return;
                      }

                      const URL = await UploadFile(file);
                      await onChange(URL?.data[0]?.path);
                      await UpdateImage(URL?.data[0]?.path);
                    }}
                  />
                  <FuseSvgIcon size={32} color="action">
                    heroicons-outline:upload
                  </FuseSvgIcon>
                  <span style={{ fontSize: 12 }} className="span-1">
                    Upload Image
                  </span>
                </Box>
              )}
            />

            {img == "" ? null : (
              <div style={{position:"relative",zIndex:0}}>
                <img
                  src={apiBaseUrlImage + img}
                  style={{
                    width: 150,
                    objectFit: "contain",
                    marginRight: 15,
                    marginLeft: 15,
                  }}
                />
                <div onClick={()=>clearImage()} style={{position:"absolute",zIndex:1,top:5,right:10,background:"#eee",borderRadius:200,width:35,height:35,display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer"}}>
                <FuseSvgIcon color={"red"}>heroicons-outline:trash</FuseSvgIcon>
                  </div>
              </div>
            )}
          </div>
        </Root>
      </div>
    </div>
  );
}

export default ImageCom;
