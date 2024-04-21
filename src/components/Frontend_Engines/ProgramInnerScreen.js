import React, { useEffect, useState } from "react";
import "./component/ProgramInnerScreen.css";
import FuseLoading from "@fuse/core/FuseLoading";
import { getAllEngines } from "src/constants/Apis";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";

import i18n from "src/i18n";
import ProgramInnerSlide1 from "./component/ProgramInnerSlide1";
import ProgramInnerSlide2 from "./component/ProgramInnerSlide2";
import ProgramInnerSlide3 from "./component/ProgramInnerSlide3";
import ProgramInnerSlide4 from "./component/ProgramInnerSlide4";
import ProgramInnerSlide5 from "./component/ProgramInnerSlide5";
import ProgramInnerSlide6 from "./component/ProgramInnerSlide6";
import ProgramInnerSlide7 from "./component/ProgramInnerSlide7";
import ProgramInnerSlide8 from "./component/ProgramInnerSlide8";
import ProgramInnerSlide9 from "./component/ProgramInnerSlide9";
import ProgramInnerSlide10 from "./component/ProgramInnerSlide10";
import ProgramInnerSlide11 from "./component/ProgramInnerSlide11";
import ProgramInnerSlide12 from "./component/ProgramInnerFamilyPhoneCallSlide1";
import ProgramInnerSlide13 from "./component/ProgramInnerFamilyPhoneCallSlide2";
import ProgramInnerSlide14 from "./component/ProgramInnerFamilyPhoneCallSlide3";
import ProgramInnerSlide15 from "./component/ProgramInnerType4Slide1";
import ProgramInnerSlide16 from "./component/ProgramInnerType4Slide2";
import ProgramInnerSlide17 from "./component/ProgramInnerType4Slide3";
import ProgramInnerSlide18 from "./component/ProgramInnerType4Slide4";
import ProgramInnerSlide19 from "./component/ProgramInnerType4Slide5";
import ProgramInnerSlide21 from "./component/ProgramInnerSlide21";
import ProgramInnerSlide22 from "./component/ProgramInnerSlide22";
import ProgramInnerSlide23 from "./component/ProgramInnerSlide23";
import ProgramInnerSlide24 from "./component/ProgramInnerSlide24";
import ProgramInnerSlide25 from "./component/ProgramInnerSlide25";
import ProgramInnerSlide26 from "./component/ProgramInnerSlide26";
import ProgramInnerSlide27 from "./component/ProgramInnerSlide27";
import ProgramInnerSlide28 from "./component/ProgramInnerSlide28";
import ProgramInnerSlide29 from "./component/ProgramInnerSlide29";
import ProgramInnerSlide30 from "./component/ProgramInnerSlide30";
import ProgramInnerSlide31 from "./component/ProgramInnerSlide31";
import ProgramInnerSlide32 from "./component/ProgramInnerSlide32";
import ProgramInnerSlide33 from "./component/ProgramInnerSlide33";
import ProgramInnerSlide34 from "./component/ProgramInnerSlide34";
import ProgramInnerSlide35 from "./component/ProgramInnerSlide35";
import ProgramInnerSlide36 from "./component/ProgramInnerSlide36";
import ProgramInnerSlide37 from "./component/ProgramInnerSlide37";
import ProgramInnerSlide38 from "./component/ProgramInnerSlide38";
import ProgramInnerSlide39 from "./component/ProgramInnerSlide39";

