import React from "react";
import { Fab, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BackFab({ handleButtonClick }) {
  return (
    <>
      {/* Favorite Button */}
      <Tooltip title="Go Back" placement="top">
        <Fab
          color="primary"
          aria-label="add"
          size="large"
          onClick={handleButtonClick}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "rgba(218, 165, 32, 0.2)", // Semi-transparent goldenrod
            color: "white",
            boxShadow: "none",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              backgroundColor: "rgba(218, 165, 32, 0.4)",
              transform: "scale(1.20)",
              boxShadow: 4,
            },
          }}
        >
          <ArrowBackIcon fontSize="large" />
        </Fab>
      </Tooltip>
    </>
  );
}

export default BackFab;
