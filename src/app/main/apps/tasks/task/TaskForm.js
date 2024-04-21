import Button from "@mui/material/Button";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import _ from "@lodash";
import Box from "@mui/system/Box";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import IconButton from "@mui/material/IconButton";
import FormActionsMenu from "./FormActionsMenu";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Componen_1 from "src/components/Engines/Componen_1";
import Componen_2 from "src/components/Engines/Componen_2";
import Componen_3 from "src/components/Engines/Componen_3";
import Componen_4 from "src/components/Engines/Componen_4";
import Componen_5 from "src/components/Engines/Componen_5";
import Componen_6 from "src/components/Engines/Componen_6";
import Componen_7 from "src/components/Engines/Componen_7";
import Componen_8 from "src/components/Engines/Componen_8";
import Componen_9 from "src/components/Engines/Componen_9";
import Componen_10 from "src/components/Engines/Componen_10";
import Componen_11 from "src/components/Engines/Componen_11";
import Componen_12 from "src/components/Engines/Componen_12";
import Componen_13 from "src/components/Engines/Componen_13";
import Componen_14 from "src/components/Engines/Componen_14";
import Componen_15 from "src/components/Engines/Componen_15";
import Componen_16 from "src/components/Engines/Componen_16";
import Componen_17 from "src/components/Engines/Componen_17";
import Componen_18 from "src/components/Engines/Componen_18";
import Componen_19 from "src/components/Engines/Componen_19";
import Componen_20 from "src/components/Engines/Componen_20";
import Componen_21 from "src/components/Engines/Componen_21";
import Componen_22 from "src/components/Engines/Componen_22";
import Componen_23 from "src/components/Engines/Componen_23";
import Componen_24 from "src/components/Engines/Componen_24";
import Componen_25 from "src/components/Engines/Componen_25";
import Componen_26 from "src/components/Engines/Componen_26";
import Componen_27 from "src/components/Engines/Componen_27";
import Componen_28 from "src/components/Engines/Componen_28";
import Componen_29 from "src/components/Engines/Componen_29";
import Componen_30 from "src/components/Engines/Componen_30";
import Componen_31 from "src/components/Engines/Componen_31";
import Componen_32 from "src/components/Engines/Componen_32";
import Componen_33 from "src/components/Engines/Componen_33";
import Componen_34 from "src/components/Engines/Componen_34";
import Componen_35 from "src/components/Engines/Componen_35";
import Componen_36 from "src/components/Engines/Componen_36";
import Componen_37 from "src/components/Engines/Componen_37";
import Componen_38 from "src/components/Engines/Componen_38";
import Componen_39 from "src/components/Engines/Componen_39";

import Capture_1 from "src/CustomImage/Capture_1.PNG";
import Capture_2 from "src/CustomImage/Capture_2.PNG";
import Capture_3 from "src/CustomImage/Capture_3.PNG";
import Capture_4 from "src/CustomImage/Capture_4.PNG";
import Capture_5 from "src/CustomImage/Capture_5.PNG";
import Capture_6 from "src/CustomImage/Capture_6.PNG";
import Capture_7 from "src/CustomImage/Capture_7.PNG";
import Capture_8 from "src/CustomImage/Capture_8.PNG";
import Capture_9 from "src/CustomImage/Capture_9.PNG";
import Capture_10 from "src/CustomImage/Capture_10.PNG";
import Capture_11 from "src/CustomImage/Capture_11.png";
import Capture_12 from "src/CustomImage/Capture_12.PNG";
import Capture_13 from "src/CustomImage/Capture_13.PNG";
import Capture_14 from "src/CustomImage/Capture_14.PNG";
import Capture_15 from "src/CustomImage/Capture_15.PNG";
import Capture_16 from "src/CustomImage/Capture_16.PNG";
import Capture_17 from "src/CustomImage/Capture_17.PNG";
import Capture_18 from "src/CustomImage/Capture_18.PNG";
import Capture_19 from "src/CustomImage/Capture_19.PNG";
import Capture_20 from "src/CustomImage/Capture_20.PNG";
import Capture_21 from "src/CustomImage/Capture_21.PNG";
import Capture_22 from "src/CustomImage/Capture_22.PNG";
import Capture_23 from "src/CustomImage/Capture_23.PNG";
import Capture_24 from "src/CustomImage/Capture_24.PNG";
import Capture_25 from "src/CustomImage/Capture_25.PNG";
import Capture_26 from "src/CustomImage/Capture_26.PNG";
import Capture_27 from "src/CustomImage/Capture_27.PNG";
import Capture_28 from "src/CustomImage/Capture_28.PNG";
import Capture_29 from "src/CustomImage/Capture_29.PNG";
import Capture_30 from "src/CustomImage/Capture_30.PNG";
import Capture_31 from "src/CustomImage/Capture_31.PNG";
import Capture_32 from "src/CustomImage/Capture_32.PNG";
import Capture_33 from "src/CustomImage/Capture_33.PNG";
import Capture_34 from "src/CustomImage/Capture_34.PNG";
import Capture_35 from "src/CustomImage/Capture_35.PNG";
import Capture_36 from "src/CustomImage/Capture_36.PNG";
import Capture_37 from "src/CustomImage/Capture_37.PNG";
import Capture_38 from "src/CustomImage/Capture_38.PNG";

