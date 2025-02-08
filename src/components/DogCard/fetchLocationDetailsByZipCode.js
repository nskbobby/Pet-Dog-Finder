import axios from "axios";

//To Fetch Location details from extenal API ZIPPOTAM for Location details
export async function fetchLocationDetailsByZipCode(zipCode) {
  try {
    const response = await axios.get(`http://api.zippopotam.us/us/${zipCode}`);

    // Access the first place in the array
    const place = response.data.places[0];

    // Construct the location string
    const location = `${place["place name"]}, ${place["state abbreviation"]}`; //Location is saved in this format 'Dallas, TX'
    return location;
  } catch (error) {
    throw error;
  }
}
