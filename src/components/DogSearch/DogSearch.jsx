import { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {Backdrop,Box,Button,CircularProgress,Typography} from "@mui/material";
import axios from "axios";
import DogCard from "../../components/DogCard/DogCard";
import VerticalFilter from "../Filters/VerticalFilter";
import BackFab from "../Fabs/BackFab";
import Header from "../Header";
import AutoCloseSnackbar from "../snackBar/AutoCloseSnackbar";
import "./DogSearch.css";
import FabButtonFav from "../Fabs/FabButtons";
import { fetchDogsByIds } from "./FetchDogsById";
import MatchCard from "../Match/MatchCard";

//Common styles used in this Component
const commonButtonStyles = {
  transition: "transform 0.5s",
  color: "#f39c12",
  "&:hover": {
    backgroundColor: "rgba(62, 95, 96, 0.4)",
    transform: "scale(1.20)",
    boxShadow: 4,
    borderRadius: "50px",
    fontSize: "15px",
  },
};

const paginationBoxStyles = {
  display: "flex",
  flexWrap: "wrap",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "20px",
  padding: "10px 10px",
  backdropFilter: "blur(10px)",
  margin: "20px",
};

const enthusiasticBoxStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 0,
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "20px",
  padding: "10px 20px",
  backdropFilter: "blur(10px)",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
};

const enthusiasticTypographyStyles = {
  color: "#f39c12",
  textAlign: "center",
};

