import axios from 'axios';

const RACE_URL = 'http://localhost:3001/races'; 
const ROUTE_URL = 'http://localhost:3001/routes'; 
const STATUS_URL = 'http://localhost:3001/status'; 

const getRaceById = async (id) => {
    try {
      const response = await axios.get(`${RACE_URL}/${id}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};

const getRouteByRaceId = async (id) => {
    try {
      const response = await axios.get(`${ROUTE_URL}?race=${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching route: ${error.message}`);
    }
};

const getStatusByRaceId = async (id) => {
    try {
      const response = await axios.get(`${STATUS_URL}?carrera=${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching status: ${error.message}`);
    }
};

const RaceListService = {
  getRaceById,
  getRouteByRaceId,
  getStatusByRaceId,
};

export default RaceListService;
