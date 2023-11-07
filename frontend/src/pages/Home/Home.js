import React, { useState, useEffect } from 'react';
import { List, Card } from 'antd';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import RaceListService from '../../services/raceListService';

const Home = () => {
  const [races, setRaces] = useState([]);
  const navigate = useNavigate();
  const handleCardClick = (raceId) => {
    localStorage.setItem('selectedRaceId', raceId);
    navigate('/racedata');
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
      <Header/>

      <div className="race-list">
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={races} // Ensure that the data source is an array
          renderItem={(race) => (
            <List.Item key={race._id} onClick={() => handleCardClick(race._id)}>
              <Card title={race._id} style={{ width: 300 }}>
                {/* <img src={race.image} alt={race.name} style={{ width: '100%', height: 'auto' }} /> */}
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Home;