//Displays all Dogs and Handles operations like favorites, Match, Filters
function DogSearch({ handleLogout }) {
  //default URL on page load and home
  const defaultHomeURL =
    "https://frontend-take-home-service.fetch.com/dogs/search";

  const dogsPerPage = 25; //set to 25 for user experience and requirements

  // Component States
  const [allDogIds, setAllDogIds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const [isFavoriteClicked, setIsFavoriteClicked] = useState(false);
  const [startPage, setStartPage] = useState(1);
  const [backDropstate, setBackDropstate] = useState(false);
  const [matchedDog, setMatchedDog] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showMatch, setShowMatch] = useState(false);

  // Fetch all dog IDs when filters (or alertMessage) change (initial load or when Home is clicked)
  useEffect(() => {
    fetchAllDogIds(defaultHomeURL, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  //When Match and Show Match to user, Load Match component
  useEffect(() => {
    if (matchedDog) {
      setFavorites(matchedDog.id);
      setShowMatch(true);
    }
  }, [matchedDog]);

  // When currentPage changes (and allDogIds is already loaded), fetch the corresponding page's details.
  useEffect(() => {
    if (allDogIds.length > 0) {
      const startIndex = (currentPage - 1) * dogsPerPage;
      const endIndex = startIndex + dogsPerPage;
      fetchResults(allDogIds.slice(startIndex, endIndex));
      scrollToTop();
    }
  }, [currentPage, allDogIds, alertMessage]);

  // Show backdrop on initial load
  useEffect(() => {
    setBackDropstate(true);
  }, []);

  // Auto-close alert message after 3 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);  

  // API call: Fetch all dog IDs based on filters
  const fetchAllDogIds = async (url, params = {}) => {
    try {
      const response = await axios.get(url, {
        params: { ...params, size: 10000 },
        withCredentials: true,
      });

      if (!response || !response.data || !response.data.resultIds) {
        throw new Error("Invalid response from server");
      }

      setAllDogIds(response.data.resultIds); //load all Dog Ids from response
      setTotalPages(Math.ceil(response.data.total / dogsPerPage) || 1); //Allocate 25 dogs per each page depending on total count

      // Load first page of dog details
      fetchResults(response.data.resultIds.slice(0, dogsPerPage));
      setBackDropstate(false);
    } catch (error) {
      console.error("Error fetching dogs:", error);
      setBackDropstate(false);
    }
  };

  // API call: Fetch dog details by given IDs
  const fetchResults = async (dogIds) => {
    try {
      const dogData = await fetchDogsByIds(dogIds);
      setDogs(dogData);
    } catch (error) {
      console.error("Error fetching dog details:", error);
    }
  };

  // Handlers
  const handleFilteredResults = (newFilters) => {
    setFilters(newFilters);
    fetchAllDogIds(defaultHomeURL, newFilters);
    setCurrentPage(1);
  };

  //Reset filters to none
  const handleResetFilters = () => {
    setFilters({});
  };

  //Handle page navigation
  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const startIndex = (newPage - 1) * dogsPerPage;
    const endIndex = startIndex + dogsPerPage;
    fetchResults(allDogIds.slice(startIndex, endIndex));
    scrollToTop();
  };

  //Handle favorite button click
  const handleFavouriteButtonClick = () => {
    if (favorites.length === 0) {
      setAlertMessage("Please add some favorite dogs first!");
      return;
    }
    setIsFavoriteClicked(true);
    fetchResults(favorites);
  };

  //Handle back button click
  const handleBackButtonClick = () => {
    setIsFavoriteClicked(false);
    handlePageChange(currentPage);//Go back to prev page
  };

  //Navigate to home by resetting all filters
  const handleHomeButtonClick = () => {
    setIsFavoriteClicked(false);
    fetchAllDogIds(defaultHomeURL, {});
    setCurrentPage(1);
    scrollToTop();
    setStartPage(1);
    handlePageChange(1);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //Handle page navigation buttons
  const handleActivePages = (direction) => {
    if (direction === "next" && startPage + 5 <= totalPages) {
      const newStartPage = startPage + 5;
      setStartPage(newStartPage);
      handlePageChange(newStartPage);
    } else if (direction === "prev" && startPage > 1) {
      const newStartPage = startPage - 5;
      setStartPage(newStartPage);
      handlePageChange(newStartPage);
    }
  };

  //Fetch dog match by hitting /match from favorites
  const handleMatch = async () => {
    try {
      const response = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs/match",
        favorites,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.match) {
        const dogDetails = await fetchDogsByIds([response.data.match]);
        setMatchedDog(dogDetails[0]);
      } else {
        setAlertMessage("No match found. Try again!!");
        setMatchedDog(null);
      }
    } catch (error) {
      console.log("Error while getting the match:", error);
    }
  };


  return (
    <div className="main py-2 px-2">
      <div className="container">
        {!showMatch && (
          <div>
            <Backdrop
              sx={(theme) => ({
                color: "#fff",
                zIndex: theme.zIndex.drawer + 1,
              })}
              open={backDropstate}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Header />

            {alertMessage && <AutoCloseSnackbar alertMessage={alertMessage} />}

            <div className="mt-2">
              <VerticalFilter
                onFilterChange={handleFilteredResults}
                onFavouriteButtonClick={handleFavouriteButtonClick}
                onHomeButtonClick={handleHomeButtonClick}
                updateHandleLogout={handleLogout}
                resetFilters={handleResetFilters}
              />

              <div>
                {!showMatch && (
                  <Box sx={enthusiasticBoxStyles}>
                    <Typography
                      variant="h7"
                      component="span"
                      sx={enthusiasticTypographyStyles}
                    >
                      Heart your favorite dogs, and we’ll match you with one of
                      your chosen pups!
                    </Typography>
                  </Box>
                )}

                <div className="row">
                  {dogs.map((dog) => (
                    <div className="col-md-4 mb-3" key={dog.id}>
                      <DogCard
                        dog={dog}
                        onFavorite={(id) => {
                          const updatedFavorites = favorites.includes(id)
                            ? favorites.filter((f) => f !== id)
                            : [...favorites, id];
                          setFavorites(updatedFavorites);
                        }}
                        getFavorites={favorites}
                      />
                    </div>
                  ))}
                </div>

                {isFavoriteClicked ? (
                  <BackFab handleButtonClick={handleBackButtonClick} />
                ) : (
                  <FabButtonFav
                    scrollToTop={scrollToTop}
                    handleFavouriteButtonClick={handleFavouriteButtonClick}
                  />
                )}

                {!isFavoriteClicked ? (
                  <div>
                    {/* Pagination Controls */}
                    <Box
                      className="pagination-container justify-content-sm-center"
                      sx={paginationBoxStyles}
                    >
                      <Button
                        sx={commonButtonStyles}
                        disabled={startPage === 1}
                        onClick={() => handleActivePages("prev")}
                      >
                        <ArrowBackIosIcon />
                      </Button>

                      {Array.from({ length: 5 }, (_, i) => startPage + i).map(
                        (page) =>
                          page <= totalPages && (
                            <Button
                              key={page}
                              sx={commonButtonStyles}
                              onClick={() => handlePageChange(page)}
                              className={currentPage === page ? "active" : ""}
                            >
                              {page}
                            </Button>
                          )
                      )}

                      <Button
                        sx={commonButtonStyles}
                        disabled={startPage + 5 > totalPages}
                        onClick={() => handleActivePages("next")}
                      >
                        <ArrowForwardIosIcon />
                      </Button>
                    </Box>
                  </div>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!showMatch && (
                      <Button
                        onClick={handleMatch}
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
                        Match
                      </Button>
                    )}
                  </Box>
                )}
              </div>
            </div>
          </div>
        )}
        {showMatch && (
          <MatchCard matchDetails={matchedDog} logout={handleLogout} />
        )}
      </div>
    </div>
  );
}

export default DogSearch;
