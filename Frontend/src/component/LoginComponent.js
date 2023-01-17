import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  DialogActions,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Urls from "../Urls.js";

const options = ["Google", "Sign Up In In Progress"];

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Login With</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

const LoginComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const geturl = async () => {
    await fetch(Urls.getLoginUrl)
      .then(async (res) => {
        const data = await res.json();
        window.location.replace(data.redirectUrl);
      })
      .catch((err) => console.log(err));
  };

  const update = async () => {
    await axios
      .get(Urls.isLoggedIn, {
        withCredentials: true,
      })
      .then((res) => setIsLoggedIn(res.data.isLoggedIn));
  };

  const logout = async () => {
    await axios
      .get(Urls.logout, {
        withCredentials: true,
      })
      .then((res) => setIsLoggedIn(false));
  };

  useEffect(() => {
    update();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Dione");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);
    console.log(value);
    if (newValue) {
      setValue(newValue);
      geturl();
    }
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Button variant="contained" onClick={() => handleClick()}>
            Sign In
          </Button>
          <ConfirmationDialogRaw
            id="ringtone-menu"
            keepMounted
            open={open}
            onClose={handleClose}
            value={value}
          />
        </>
      ) : (
        <Button onClick={() => logout()}>Sign Out</Button>
      )}
    </>
  );
};

export default LoginComponent;
