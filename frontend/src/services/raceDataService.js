import axios from 'axios';

const RACE_URL = 'http://localhost:3001/races';

const getDataById = async (id) => {
    try {
      const response = await axios.get(`${RACE_URL}/${id}`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};

const deleteRace = async (id) => {
  try {
    const response = await axios.delete(`${RACE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error al eliminar carrera: ${error.message}`);
  }
};

const RaceListService = {
  getDataById,
  deleteRace,
};

export default RaceListService;
