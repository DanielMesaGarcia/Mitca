import axios from 'axios';

const API_URL = 'http://localhost:3001/users'; // Replace with your actual API URL

const signInService = {
  getUserById: (userId) => {
    return axios.get(`${API_URL}/${userId}`).then((response) => response.data);
  },

  createUser: (userData) => {
    console.log(userData);
    const mappedData = { ...userData, _id: userData.email };
    delete mappedData.email; // Remove the 'email' key from the mapped data

    return axios.post(API_URL, mappedData).then((response) => response.data);
  },

  login: async (userData) => {
    try {
        console.log(`${API_URL}/login`, userData);
      const response = await axios.post(`${API_URL}/login`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default signInService;
