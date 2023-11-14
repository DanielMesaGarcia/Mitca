import axios from 'axios';

const API_URL = 'http://localhost:3001/runners';
const selectedRaceId = localStorage.getItem('selectedRaceId');

const getRunners = async () => {
  try {
    const response = await axios.get(API_URL);

    // Asegúrate de que la respuesta es un objeto con una propiedad 'runners' que es un array
    const allRunners = response.data.data;

    // Obtener los corredores de la carrera seleccionada
    const raceRunners = await getRaceRunnersById(selectedRaceId);

    // Filtrar los corredores para incluir solo los de la carrera seleccionada
    const filteredRunners = allRunners.filter(runner =>
      raceRunners.some(raceRunner => raceRunner._id === runner._id)
    );
    return filteredRunners;
  } catch (error) {
    throw new Error(`Error al obtener corredores: ${error.message}`);
  }
};




const getRaceRunnersById = async (raceId) => {
  try {
    const response = await axios.get(`http://localhost:3001/races/${raceId}`);
    const race = response.data.data; // Ajusta según la estructura real
    const runners = race.runners || [];
    return runners;
  } catch (error) {
    console.error('Error al obtener la raza por ID:', error);
    throw error;
  }
}




const addRunner = async (runner) => {
  try {
    const response = await axios.post(API_URL, runner);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Error al agregar corredor: ${error.message}`);
  }
};

const updateRunner = async (id, updatedRunner) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedRunner);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Error al actualizar corredor: ${error.message}`);
  }
};

const deleteRunner = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Error al eliminar corredor: ${error.message}`);
  }
};

const addRunnerToRace = async (runnerId) => {
  try {
    const response = await axios.patch(`http://localhost:3001/races/${selectedRaceId}`, {
      $push: { runners: runnerId }
    });
    console.log("respu")
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Error al agregar corredor a la carrera: ${error.message}`);
  }
};

const RaceListService = {
  getRunners,
  addRunner,
  updateRunner,
  deleteRunner,
  addRunnerToRace,
};

export default RaceListService;
