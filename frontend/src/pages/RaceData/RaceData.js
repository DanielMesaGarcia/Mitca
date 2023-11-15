import React, { useEffect, useState } from 'react';
import { Card, Button } from 'antd';
import Header from '../../components/header/Header';
import './RaceData.css';
import RaceDataService from '../../services/raceDataService';
import { useNavigate, useParams } from 'react-router-dom';

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
  
  const handleDelete = async (idRace) => {
    try {
        await RaceDataService.deleteRace(idRace);
        navigate(`/home`);  
    } catch (error) {
        console.error('Error deleting runner:', error);
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
          </div>
        )}

      <Button type="primary" onClick={() => handleDelete(id)}>Borrar carrera</Button>
      </Card>

      <div className="card-container">
        <Card className="custom-card" bordered={false}>
          <div className="card-content">
            <img src="/img/couple.jpg" alt="Sample" className="card-image" />
            <h3>Corredores</h3>
            <hr className="divider" />
            <p>Creación, eliminación, actualización y visualización de todos los corredores</p>
            {/* este de aqui */}
            <Button type="primary"  onClick={handleRunnerClick}>Acceder</Button> 
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
        {/* Agregar más tarjetas según sea necesario */}
      </div>
    </div>
  );
};

export default RaceData;
