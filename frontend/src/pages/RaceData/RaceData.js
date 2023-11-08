import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import Header from '../../components/header/Header';
import './RaceData.css';
import RaceDataService from '../../services/raceDataService';

const RaceData = () => {
  const [routeData, setRouteData] = useState(null);
  const [statusData, setStatusData] = useState(null);
  const selectedRaceId = localStorage.getItem('selectedRaceId');

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const response = await RaceDataService.getRouteByRaceId(selectedRaceId);
        const data = response.data;
        if (data && data.length > 0) {
          setRouteData(data[0]); // Access the first item in the array
          console.log(data[0]);
        }
      } catch (error) {
        console.error('Error fetching route data:', error);
      }
    };
    const fetchStatusData = async () => {
      try {
        const response = await RaceDataService.getStatusByRaceId(selectedRaceId);
        const data = response.data;
        if (data && data.length > 0) {
          setStatusData(data[0]); // Access the first item in the array
          console.log(data[0]);
        }
      } catch (error) {
        console.error('Error fetching status data:', error);
      }
    };
    fetchRouteData();
    fetchStatusData();
  }, [selectedRaceId]);

  return (
    <div>
      <Header />

      <h2>Datos de {selectedRaceId}:</h2>

      <Card className='Route'>
        {routeData && statusData && (
          <div>
            <p>Puntos de control: {routeData.checkpoint}</p>
            <p>Lugar de inicio: {routeData.startPoint}</p>
            <p>Meta: {routeData.goal}</p>
            <p />
            <p>Estado actual: {statusData.statusAtTheMoment}</p>
            {statusData.statusAtTheMoment !== 'No empezada' && statusData.statusAtTheMoment !== 'En curso' && (
              <div>
                <p>Ganador: {statusData.winner}</p>
                <p>Duración: {statusData.duration}</p>
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
            <Button type="primary">Acceder</Button>
          </div>
        </Card>
        <Card className="custom-card" bordered={false}>
          <div className="card-content">
            <img src="/img/couple.jpg" alt="Sample" className="card-image" />
            <h3>Ruta</h3>
            <hr className="divider" />
            <p>Creación, eliminación, actualización y visualización de rutas</p>
            <Button type="primary">Acceder</Button>
          </div>
        </Card>
        <Card className="custom-card" bordered={false}>
          <div className="card-content">
            <img src="/img/couple.jpg" alt="Sample" className="card-image" />
            <h3>Estado</h3>
            <hr className="divider" />
            <p>¿¿¿¿¿¿¿¿¿Actualización y visualización de todos los corredores??????????????'</p>
            <Button type="primary">Acceder</Button>
          </div>
        </Card>
        <Card className="custom-card" bordered={false}>
          <div className="card-content">
            <img src="/img/couple.jpg" alt="Sample" className="card-image" />
            <h3>Patrocinadores</h3>
            <hr className="divider" />
            <p>Creación, eliminación, actualización y visualización de los patrocinadores</p>
            <Button type="primary">Acceder</Button>
          </div>
        </Card>
        {/* Agregar más tarjetas según sea necesario */}
      </div>
    </div>
  );
};

export default RaceData;
