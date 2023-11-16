import React, { useEffect, useState } from 'react';
import { Card, Button, TimePicker, Checkbox, Select } from 'antd';
import Header from '../../components/header/Header';
import './RaceData.css';
import RaceDataService from '../../services/raceDataService';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Form from 'antd/es/form/Form';
import Modal from 'antd/es/modal/Modal';
const { Option } = Select;
dayjs.extend(customParseFormat);
const onChange = (time, timeString) => {
  console.log(time, timeString);
};


const RaceData = () => {
  const [Data, setData] = useState(null);
  const { id } = useParams();
  const selectedRaceId = id;
  const navigate = useNavigate();


  const handleRunnerClick = () => {
    navigate(`/runners/${id}`);
  };

  const handleSponsorClick = () => {
    navigate(`/sponsors/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RaceDataService.getDataById(selectedRaceId);
        const data = response.data;
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching route data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (idRace) => {
    try {
      await RaceDataService.deleteRace(idRace);
      navigate(`/home`);
    } catch (error) {
      console.error('Error deleting runner:', error);
    }
  };

  const [endingFormVisible, setEndingFormVisible] = useState(false);
  const [startingFormVisible, setStartingFormVisible] = useState(false);
  const [endingForm] = Form.useForm();
  const [startingForm] = Form.useForm();

  const showForm = () => {
    if (Data.status.statusAtTheMoment === 'No empezada') {
      setStartingFormVisible(true);
    } else {
      setEndingFormVisible(true);
    }

  };

  const handleStart = async () => {
    try {
      // Extraer los datos para el esquema de la carrera
      const statusData = {
        statusAtTheMoment: 'En curso',
      };

      const response = await RaceDataService.updateStatus(Data.status._id, statusData);
      if (response.success) {
        setData({ ...Data, status: response.data });
        setStartingFormVisible(false);
      } else {
        // Handle error if needed
        console.error("Error updating Status:", response.error);
      }
    } catch (error) {
      // Handle error if needed
      console.error("Error updating Status:", error);
    }
  };

  const handleEnding = async (values) => {
    try {
      const { winner, duration } = values;

      const statusData = {
        statusAtTheMoment: 'Finalizada',
        winner, 
        duration,
      };

      const response = await RaceDataService.updateStatus(Data.status._id, statusData);
      if (response.success) {
        setData({ ...Data, status: response.data });
        setEndingFormVisible(false);
      } else {
        // Handle error if needed
        console.error("Error updating Status:", response.error);
      }
    } catch (error) {
      // Handle error if needed
      console.error("Error updating Status:", error);
    }
  };



  return (
    <div>
      <Header />

      <h2>Datos de {selectedRaceId}:</h2>

      <Card className='Route'>
        {Data && (
          <div>
            <p>Puntos de control: {Data.route.checkpoint}</p>
            <p>Lugar de inicio: {Data.route.startPoint}</p>
            <p>Meta: {Data.route.goal}</p>
            <p />
            <p>Estado actual: {Data.status.statusAtTheMoment}</p>
            {Data.status.statusAtTheMoment !== 'No empezada' && Data.status.statusAtTheMoment !== 'En curso' && (
              <div>
                <p>Ganador: {Data.status.winner}</p>
                <p>Duración: {Data.status.duration}</p>
              </div>
            )}
          
        <Button type="primary" onClick={showForm} style={{ marginBottom: '16px' }}>
          Update Status
        </Button>
        <Button type="primary" onClick={() => handleDelete(id)}>Borrar carrera</Button>
        <Modal
          title="Create Race"
          open={startingFormVisible}
          onCancel={() => setStartingFormVisible(false)}
          onOk={startingForm.submit}
        >
          <Form form={startingForm} onFinish={handleStart}>
            <p>Estas seguro de que quieres iniciar la carrera</p>
          </Form>
        </Modal>
        <Modal
          title="Create Race"
          open={endingFormVisible}
          onCancel={() => setEndingFormVisible(false)}
          onOk={endingForm.submit}
        >
          <Form form={endingForm} onFinish={handleEnding}>
            <Form.Item name="winner" label="Winner" rules={[{ required: true }]}>
              <Select placeholder="Select a winner">
                {Data?.runners?.map(runner => (
                  <Option key={runner._id} value={runner.name}>
                    {`${runner.name}, ${runner._id}`}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="duration" label="duration" rules={[{ required: true }]}>
              <TimePicker onChange={onChange} />
            </Form.Item>
            <p>Darle click a OK cambiará el estado de la carrera a terminada con los datos que has introducido</p>
          </Form>
        </Modal>
        </div>
        )}
      </Card>

      <div className="card-container">
        <Card className="custom-card" bordered={false}>
          <div className="card-content">
            <img src="/img/couple.jpg" alt="Sample" className="card-image" />
            <h3>Corredores</h3>
            <hr className="divider" />
            <p>Creación, eliminación, actualización y visualización de todos los corredores</p>
            {/* este de aqui */}
            <Button type="primary" onClick={handleRunnerClick}>Acceder</Button>
          </div>
        </Card>
        <Card className="custom-card" bordered={false}>
          <div className="card-content">
            <img src="/img/couple.jpg" alt="Sample" className="card-image" />
            <h3>Patrocinadores</h3>
            <hr className="divider" />
            <p>Creación, eliminación, actualización y visualización de los patrocinadores</p>
            <Button type="primary" onClick={handleSponsorClick}>Acceder</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RaceData;
