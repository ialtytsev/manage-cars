import axios from "axios";

const API_BASE_URL = "https://myfakeapi.com/api";

export const getCars = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cars`);
    return response.data.cars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};
