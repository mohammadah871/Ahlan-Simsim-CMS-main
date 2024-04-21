import React, { useState, useEffect } from "react";
import { orange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import FuseLoading from "@fuse/core/FuseLoading";
import history from "@history";
import { useParams } from "react-router-dom";
import _ from "@lodash";
import {
  CreateSession,
  GeteSessionList,
  DeleteeSession,
  UpdateeSession,
  GetProgramSingle,
  ReorderSession,
  DownloadProgram,
} from "../../../constants/Apis";
import Cards from "src/components/Cards_2";
import Popup from "src/components/popup";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { apiBaseUrlImage, baseUrl } from "src/constants/config";
import Button from "@mui/material/Button";
import i18n from "src/i18n";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import List from "@mui/material/List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { selectUser } from "app/store/userSlice";
import { useSelector ,useDispatch} from "react-redux";
import { showMessage } from "app/store/fuse/messageSlice";
const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
  },
  "& .FusePageSimple-toolbar": {},
  "& .FusePageSimple-content": {},
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
  "& .productImageFeaturedStar": {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
    display: "none",
  },

  "& .productImageUpload": {
    width: "100%",
    height: 199,
    background: "transparent",
  },

  "& .productImageItem": {
    "&:hover": {
      "& .productImageFeaturedStar": {
        background: "transparent",
      },
    },
    "&.featured": {},
  },
}));

