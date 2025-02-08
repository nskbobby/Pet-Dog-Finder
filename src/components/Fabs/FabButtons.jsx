import React from "react";
import { Fab, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

function FabButtons({ handleFavouriteButtonClick }) {
  return (
    <>
      {/* Favorite Button */}
      <Tooltip title="Favorites" placement="top">
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleFavouriteButtonClick}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "rgba(218, 165, 32, 0.2)", // Semi-transparent goldenrod
            color: "secondary",
            boxShadow: "none",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              backgroundColor: "rgba(218, 165, 32, 0.4)",
              transform: "scale(1.20)",
              boxShadow: 4,
            },
          }}
        >
          <FavoriteIcon fontSize="large" color="error" />
        </Fab>
      </Tooltip>
    </>
  );
}

export default FabButtons;
