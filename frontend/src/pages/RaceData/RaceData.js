import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import Header from '../../components/header/Header';
import './RaceData.css';
import RaceDataService from '../../services/raceDataService';
import { Link, useParams } from 'react-router-dom';

const RaceData = () => {
  const [Data, setData] = useState(null);
  const { id } = useParams();
  const selectedRaceId = id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RaceDataService.getDataById(selectedRaceId);
        const data = response.data;
        console.log(data.route);
        if (data) {
          setData(data);
        }
      } catch (error) {
        console.error('Error fetching route data:', error);
      }
    };
    fetchData();
  }, []);
  

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
            <Link to="/runners">
            <Button type="primary"  >Acceder</Button>
            </Link>
          </div>
        </Card>
        <Card className="custom-card" bordered={false}>
          <div className="card-content">
            <img src="/img/couple.jpg" alt="Sample" className="card-image" />
            <h3>Patrocinadores</h3>
            <hr className="divider" />
            <p>Creación, eliminación, actualización y visualización de los patrocinadores</p>
            <Link to="/sponsors">
            <Button type="primary"  >Acceder</Button>
            </Link>
          </div>
        </Card>
        {/* Agregar más tarjetas según sea necesario */}
      </div>
    </div>
  );
};

export default RaceData;
