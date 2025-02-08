import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography, Button } from "@mui/material";
import { fetchLocationDetailsByZipCode } from "../DogCard/fetchLocationDetailsByZipCode";
import Header from "../Header";

function MatchCard({ matchDetails, logout }) {
  const [location, setLocation] = useState("Fetching...");

  useEffect(() => {
    const getLocation = async () => {
      try {
        const loc = await fetchLocationDetailsByZipCode(matchDetails.zip_code);
        if (loc === "undefined, undefined") {
          setLocation(matchDetails.zip_code);
        }
        setLocation(loc);
      } catch (error) {
        setLocation("Location unavailable");
      }
    };
    getLocation();
  }, [matchDetails.zip_code]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container">
      <Header />
      <Typography
        sx={{
          margin: "1%",
          textAlign: "center",
          color: "white",
          fontSize: "200%",
          fontFamily: "monospace",
        }}
      >
        Yay! Your pup is waiting! 🐶
      </Typography>
      <div className="d-flex flex-wrap align-items-center justify-content-center">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: "auto",
              height: "auto",
            },
          }}
        >
          <img
            style={{
              borderRadius: "5px",
              maxWidth: "330px",
              maxHeight: "auto",
              "@media(max-width:600px)": {
                maxWidth: "300px",
              },
            }}
            src={matchDetails.img}
            alt={matchDetails.name}
          />

          <div className="d-flex flex-column">
            <Typography
              variant="h5"
              sx={{
                color: "white",
                fontFamily: "monospace",
              }}
            >
              {" "}
              <b>Name:</b>
              {matchDetails.name}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "white",
                fontFamily: "monospace",
              }}
            >
              {" "}
              <b>Age:</b>
              {matchDetails.age}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "white",
                fontFamily: "monospace",
              }}
            >
              {" "}
              <b>Breed:</b>
              {matchDetails.breed}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: "white",
                fontFamily: "monospace",
              }}
            >
              {" "}
              <b>Location:</b>
              {location}
            </Typography>
            <Typography
              sx={{
                color: "white",
                maxWidth: "700px",
                textWrap: "wrap",
                fontFamily: "monospace",
                marginTop: "6%",
              }}
            >
              Congratulations! <br />
              <br />
              On your amazing result, and for choosing to adopt.
              <br />
              <br />
              Your cute pet {matchDetails.name}, is wagging their tail, waiting
              for you at {location}. 🐾
              <br />
              <br />
              Thank you for making a difference by adopting. Your choice helps
              make the world a better place. ❤️
              <br />
              <br />
              Our team will be in touch with you shortly via the email you
              provided. We can’t wait to see the bond you’ll share!
            </Typography>
          </div>
        </Box>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <Button
          onClick={handleLogout}
          sx={{
            transition: "transform 0.5s",
            color: "white",
            backgroundColor: "rgba(88, 133, 65, 0.4)",
            "&:hover": {
              backgroundColor: "rgba(62, 95, 96, 0.4)",
              transform: "scale(1.20)",
              boxShadow: 4,
              fontSize: "15px",
            },
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default MatchCard;
