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
import { regSw,
  subscribe,
  checkIfAlreadySubscribed,
  getAllSubscriptions,
  unregisterFromServiceWorker } from '../../services/helper';
import MyButton from '../../components/buttonBack/buttonBack';

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


  const [subscribed, setSubscribed] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionName, setSubscriptionName] = useState("Carreras");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("select a recipient");
  useEffect(() => {
    checkSubscriptionState();
    
    getAllSubscriptions().then((res) => {
      setSubscriptions(res.data);
    });
    setSubscriptionName("Carreras");
  }, []);

  const registerAndSubscribe = async () => {
    try {
      const serviceWorkerReg = await regSw();
      const recipient =await subscribe(serviceWorkerReg, subscriptionName);

      setSubscribed(true);
      getAllSubscriptions().then((res) => {
        setSubscriptions(res.data);
      });
      setSelectedRecipient(recipient);
    } catch (error) {
      console.log(error);
    }
  }

  const checkSubscriptionState = async () => {
    const subscriptionState = await checkIfAlreadySubscribed();
    setSubscribed(subscriptionState);
  }

  const handleSubscription = async (e) => {
    e.preventDefault();

    await registerAndSubscribe();
  }

  const handleUnsubscription = (e) => {
    e.preventDefault();

    unregisterFromServiceWorker().then(() => {
      checkSubscriptionState();
    })
  }


  

  useEffect(() => {
    getAllSubscriptions().then((res) => {
      setSubscriptions(res.data);
    });
    
  }, [subscribed]);




  return (
    <div >
      <Header />
      <MyButton/>
      <div className='container'>
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
    </div>
  );
};

export default RaceData;
