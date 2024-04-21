import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { IconButton } from "@mui/material";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import format from "date-fns/format";
import Typography from "@mui/material/Typography";
import { Draggable } from "react-beautiful-dnd";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import history from "@history";
import { forwardRef, useState } from "react";
import ProgramInnerScreen from "src/components/Frontend_Engines/ProgramInnerScreen";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { baseUrl } from "src/constants/config";
import i18n from "src/i18n";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";

function TaskListItem(props) {
  
  const { data, index, disabled } = props;
  const routeParams = useParams();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [check, setCheck] = useState(null);

  const Go = () => {
    history.push(
      `${baseUrl}engines/${routeParams.programId}/${routeParams.sessionId}/${data.id}`
    );
  };

  const Go2 = () => {
    if (check == true) {
      handleClickOpen();
    }else{
      setOpen2(true);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
    setTimeout(() => {
      history.push(`${baseUrl}engines/${routeParams.programId}/${routeParams.sessionId}`);
      setOpen2(false);
    }, 500);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

useEffect(()=>{
if(routeParams?.id==undefined){
  setCheck(true);
}else{
  setCheck(false);
}
},[routeParams])

  return (
    <>
      <Dialog
        open={open2}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose2()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Are you sure you want to close?`}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleClose2()}>No</Button>
          <Button onClick={() => handleClickOpen()}>Yes</Button>
        </DialogActions>
      </Dialog>

      <Draggable
        isDragDisabled={disabled}
        draggableId={JSON.stringify(data.id)}
        index={index}
        type="list"
      >

        {(provided, snapshot) => (
          <>
            <ListItem
              style={{ zIndex: -1 }}
              onClick={() => Go()}
              className={clsx(
                snapshot.isDragging ? "shadow-lg" : "shadow",
                "px-40 py-12 group"
              )}
              sx={{ bgcolor: "background.paper" }}
              button
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <div
                className=
                {
                  i18n.dir() == "rtl" ?
                  "md:hidden absolute flex items-center justify-center inset-y-0 right-0 w-32 cursor-move md:group-hover:flex"
                  :
                  "md:hidden absolute flex items-center justify-center inset-y-0 left-0 w-32 cursor-move md:group-hover:flex"
                }

                {...provided.dragHandleProps}
              >
                <FuseSvgIcon sx={{ color: "text.disabled" }} size={20}>
                  heroicons-solid:menu
                </FuseSvgIcon>
              </div>
              <ListItemIcon className="min-w-40 -ml-10 mr-8">
                <IconButton
                  sx={{
                    color: data?.status ? "secondary.main" : "text.disabled",
                  }}
                >
                  <FuseSvgIcon>heroicons-outline:check-circle</FuseSvgIcon>
                </IconButton>
              </ListItemIcon>
              <ListItemText
                classes={{ root: "m-0 font-custom", primary: "truncate font-custom" }}
                style={{ paddingLeft: 15, paddingRight: 15  }}
                primary={data?.title}
              />
              <div
                style={{ zIndex: 1 }}
                className="flex items-center"
              >
                <div onClick={() => Go2()} style={{ zIndex: 1 }}>
                  <Button
                    style={{
                      background: "#fff",
                      color: "#000",
                      marginRight: 25,
                      marginLeft: 15,
                      zIndex: 1,
                    }}
                    className="font-semibold"
                  >
                    <Box sx={{ color: "secondary.main" }}></Box>

                    <FuseSvgIcon className="text-48" size={24} color="action">
                      heroicons-solid:eye
                    </FuseSvgIcon>
                  </Button>
                </div>

                <div onClick={() => Go()} style={{ zIndex: 1 }}>
                  <Button
                    style={{
                      background: "#fff",
                      color: "#4f46e5",
                      marginRight: 100,
                      marginLeft: 15,
                      zIndex: 1,
                    }}
                    className="font-semibold"
                  >
                    <Box sx={{ color: "secondary.main" }}></Box>
                    <FuseSvgIcon className="text-48" size={24} color="action">
                      material-solid:edit_road
                    </FuseSvgIcon>
                  </Button>
                </div>

                {data.date && (
                  <Typography
                    className="text-12 whitespace-nowrap"
                    color="text.secondary"
                  >
                    {format(new Date(data.date), "LLL dd hh:mm a")}
                  </Typography>
                )}
              </div>
            </ListItem>
            <Divider />
          </>
        )}
      </Draggable>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullScreen
      >
        <DialogContent
          style={{
            position: "relative",
            maxWidth: "100%",
            overflowX: "hidden",
          }}
        >
          <div
            onClick={() => handleClose()}
            style={{
              position: "absolute",
              top: "5%",
              right: "10%",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            <FuseSvgIcon className="text-48" size={40} color="action">
              heroicons-solid:x
            </FuseSvgIcon>
          </div>

          <ProgramInnerScreen
            programId={routeParams.programId}
            sessionId={routeParams.sessionId}
            id={data.id}
          />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}

export default TaskListItem;
