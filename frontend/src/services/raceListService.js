import axios from 'axios';

const API_URL = 'http://localhost:3001/races'; // Replace with your actual API URL

const getRaces = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching races: ${error.message}`);
  }
};

const RaceListService = {
  getRaces,
};

export default RaceListService;