function ProgramInnerScreen(props) {
  const { programId, sessionId, id } = props;
  const [componentData, setComponentData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [index_game, setIndex_game] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let dataSend = {
      programId: programId,
      sessionId: sessionId,
      id: id,
    };

    let data = await getAllEngines(dataSend);
    var elementPos = data
      .map(function (x) {
        return x.id;
      })
      .indexOf(id);
    setIndex_game(elementPos);
    setComponentData(data);
    setLoader(false);
  };

  const next = () => {
    if (index_game !== componentData?.length - 1) {
      setIndex_game((previous) => previous + 1);
    }
  };

  const previous = () => {
    if (index_game != 0) {
      setIndex_game((previous) => previous - 1);
    }
  };

  if (loader) {
    return (
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  return (
    <div
      className="programInner-mainContainer"
      style={{
        width: `calc(100vw - ${75}px)`,
        height: `calc(100vh - ${57}px)`,
        marginTop: `${57}px`,
        marginRight: `${57}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="programInner-bodyContainer">
        <Box
          className="programInner-body"
          sx={{
            overflow: "auto",
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: "0.4em",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#cecece",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#888",
            },
          }}
          width={"100%"}
        >
          <div className="programInner-bodyInnerContair">
            <div className="programInner-separatorH" />

            {componentData?.[index_game]?.type == 1 ? (
              <ProgramInnerSlide1 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 2 ? (
              <ProgramInnerSlide2 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 3 ? (
              <ProgramInnerSlide3 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 4 ? (
              <ProgramInnerSlide4 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 5 ? (
              <ProgramInnerSlide5 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 6 ? (
              <ProgramInnerSlide6 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 7 ? (
              <ProgramInnerSlide7 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 8 ? (
              <ProgramInnerSlide8 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 9 ? (
              <ProgramInnerSlide9 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 10 ? (
              <ProgramInnerSlide10 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 11 ? (
              <ProgramInnerSlide11 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 12 ? (
              <ProgramInnerSlide12 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 13 ? (
              <ProgramInnerSlide13 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 14 ? (
              <ProgramInnerSlide14 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 15 ? (
              <ProgramInnerSlide15 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 16 ? (
              <ProgramInnerSlide16 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 17 ? (
              <ProgramInnerSlide17 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 18 ? (
              <ProgramInnerSlide18 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 19 ? (
              <ProgramInnerSlide19 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 20 ? (
              <ProgramInnerSlide5 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 21 ? (
              <ProgramInnerSlide21 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 22 ? (
              <ProgramInnerSlide22 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 23 ? (
              <ProgramInnerSlide23 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 24 ? (
              <ProgramInnerSlide24 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 25 ? (
              <ProgramInnerSlide25 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 26 ? (
              <ProgramInnerSlide26 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 27 ? (
              <ProgramInnerSlide27 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 28 ? (
              <ProgramInnerSlide28 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 29 ? (
              <ProgramInnerSlide29 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 30 ? (
              <ProgramInnerSlide30 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 31 ? (
              <ProgramInnerSlide31 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 32 ? (
              <ProgramInnerSlide32 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 33 ? (
              <ProgramInnerSlide33 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 34 ? (
              <ProgramInnerSlide34 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 35 ? (
              <ProgramInnerSlide35 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 36 ? (
              <ProgramInnerSlide36 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 37 ? (
              <ProgramInnerSlide37 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 38 ? (
              <ProgramInnerSlide38 data={componentData?.[index_game]} />
            ) : null}

            {componentData?.[index_game]?.type == 39 ? (
              <ProgramInnerSlide39 data={componentData?.[index_game]} />
            ) : null}

            <div className="programInner-separatorH" />
          </div>
        </Box>

          <div
            style={{
              justifyContent: "space-between",
              width: "60%",
              alignItems: "center",
              marginTop:componentData?.[index_game]?.type == 39?200:0
            }}
            className="flex items-center "
          >
            <div style={{ zIndex: 9999999999999999 }}>
              <Button
                onClick={() => next()}
                style={{
                  background: "#FFD400",
                  color: "#fff",
                  zIndex: 9999999999999999,
                }}
                className="font-semibold"
              >
                <Box sx={{ color: "secondary.main" }}></Box>
                {i18n.dir() == "rtl" ? (
                  <FuseSvgIcon className="text-48" size={30} color="#fff">
                    material-outline:chevron_right
                  </FuseSvgIcon>
                ) : (
                  <FuseSvgIcon className="text-48" size={30} color="#fff">
                    material-outline:chevron_left
                  </FuseSvgIcon>
                )}
              </Button>
            </div>

            <div style={{ zIndex: 9999999999999999 }}>
              <Button
                onClick={() => previous()}
                style={{
                  background: "#FFD400",
                  color: "#fff",
                  zIndex: 9999999999999999,
                }}
                className="font-semibold"
              >
                <Box sx={{ color: "secondary.main" }}></Box>

                {i18n.dir() == "rtl" ? (
                  <FuseSvgIcon className="text-48" size={30} color="#fff">
                    material-outline:chevron_left
                  </FuseSvgIcon>
                ) : (
                  <FuseSvgIcon className="text-48" size={30} color="#fff">
                    material-outline:chevron_right
                  </FuseSvgIcon>
                )}
              </Button>
            </div>
          </div>
       
      </div>
    </div>
  );
}

export default ProgramInnerScreen;