import { CreateEngin, CreateFileManagerForLinks } from "src/constants/Apis";
import { getTask, saveUrls } from "../store/taskSlice";
import { useDispatch } from "react-redux";
import history from "@history";
import { getTasks, getTasksdatiles } from "../store/tasksSlice";
import { baseUrl } from "./../../../../../constants/config";


import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";

function TaskForm() {
  const user = useSelector(selectUser);


  const [chooseEngin, setChooseEngin] = useState(null);
  const [setDataFromApi, setSetDataFromApi] = useState(null);
  const [status, setStatus] = useState(true);
  const divRef = useRef(null);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const [Engines, setEngines] = useState([]);
  const ref_1 = useRef();

  const onSubmit = () => {
    ref_1.current.SaveComponent();
  };

  const saveData = async (resData) => {
    let sendData = {
      data: resData,
      programId: parseInt(routeParams.programId),
      sessionId: parseInt(routeParams.sessionId),
    };
    await CreateEngin(sendData);
    let newIdes = {
      programId: parseInt(routeParams.programId),
      sessionId: parseInt(routeParams.sessionId),
    };
    await dispatch(getTasks(newIdes));
    history.push(
      `${baseUrl}engines/${routeParams.programId}/${routeParams.sessionId}`
    );
  };

  useEffect(() => {
    if (routeParams.id !== "new") {
      GetSingleData();
    } else {
      setSetDataFromApi(null);
      setChooseEngin(null);
      setStatus(true);
    }
    getDatiles();
  }, [routeParams, dispatch]);

  const GetSingleData = async () => {
    let newIdes = {
      id: routeParams.id,
      programId: parseInt(routeParams.programId),
      sessionId: parseInt(routeParams.sessionId),
    };
    let dataApi = await dispatch(getTask(newIdes));
    setSetDataFromApi(dataApi?.payload);
    setChooseEngin(dataApi?.payload?.type);
    setStatus(dataApi?.payload?.status);
  };

  const chnageStatus = () => {
    setStatus(!status);
  };

  const scrollToTop = () => {
    // divRef.current.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    // });
  };

  const getDatiles = async () => {
    let newIdes = {
      programId: parseInt(routeParams.programId),
      sessionId: parseInt(routeParams.sessionId),
    };

    let datiles = await dispatch(getTasksdatiles(newIdes));

    switch (datiles?.payload?.session?.template) {
      case 1:
        setEngines([
          {
            id: 1,
            value: "المقدمه",
          },

          {
            id: 2,
            value: "الجدول الزّمنيّ وتفاصيل الجلسة",
          },

          {
            id: 3,
            value: "قائمة الموادّ",
          },

          {
            id: 4,
            value: "الترحيب والتقديم",
          },

          {
            id: 5,
            value: "النشاط",
          },

          {
            id: 6,
            value: "إجراء النشاط",
          },

          {
            id: 7,
            value: "بعد الجلسة",
          },

          {
            id: 21,
            value: "ختام الجلسة",
          },
        ]);

        break;

      case 2:
        setEngines([
          {
            id: 8,
            value: "خطة المكالمة",
          },

          {
            id: 9,
            value:
              "عند الانتهاء من هذه الجلسة يتوقع من مقدم الرعاية أن يتعرف إلى",
          },
          {
            id: 10,
            value:
              "النتاجات التعليمية المتوقعة من الطفل بعد الانتهاء من الجلسة",
          },
          {
            id: 11,
            value: "المحادثة",
          },
        ]);

        break;

      case 3:
        setEngines([
          {
            id: 12,
            value: "المقدمه",
          },
          {
            id: 2,
            value: "الجدول الزّمنيّ وتفاصيل الجلسة",
          },
          {
            id: 13,
            value: "المحادثة",
          },
          {
            id: 20,
            value: "النشاط",
          },
          {
            id: 14,
            value: "بعد الجلسة",
          },
        ]);

        break;

      case 4:
        setEngines([
          {
            id: 15,
            value: "المقدمه",
          },
          {
            id: 16,
            value: "مستلزمات النشاط",
          },
          {
            id: 17,
            value: "النشاط",
          },
          {
            id: 18,
            value: "تكييف النشاط للفئات العمرية المختلفة",
          },
          {
            id: 19,
            value:
              "الإعاقات التي يمكن دمجها و طريقة تكييف النشاط لدمج الأطفال ذوي الإعاقة :",
          },
        ]);

        break;

      case 5:
        setEngines([
          {
            id: 22,
            value: "المقدمه",
          },
          {
            id: 23,
            value: "مستلزمات النشاط",
          },
          {
            id: 24,
            value: "خطوات تقديم النشاط",
          },
        ]);

        break;

      case 6:
        setEngines([
          {
            id: 25,
            value: "المقدمه",
          },

          {
            id: 26,
            value: "مستلزمات النشاط",
          },

          {
            id: 27,
            value: "التهيئة للنشاط",
          },

          {
            id: 28,
            value: "التّقديم للنشاط",
          },

          {
            id: 29,
            value: "النشاط الرئيسي",
          },

          {
            id: 30,
            value: "تكييف النشاط لدمج التلاميذ ذوي الإعاقة",
          },
          {
            id: 31,
            value: "بعد الجلسة",
          },
        ]);

        break;

      case 7:
        setEngines([
          {
            id: 32,
            value: "المقدمه",
          },

          {
            id: 26,
            value: "مستلزمات النشاط",
          },

          {
            id: 35,
            value: "التّقديم للنشاط",
          },

          {
            id: 33,
            value: "ملاحظات للميسر",
          },
        ]);
        break;

      case 8:
        setEngines([
          {
            id: 34,
            value: "المقدمه",
          },

          {
            id: 26,
            value: "مستلزمات النشاط",
          },

          {
            id: 36,
            value: "التّقديم للنشاط",
          },

          {
            id: 37,
            value: "تكييف النشاط للفئات العمرية المختلفة",
          },

          {
            id: 38,
            value:
              "الإعاقات التي يمكن دمجها و طريقة تكييف النشاط لدمج الأطفال ذوي الإعاقة :",
          },
        ]);
        break;

      case 9:
        setEngines([
          {
            id: 39,
            value: "Upload PDF",
          },
        ]);
        break;
    }
  };

  const saveUrl = async (resData) => {
    let sendData = {
      data: resData,
      programId: parseInt(routeParams.programId),
    };
    // await dispatch(saveUrls(sendData));
  };


  const saveLinks = async (resData) => {
    let sendData = {
      data: resData,
      programId: parseInt(routeParams.programId),
    };
    await CreateFileManagerForLinks(sendData);
  };



  
  

  return (
    <>
      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
        <div className="flex items-center justify-between border-b-1 w-full py-24 mt-16 mb-32">
          {routeParams.id === "new" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "85%",
              }}
            >
              {chooseEngin != null ? (
                <div>
                  <img
                    style={{ width: "70%", marginBottom: 25 }}
                    src={
                      chooseEngin == 1
                        ? Capture_1
                        : chooseEngin == 2
                        ? Capture_2
                        : chooseEngin == 3
                        ? Capture_3
                        : chooseEngin == 4
                        ? Capture_4
                        : chooseEngin == 5
                        ? Capture_5
                        : chooseEngin == 6
                        ? Capture_6
                        : chooseEngin == 7
                        ? Capture_7
                        : chooseEngin == 8
                        ? Capture_8
                        : chooseEngin == 9
                        ? Capture_9
                        : chooseEngin == 10
                        ? Capture_10
                        : chooseEngin == 11
                        ? Capture_11
                        : chooseEngin == 12
                        ? Capture_12
                        : chooseEngin == 13
                        ? Capture_13
                        : chooseEngin == 14
                        ? Capture_14
                        : chooseEngin == 15
                        ? Capture_15
                        : chooseEngin == 16
                        ? Capture_16
                        : chooseEngin == 17
                        ? Capture_17
                        : chooseEngin == 18
                        ? Capture_18
                        : chooseEngin == 19
                        ? Capture_19
                        : chooseEngin == 20
                        ? Capture_20
                        : chooseEngin == 21
                        ? Capture_21
                        : chooseEngin == 22
                        ? Capture_22
                        : chooseEngin == 23
                        ? Capture_23
                        : chooseEngin == 24
                        ? Capture_24
                        : chooseEngin == 25
                        ? Capture_25
                        : chooseEngin == 26
                        ? Capture_26
                        : chooseEngin == 27
                        ? Capture_27
                        : chooseEngin == 28
                        ? Capture_28
                        : chooseEngin == 29
                        ? Capture_29
                        : chooseEngin == 30
                        ? Capture_30
                        : chooseEngin == 31
                        ? Capture_31
                        : chooseEngin == 32
                        ? Capture_32
                        : chooseEngin == 33
                        ? Capture_33
                        : chooseEngin == 34
                        ? Capture_34
                        : chooseEngin == 35
                        ? Capture_35
                        : chooseEngin == 36
                        ? Capture_36
                        : chooseEngin == 37
                        ? Capture_37
                        : chooseEngin == 38
                        ? Capture_38
                        : null
                    }
                  />
                </div>
              ) : null}

              <FormControl fullWidth sx={{ m: 2, gap: 2 }}>
                <InputLabel
                  style={{ fontFamily: "Medium", fontSize: 14 }}
                  id="demo-simple-select-label"
                >
                  الأنشطة
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="engines"
                  value={chooseEngin}
                  label="الأنشطة"
                  onChange={(e) => {
                    setChooseEngin(e.target.value);
                  }}
                  required
                  className="font-custom2"
                >
                  {Engines.map((item) => (
                    <MenuItem
                      className="font-custom2"
                      value={item.id}
                      key={item.id}
                    >
                      {item.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          ) : (
            <div>
              <img
                style={{ width: "70%", marginBottom: 20 }}
                src={
                  chooseEngin == 1
                    ? Capture_1
                    : chooseEngin == 2
                    ? Capture_2
                    : chooseEngin == 3
                    ? Capture_3
                    : chooseEngin == 4
                    ? Capture_4
                    : chooseEngin == 5
                    ? Capture_5
                    : chooseEngin == 6
                    ? Capture_6
                    : chooseEngin == 7
                    ? Capture_7
                    : chooseEngin == 8
                    ? Capture_8
                    : chooseEngin == 9
                    ? Capture_9
                    : chooseEngin == 10
                    ? Capture_10
                    : chooseEngin == 11
                    ? Capture_11
                    : chooseEngin == 12
                    ? Capture_12
                    : chooseEngin == 13
                    ? Capture_13
                    : chooseEngin == 14
                    ? Capture_14
                    : chooseEngin == 15
                    ? Capture_15
                    : chooseEngin == 16
                    ? Capture_16
                    : chooseEngin == 17
                    ? Capture_17
                    : chooseEngin == 18
                    ? Capture_18
                    : chooseEngin == 19
                    ? Capture_19
                    : chooseEngin == 20
                    ? Capture_20
                    : chooseEngin == 21
                    ? Capture_21
                    : chooseEngin == 22
                    ? Capture_22
                    : chooseEngin == 23
                    ? Capture_23
                    : chooseEngin == 24
                    ? Capture_24
                    : chooseEngin == 25
                    ? Capture_25
                    : chooseEngin == 26
                    ? Capture_26
                    : chooseEngin == 27
                    ? Capture_27
                    : chooseEngin == 28
                    ? Capture_28
                    : chooseEngin == 29
                    ? Capture_29
                    : chooseEngin == 30
                    ? Capture_30
                    : chooseEngin == 31
                    ? Capture_31
                    : chooseEngin == 32
                    ? Capture_32
                    : chooseEngin == 33
                    ? Capture_33
                    : chooseEngin == 34
                    ? Capture_34
                    : chooseEngin == 35
                    ? Capture_35
                    : chooseEngin == 36
                    ? Capture_36
                    : chooseEngin == 37
                    ? Capture_37
                    : chooseEngin == 38
                    ? Capture_38
                    : null
                }
              />

              <span
                style={{ fontWeight: "bolder", width: "100%" }}
                className="mx-8"
              >
                {setDataFromApi?.title}
              </span>
            </div>
          )}

          <div className="flex items-center">
            {routeParams.id !== "new" && (
              <FormActionsMenu
                taskId={routeParams.id}
                chnageStatus={chnageStatus}
                status={status}
              />
            )}
            <IconButton
              className=""
              component={NavLinkAdapter}
              to={`${baseUrl}engines/${routeParams.programId}/${routeParams.sessionId}`}
              size="large"
            >
              <FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
            </IconButton>
          </div>
        </div>

        {chooseEngin == 1 ? (
          <Componen_1
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
          />
        ) : null}

        {chooseEngin == 2 ? (
          <Componen_2
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
          />
        ) : null}

        {chooseEngin == 3 ? (
          <Componen_3
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 4 ? (
          <Componen_4
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 5 ? (
          <Componen_5
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}

          />
        ) : null}

        {chooseEngin == 6 ? (
          <Componen_6
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 7 ? (
          <Componen_7
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 8 ? (
          <Componen_8
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 9 ? (
          <Componen_9
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 10 ? (
          <Componen_10
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 11 ? (
          <Componen_11
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 12 ? (
          <Componen_12
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 13 ? (
          <Componen_13
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 14 ? (
          <Componen_14
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 15 ? (
          <Componen_15
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 16 ? (
          <Componen_16
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 17 ? (
          <Componen_17
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 18 ? (
          <Componen_18
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 19 ? (
          <Componen_19
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 20 ? (
          <Componen_20
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 21 ? (
          <Componen_21
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 22 ? (
          <Componen_22
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 23 ? (
          <Componen_23
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 24 ? (
          <Componen_24
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 25 ? (
          <Componen_25
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 26 ? (
          <Componen_26
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 27 ? (
          <Componen_27
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 28 ? (
          <Componen_28
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 29 ? (
          <Componen_29
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 30 ? (
          <Componen_30
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 31 ? (
          <Componen_31
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 32 ? (
          <Componen_32
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 33 ? (
          <Componen_33
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 34 ? (
          <Componen_34
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 35 ? (
          <Componen_35
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 36 ? (
          <Componen_36
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 37 ? (
          <Componen_37
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 38 ? (
          <Componen_38
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}

        {chooseEngin == 39 ? (
          <Componen_39
            ref={ref_1}
            check={routeParams.id === "new"}
            getData={setDataFromApi}
            setData={saveData}
            status={status}
            scrollToTop={scrollToTop}
            divRef={divRef}
            saveUrl={saveUrl}
            saveLinks={saveLinks}
          />
        ) : null}
        
      </div>

      {chooseEngin != null ? (
        <Box
          className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
          sx={{ backgroundColor: "background.default" }}
        >
          <Button
            className="ml-auto"
            onClick={() =>
              history.push(
                `${baseUrl}engines/${routeParams.programId}/${routeParams.sessionId}`
              )
            }
          >
            Cancel
          </Button>
          {user?.role != "viewer" ? 
          <Button
            className="ml-8"
            variant="contained"
            color="secondary"
            disabled={false}
            onClick={() => onSubmit()}
          >
            {routeParams.id === "new" ? "Create" : "Update"}
          </Button>:null}
        </Box>
      ) : null}
    </>
  );
}

export default TaskForm;
