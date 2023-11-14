import axios from 'axios';

const API_URL = 'http://localhost:3001/races';
const API_URL_route = 'http://localhost:3001/routes';
const getRaces = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching races: ${error.message}`);
  }
};
const createRace = async (raceData) => {
  try {
    const response = await axios.post(API_URL, raceData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating race: ${error.message}`);
  }
};

const createRoute = async (routeData) => {
  try {
    const response = await axios.post(API_URL_route, routeData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating race: ${error.message}`);
  }
};

const updateRace = async (raceId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${raceId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating race: ${error.message}`);
  }
};

const deleteRace = async (raceId) => {
  try {
    const response = await axios.delete(`${API_URL}/${raceId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting race: ${error.message}`);
  }
};

const RaceListService = {
  getRaces,
  createRace,
  updateRace,
  deleteRace,
  createRoute,
};


export default RaceListService;
