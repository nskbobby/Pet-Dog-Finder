import axios from "axios";

//get dog information from dog ids
export async function fetchDogsByIds(dogIds) {
  if (!Array.isArray(dogIds)) {
    throw new Error("The body must be an array of dog IDs.");
  }
  if (dogIds.length > 100) {
    throw new Error("You can only fetch up to 100 dog IDs at a time.");
  }

  try {
    const response = await axios.post(
      "https://frontend-take-home-service.fetch.com/dogs",
      dogIds,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching dogs:", error);
    throw error;
  }
}
