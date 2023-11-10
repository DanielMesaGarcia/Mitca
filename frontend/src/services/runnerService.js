import axios from 'axios';

const API_URL = 'http://localhost:3001/runners'; // Reemplaza con tu URL de API real

const selectedRaceId = localStorage.getItem('selectedRaceId');

const getRunners = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener corredores: ${error.message}`);
  }
};



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