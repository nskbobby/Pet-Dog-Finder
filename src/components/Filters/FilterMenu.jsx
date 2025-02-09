import React from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function FilterMenu({
  anchorEl,
  onClose,
  breedsOptions,
  breeds,
  setBreeds,
  ageMin,
  setAgeMin,
  ageMax,
  setAgeMax,
  sortBy,
  setSortBy,
  handleApplyFilters,
  handleResetFilters,
}) {
  //Filter menu component: functionalities: sortBy: Breed, Max Age, MinAge, Breed:Asc & Breed: Desc
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      sx={{ width: { xs: "auto", md: "400px" } }}
      PaperProps={{
        sx: { padding: "3%" },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          sx={{ color: "black", marginLeft: "auto" }}
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      {/* Breeds Multi-Select option */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="breeds-label">Breeds</InputLabel>
        <Select
          labelId="breeds-label"
          id="breeds-select"
          multiple
          value={breeds}
          onChange={(e) => setBreeds(e.target.value)}
          input={<OutlinedInput label="Breeds" />}
        >
          {breedsOptions.map((breed) => (
            <MenuItem key={breed} value={breed}>
              {breed}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Minimum Age */}
      <TextField
        label="Min Age"
        type="text"
        fullWidth
        sx={{ mb: 2 }}
        value={ageMin}
        onChange={(e) => {
          if((e.target.value)!== ''){
          const val = parseInt(e.target.value);
          if (val < 380) {
            setAgeMin(val);
          }
        }else{
          setAgeMin('');
        }
        }}
      />
      {/* Maximum Age */}
      <TextField
        label="Max Age"
        type="text"
        fullWidth
        sx={{ mb: 2 }}
        value={ageMax}
        onChange={(e) => {
          if((e.target.value)!== ''){
          const val = parseInt(e.target.value);
          if (val < 380) {
            if(ageMin){
              if(val>ageMin){
                setAgeMax(val)
              }else{
                setAgeMax(ageMin+1);
              }
            }else{
            setAgeMax(val);
          }
          }
        }else{
          setAgeMax('');
        }
        }}
      />
      {/* Sort by */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="sortby-label">Sort By Breed</InputLabel>
        <Select
          labelId="sortby-label"
          id="sortby-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          input={<OutlinedInput label="Sort By Breed" />}
        >
          <MenuItem value={"breed:asc"}>Ascending</MenuItem>
          <MenuItem value={"breed:desc"}>Descending</MenuItem>
        </Select>
      </FormControl>
      {/* Apply Filters Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleApplyFilters}
      >
        Apply Filters
      </Button>
      {/* Reset Button */}
      <Button fullWidth onClick={handleResetFilters}>
        Reset
      </Button>
    </Menu>
  );
}

export default FilterMenu;
