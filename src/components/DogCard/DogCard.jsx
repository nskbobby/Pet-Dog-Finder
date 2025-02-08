import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import { fetchLocationDetailsByZipCode } from "./fetchLocationDetailsByZipCode";
import { React, useState, useEffect } from "react";

function DogCard({ dog, onFavorite, onAdopt, getFavorites }) {
  
  // state to set location details from zip code
  const [location, setLocation] = useState("Fetching...");

  //To fetch location details from zippo api
  useEffect(() => {
    const getLocation = async () => {
      try {
        const loc = await fetchLocationDetailsByZipCode(dog.zip_code);
        if (loc === "undefined, undefined") {
          setLocation(dog.zip_code);
        }
        setLocation(loc);
      } catch (error) {
        setLocation("Location unavailable");
      }
    };
    getLocation();
  }, [dog.zip_code]);

  return (
    //card component to show details like dog img, name, breed and location to the user
    <Card
      onClick={() => onFavorite(dog.id)}
      sx={{
        maxWidth: 345,
        m: 2,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(2px)",
        transition: "transform 0.6s, box-shadow 0.6s",
        "&:hover": { 
          transform: "scale(1.05)",
          boxShadow: 6,
          "& .cardMedia": {
            height: "300px",
          },
          "& .adoptButton": {
            display: "block",
          },
        /* Hide additional details on hover
           '& .additionalDetails': {
             display: 'block',
           },
            */
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={dog.img}
          alt={dog.name}
          className="cardMedia"
          sx={{
            height: 200,
            transition: "height 0.3s",
          }}
        />
        <CardContent sx={{ pt: 1, pb: 2, position: "relative" }}>
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <Tooltip title="Favorite this dog" placement="top">
              <IconButton onClick={() => onFavorite(dog.id)} color="error">
                {getFavorites.includes(dog.id) ? (
                  <FavoriteIcon sx={{ fontSize: 25 }} />
                ) : (
                  <FavoriteBorderIcon sx={{ fontSize: 25 }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            {dog.name}
          </Typography>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ fontSize: "1.1rem", fontWeight: 500 }}
          >
            Breed: {dog.breed}
          </Typography>
          {/* Additional details */}
          <Box
            className="additionalDetails"
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: "1rem", color: "#555" }}
            >
              Age: {dog.age} months
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "1rem", color: "#555" }}
            >
              {location}
            </Typography>
          </Box>

          {/*******************Commented because it is not specified in requirements**************/}
          {/* Can choose to adapt a particular dog on click 
           <Box
            className="adoptButton"
            sx={{
              display: { xs: 'block', sm: 'none' },
              position: 'absolute',
              bottom: 8,
              right: 8,
            }}
          >
            <Tooltip title="Click to Adopt" placement="top">
              <IconButton onClick={() => onAdopt(dog.id)} color="success">
                <CheckIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </Tooltip>
          </Box> */}

          
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default DogCard;
