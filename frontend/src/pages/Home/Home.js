import React, { useState, useEffect } from 'react';
import { List, Card, Button, Modal, Form, Input, DatePicker } from 'antd';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import RaceListService from '../../services/raceListService';

const Home = () => {
  const [races, setRaces] = useState([]);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [createForm] = Form.useForm();
  const navigate = useNavigate();

  const handleCardClick = (raceId) => {
    localStorage.setItem('selectedRaceId', raceId);
    navigate('/racedata');
  };

  const showCreateForm = () => {
    setCreateFormVisible(true);
  };

  const handleCreate = async (values) => {
    try {

      // Extraer los datos para el esquema de la carrera
      const raceData = {
        _id: values.name,
        eventDate: values.eventDate,
        city: values.city,
        length: values.length,
      };

      // Extraer los datos para el esquema de la ruta
      const routeData = {
        race: values.name,
        checkpoint: values.checkpoint,
        startPoint: values.startPoint,
        goal: values.goal,
      };

      const statusData = {
        carrera: values.name,
      };


      const response = await RaceListService.createRace(raceData);
      const response2 = await RaceListService.createRoute(routeData);
      const responseStatus = await RaceListService.createStatus(statusData);
      if (response.success && response2.success) {
        const raceDataWithInfo = {
          _id: values.name,
          eventDate: values.eventDate,
          city: values.city,
          length: values.length,
          route: response2.data._id,
          status: responseStatus.data._id,
        }
        console.log(raceDataWithInfo);
        const response3 = await RaceListService.updateRace(values.name, raceDataWithInfo);
        console.log(response3);
        if (response3.success) {
          setRaces([...races, response.data]);
          setCreateFormVisible(false);
          createForm.resetFields();
        }
      } else {
        // Handle error if needed
        console.error("Error creating race:", response.error);
        console.error("Error creating route:", response2.error);
      }
    } catch (error) {
      // Handle error if needed
      console.error("Error creating race:", error);
    }
  };

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await RaceListService.getRaces();
        if (response.success) {
          setRaces(response.data);
        } else {
          // Handle error if needed
          console.error("Error fetching races:", response.error);
        }
      } catch (error) {
        // Handle error if needed
        console.error("Error fetching races:", error);
      }
    };
    fetchRaces();
  }, []);

  return (
    <div>
      <Header />

      <div className="race-list">
        <Button type="primary" onClick={showCreateForm} style={{ marginBottom: '16px' }}>
          Create Race
        </Button>

        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={races}
          renderItem={(race) => (
            <List.Item key={race._id} onClick={() => handleCardClick(race._id)}>
              <Card title={race.name} style={{ width: 300 }}>
                {/* Display other race details */}
              </Card>
            </List.Item>
          )}
        />

        <Modal
          title="Create Race"
          open={createFormVisible}
          onCancel={() => setCreateFormVisible(false)}
          onOk={createForm.submit}
        >
          <Form form={createForm} onFinish={handleCreate}>
            <Form.Item name="name" label="Race Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="eventDate" label="Event Date" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item name="city" label="City" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="length" label="Length" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="checkpoint" label="checkpoint" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="startPoint" label="startPoint" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="goal" label="goal" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            {/* Add other form fields for route, status, runners, sponsors as needed */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
