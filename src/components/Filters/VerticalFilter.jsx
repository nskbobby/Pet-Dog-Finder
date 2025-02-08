import React, { useState, useEffect } from "react";
import { Box, IconButton, Paper, Typography, Tooltip } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FilterMenu from "./FilterMenu";

function VerticalFilter({
  onFilterChange,
  onHomeButtonClick,
  updateHandleLogout,
  resetFilters,
}) {
  const navigate = useNavigate();
  const [breeds, setBreeds] = useState([]);
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [breedsOptions, setBreedsOptions] = useState([]);
  const [sortBy, setSortBy] = useState("breed:asc");

  // Fetch breeds on component mount
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const res = await axios.get(
          "https://frontend-take-home-service.fetch.com/dogs/breeds",
          { withCredentials: true }
        );
        setBreedsOptions(res.data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };
    fetchBreeds();
  }, []);

  // Handle applying filters
  const handleApplyFilters = () => {
    const filters = {
      breeds: breeds,
      ageMin: ageMin ? Number(ageMin) : undefined,
      ageMax: ageMax ? Number(ageMax) : undefined,
      sort: sortBy,
    };
    onFilterChange(filters);
    handleClose();
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setBreeds([]);
    setAgeMin("");
    setAgeMax("");
    setSortBy("");
    resetFilters();
  };

  // Open/Close menu handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle Home button click
  const handleHomeButtonClick = () => {
    onHomeButtonClick();
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        null,
        { withCredentials: true }
      );
      if (response.status === 200) {
        updateHandleLogout();
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Box className="d-flex flex-row align-items-end">
      {/* Filter Button */}
      <IconButton onClick={handleClick} color="primary">
        <FilterAltIcon fontSize="medium" />
        <Paper
          elevation={0}
          sx={{
            display: { xs: "none", sm: "block" },
            backgroundColor: "transparent",
          }}
        >
          <Typography
            color="primary"
            ml="2px"
            fontSize="20px"
            sx={{
              "&:hover": { color: "white" },
            }}
          >
            Filter
          </Typography>
        </Paper>
      </IconButton>

      {/* Filter Menu */}
      <FilterMenu
        anchorEl={anchorEl}
        onClose={handleClose}
        breedsOptions={breedsOptions}
        breeds={breeds}
        setBreeds={setBreeds}
        ageMin={ageMin}
        setAgeMin={setAgeMin}
        ageMax={ageMax}
        setAgeMax={setAgeMax}
        sortBy={sortBy}
        setSortBy={setSortBy}
        handleApplyFilters={handleApplyFilters}
        handleResetFilters={handleResetFilters}
      />

      {/* Home Button */}
      <IconButton onClick={handleHomeButtonClick} color="primary">
        <HomeIcon sx={{ fontSize: 25 }} />
        <Paper
          elevation={0}
          sx={{
            display: { xs: "none", sm: "block" },
            backgroundColor: "transparent",
          }}
        >
          <Typography
            color="primary"
            ml="2px"
            fontSize="20px"
            sx={{ "&:hover": { color: "white" } }}
          >
            Home
          </Typography>
        </Paper>
      </IconButton>

      {/* Logout Button */}
      <Tooltip title="Log Out" placement="top">
        <IconButton
          color="primary"
          onClick={handleLogout}
          sx={{ fontSize: 20, ml: "auto" }}
        >
          <LogoutIcon fontSize="small" />
          <Paper
            elevation={0}
            sx={{
              display: { xs: "none", sm: "block" },
              backgroundColor: "transparent",
            }}
          >
            <Typography
              color="primary"
              ml="2px"
              fontSize="15px"
              sx={{ "&:hover": { color: "white" } }}
            >Log out</Typography>
          </Paper>
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default VerticalFilter;
