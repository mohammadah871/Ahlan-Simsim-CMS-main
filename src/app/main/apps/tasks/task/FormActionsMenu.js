import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { removeTask } from "../store/taskSlice";
import { useParams } from "react-router-dom";
import { getTasks } from "../store/tasksSlice";
import { baseUrl } from "./../../../../../constants/config";

import { forwardRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { selectUser } from "app/store/userSlice";
import { useSelector } from "react-redux";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FormActionsMenu(props) {
  const user = useSelector(selectUser);

  const { taskId } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const routeParams = useParams();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openPup, setOpen] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 1000);
  };

  function handleRemoveTask() {
    handleClose();
    setOpen(true);
  }

  function ConfirmDelete() {
    let newIdes = {
      id: taskId,
      programId: parseInt(routeParams.programId),
      sessionId: parseInt(routeParams.sessionId),
    };
    dispatch(removeTask(newIdes)).then(async () => {
      navigate(
        `${baseUrl}engines/${routeParams.programId}/${routeParams.sessionId}`
      );
      let newIdes = {
        programId: parseInt(routeParams.programId),
        sessionId: parseInt(routeParams.sessionId),
      };
      await dispatch(getTasks(newIdes));
    });
  }

  const active = () => {
    handleClose();
    props?.chnageStatus();
  };

  return (
    <div>
      <Dialog
        open={openPup}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Are you sure you want to delete ?`}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={() => ConfirmDelete()}>Yes</Button>
        </DialogActions>
      </Dialog>

      <IconButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {user?.role != "viewer" ? (
          <>
            <MenuItem onClick={handleRemoveTask}>
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </MenuItem>

            <MenuItem onClick={active}>
              <ListItemIcon className="min-w-40">
                {props?.status ? (
                  <FuseSvgIcon>heroicons-solid:lock-open</FuseSvgIcon>
                ) : (
                  <FuseSvgIcon>heroicons-solid:lock-closed</FuseSvgIcon>
                )}
              </ListItemIcon>
              <ListItemText primary={props?.status ? "Active" : "Disactive"} />
            </MenuItem>
          </>
        ) : null}
      </Menu>
    </div>
  );
}

export default FormActionsMenu;
