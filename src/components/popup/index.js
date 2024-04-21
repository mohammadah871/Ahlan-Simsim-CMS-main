import React, { forwardRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Popup(props) {


  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => props?.handleClose()}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{`Are you sure you want to delete ${props?.title}?`}</DialogTitle>
      <DialogContent>
        {"This action can’t be undone"}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props?.handleClose()}>No</Button>
        <Button onClick={() => props?.ConfirmDelete()}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Popup;
