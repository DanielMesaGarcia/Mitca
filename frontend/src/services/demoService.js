import axios from 'axios';

const DEMO_URL = 'http://localhost:3001/demo/crearDemoData';

const createDemoData = async () => {
    try {
      const response = await axios.get(`${DEMO_URL}`);
      return response;
    } catch (error) {
      console.error('Error creating demo:', error);
      throw error;
    }
};

const DemoService = {
  createDemoData,
};

export default DemoService;
