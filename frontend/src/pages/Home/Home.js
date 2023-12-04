import React, { useState, useEffect } from 'react';
import { List, Card, Button, Modal, Form, Input, DatePicker, Upload } from 'antd';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import RaceListService from '../../services/raceListService';
import { UploadOutlined } from '@ant-design/icons';
const Home = () => {
  const [races, setRaces] = useState([]);
  const [createFormVisible, setCreateFormVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [createForm] = Form.useForm();
  const navigate = useNavigate();

  const handleCardClick = (raceId) => {
    navigate(`/racedata/${raceId}`);
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

        <List
          grid={{ gutter: 16 }}
          dataSource={races}
          renderItem={(race) => (
            <List.Item key={race._id} onClick={() => handleCardClick(race._id)}>
              <Card title={race._id} style={{ width: '100%' }}>
                <img
                className='racePicture'
                  src={`http://localhost:3001/images/${race.filename}`}
                  alt={race.filename}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Home;
