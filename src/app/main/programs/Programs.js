import React, { useState, useEffect } from "react";
import { orange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import FuseLoading from "@fuse/core/FuseLoading";
import _ from "@lodash";
import {
  CreateProgram,
  GetProgramList,
  DeleteProgram,
  UpdateProgram,
  getAllProgram,
  ReorderProgram,
} from "../../../constants/Apis";
import Cards from "src/components/Cards";
import Popup from "src/components/popup";
import history from "@history";
import Button from "@mui/material/Button";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { baseUrl } from "src/constants/config";

import List from "@mui/material/List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";

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
    height: 194,
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

function ProgramsPage() {
  const user = useSelector(selectUser);

  const [counter, setCounter] = useState(null);

  const [showAdd, setShowadd] = useState(false);

  const [loading, setLoading] = useState(true);

  const [getProgam, setGetProgam] = useState([]);

  const [deleteId, setDeleteId] = useState(null);

  const [title, setTitle] = useState(null);

  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  const [edit, setEdit] = useState(false);

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
    setEdit(false);
    if (showAdd == false) {
      setCounter(counter + 1);
      setShowadd(true);
    }
  };

  useEffect(() => {
    (async () => {
      await GetData();
    })();
  }, []);

  const GetData = async () => {
    let apiData = await GetProgramList();
    setCounter(apiData?.length);
    setGetProgam([...apiData]);
    setShowadd(false);
    setLoading(false);
  };

  const Save = async (
    img_save,
    title_save,
    country_id,
    chooseClass,
    target_audience,
    color,
    tags,
    current_progarm,
    category
  ) => {
    if (title_save == "" || country_id == "") {
      handleClick2();
    } else {
      setLoading(true);
      await CreateProgram(
        img_save,
        title_save,
        country_id,
        chooseClass,
        target_audience,
        color,
        tags,
        current_progarm,
        category
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
      await DeleteProgram(deleteId).then(async () => {
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
    id,
    image,
    title,
    country_id,
    chooseClass,
    target_audience,
    color,
    tags,
    current_progarm,
    category
  ) => {
    setLoading(true);
    await UpdateProgram(
      id,
      image,
      title,
      country_id,
      chooseClass,
      target_audience,
      color,
      tags,
      current_progarm,
      category
    ).then(async () => {
      await GetData();
    });
  };

  const Go = (id) => {
    history.push({
      pathname: `${baseUrl}programs/${id}`,
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

    ReorderProgram({
      arr: [...temp],
    });
  }

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
        <Alert onClose={handleClose2} severity="info" sx={{ width: "100%" }}>
          <span>Title and country are required</span>
        </Alert>
      </Snackbar>

      <Root
        header={
          <div className="p-24 flex flex-row items-center justify-between flex-wrap gap-20">
            <h1>Programs</h1>
            {loading ? null : (
user?.role != "viewer" ?
              <div>
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
                  <span className="mx-8">Add Program</span>
                </Button>
              </div>:null

            )}
          </div>
        }
        content={
          loading ? (
            <div
              style={{ background: "#fff" }}
              className="flex items-center justify-center h-full w-full"
            >
              <FuseLoading />
            </div>
          ) : (
            <div
              style={{ maxWidth: "100%", width: "100%", background: "#fff" }}
              className="p-24">
              <br />

              <div
                style={{
                  rowGap: 50,
                  alignItems: "flex-start",
                  background: "#fff",
                }}
                className="flex flex-row items-center justify-start flex-wrap gap-20">
                {showAdd ? (
                  <Cards
                    key={"create_card_" + counter}
                    id={"create_card_" + counter}
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
                    />
                  );
                })}

                {edit ? (
                  <List
                    style={{ maxWidth: "100%", width: "100%" }}
                    className="w-full m-0 p-0"
                  >
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
                                );
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

export default ProgramsPage;
