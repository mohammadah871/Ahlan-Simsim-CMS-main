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
            open={props?.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => props?.handleClose()}
            aria-describedby="alert-dialog-slide-description"
        >
            {props.title !== undefined && <DialogTitle>{props?.title}</DialogTitle>}
            <DialogContent>
                {props?.message}
            </DialogContent>
            {props.actions === true &&
                <DialogActions className="flex items-center justify-center">
                    <Button onClick={() => props?.handleClose()}>No</Button>
                    <Button onClick={() => props?.Confirm()}>Yes</Button>
                </DialogActions>
            }

        </Dialog>
    );
}

export default Popup;
