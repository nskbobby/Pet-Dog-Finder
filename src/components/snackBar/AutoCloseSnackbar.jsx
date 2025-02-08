import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const AutoCloseSnackbar = ({ alertMessage, duration = 3000 }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false); // This hides the Snackbar
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="info" onClose={handleClose}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default AutoCloseSnackbar;
