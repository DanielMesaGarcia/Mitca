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

const RaceListService = {
  getDataById,
};

export default RaceListService;