function SessionsPage() {
  const user = useSelector(selectUser);
const dispatch=useDispatch()
  console.log("user==================", user?.displayName);

  const [counter, setCounter] = useState(null);
  const [showAdd, setShowadd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [getProgam, setGetProgam] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [programData, setProgramData] = useState(null);
  const [lengthData, setlengthData] = useState([]);
  const [edit, setEdit] = useState(false);

  const { id } = useParams();

  const [open2, setOpen2] = useState(false);

  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const adddCard = () => {
    if (showAdd == false) {
      setCounter(counter + 1);
      setShowadd(true);
    }
  };

  useEffect(() => {
    (async () => {
      await GetData();
      await GetSingleProgramData();
    })();
  }, []);

  const GetSingleProgramData = async () => {
    let apiData = await GetProgramSingle(id);
    console.log("apiData=", apiData);
    setProgramData(apiData);
  };
  const GetData = async () => {
    let apiData = await GeteSessionList(id);
    setCounter(apiData?.length);
    setlengthData(apiData?.length);
    setGetProgam([...apiData]);
    setShowadd(false);
    setLoading(false);
  };

  const Save = async (
    img_save,
    title_save,
    template,
    numberSession,
    tags,
    isTraining
  ) => {
    if (title_save == "") {
      handleClick2();
    } else {
      setLoading(true);
      await CreateSession(
        id,
        img_save,
        title_save,
        template,
        numberSession,
        tags,
        isTraining
      ).then(async () => {
        await GetData();
      });
    }
  };

  const Delete = async (id, title) => {
    setTitle(title);
    setDeleteId(id);
    setOpen(true);
  };

  const ConfirmDelete = async () => {
    if (user?.displayName == "Sarah alghazou") {
      handleClose();
      setLoading(true);
      await DeleteeSession(deleteId).then(async () => {
        await GetData();
      });
    } else {
      handleClose();
      setTimeout(() => {
        alert(
          "You are not allowed to delete a program, please ask the administrator"
        );
      }, 500);
    }
  };

  const Update = async (
    session_id,
    image,
    title,
    template,
    numberSession,
    tags,
    isTraining
  ) => {
    setLoading(true);
    await UpdateeSession(
      session_id,
      image,
      title,
      template,
      numberSession,
      tags,
      id,
      isTraining
    ).then(async () => {
      await GetData();
    });
  };

  const Go = (session_id) => {
    history.push({
      pathname: `${baseUrl}engines/${id}/${session_id}`,
    });
  };

  const RemoveCard = () => {
    setCounter(counter - 1);
    setShowadd(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    var temp = [...getProgam];

    var source = temp[result.source.index];

    var destination = result.destination.index;

    temp.splice(result.source.index, 1);

    temp.splice(destination, 0, source);

    setGetProgam([...temp]);

    ReorderSession({
      arr: [...temp],
      program_id: id,
    });
  }

  const SaveOffline = async (dataSend) => {
    let dataApi = await DownloadProgram(dataSend);
    let message = dataApi?.message;
    dispatch(showMessage({ message }));
  };

  return (
    <>
      <Snackbar
        style={{ marginTop: 120 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open2}
        autoHideDuration={3000}
        onClose={handleClose2}
      >
        <Alert
          onClose={handleClose2}
          severity="info"
          sx={{ width: "100%", background: "red" }}
        >
          <span>Title are required</span>
        </Alert>
      </Snackbar>

      <Root
        header={
          <div className="p-24 flex flex-row items-center justify-between flex-wrap gap-20">
            <div
              onClick={() => history.push(baseUrl + "programs")}
              className="flex flex-row items-center justify-center cursor-pointer"
            >
              {i18n.dir() == "rtl" ? (
                <FuseSvgIcon className="text-48" size={25} color="#555">
                  heroicons-solid:arrow-right
                </FuseSvgIcon>
              ) : (
                <FuseSvgIcon className="text-48" size={25} color="#555">
                  heroicons-solid:arrow-left
                </FuseSvgIcon>
              )}
              {programData != null ? (
                <div>
                  <img
                    style={{
                      width: 100,
                      objectFit: "contain",
                      borderRadius: 10,
                      marginLeft: 15,
                      marginRight: 15,
                    }}
                    src={apiBaseUrlImage + programData?.image}
                  />
                </div>
              ) : null}

              <div className="flex flex-col items-start justify-center cursor-pointer">
                <h1 style={{ marginLeft: 15 }}>{programData?.title}</h1>
                <h4 style={{ marginLeft: 15 }}>{lengthData} Sessions</h4>
              </div>
            </div>

            {loading ? null : user?.role != "viewer" ? (
              <div>
                <Button
                  className="mx-8 whitespace-nowrap"
                  variant="contained"
                  color={edit ? "primary" : "secondary"}
                  onClick={() => SaveOffline({
                    type: "program",
                    program_id: id,
                  })}
                >
                  <FuseSvgIcon size={20}>heroicons-solid:download</FuseSvgIcon>
                  <span className="mx-8">Save Offline</span>
                </Button>

                <Button
                  className="mx-8 whitespace-nowrap"
                  variant="contained"
                  color={edit ? "primary" : "secondary"}
                  onClick={() => setEdit(!edit)}
                >
                  <FuseSvgIcon size={20}>material-solid:edit_road</FuseSvgIcon>
                  <span className="mx-8">Reorder</span>
                </Button>

                <Button
                  className="mx-8 whitespace-nowrap"
                  variant="contained"
                  color="secondary"
                  onClick={() => adddCard()}
                >
                  <FuseSvgIcon size={20}>heroicons-outline:plus</FuseSvgIcon>
                  <span className="mx-8">Add Session</span>
                </Button>
              </div>
            ) : null}
          </div>
        }
        content={
          loading ? (
            <div className="flex items-center justify-center h-full w-full">
              <FuseLoading />
            </div>
          ) : (
            <div
              style={{ maxWidth: "100%", width: "100%", background: "#fff" }}
              className="p-24"
            >
              <br />

              <div
                style={{
                  rowGap: 50,
                  alignItems: "flex-start",
                  background: "#fff",
                }}
                className="flex flex-row items-center justify-start flex-wrap gap-20"
              >

                {showAdd ? (
                  <Cards
                    key={"create_session_" + counter}
                    id={"create_session_" + counter}
                    check={false}
                    data={null}
                    save={Save}
                    RemoveCard={RemoveCard}
                    edit={false}
                    user={user}
                  />
                ) : null}


                {getProgam.map((item, index) => {
                  return edit ? null : (
                    <Cards
                      key={index}
                      id={item.id}
                      check={true}
                      data={item}
                      delete={Delete}
                      update={Update}
                      Go={Go}
                      edit={edit}
                      user={user}
                      SaveOffline={SaveOffline}
                      program_id={id}
                    />
                  );
                })}



                {edit ? (
                  <List style={{ maxWidth: "100%", width: "100%" }} className="w-full m-0 p-0">
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable
                        droppableId="list"
                        type="list"
                        direction="vertical"
                      >
                        {(provided) => (
                          <>
                            <div ref={provided.innerRef}>

                              {getProgam?.map((item, index) => {
                                return (
                                  <Cards
                                    index={index}
                                    key={index}
                                    id={item.id}
                                    check={true}
                                    data={item}
                                    delete={Delete}
                                    update={Update}
                                    Go={Go}
                                    edit={edit}
                                    user={user}
                                  />
                                )
                              })}

                            </div>
                            {provided.placeholder}
                          </>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </List>
                ) : null}



              </div>

              <Popup
                open={open}
                ConfirmDelete={ConfirmDelete}
                handleClose={handleClose}
                title={title}
              />
              
            </div>
          )
        }
        scroll="content"
      />
    </>
  );
}

export default SessionsPage;
