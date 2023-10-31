import React from 'react';
import Header from '../../components/header/Header';
import { Card, Button } from 'antd';
import './Home.css';

const Home = () => {
  
  // Contenido y lógica específicos para la página de inicio de sesión
  return (
    <div>
      <Header />
      
      <h2>Bienvenido, USERNAME</h2>
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
        <Card className="custom-card" title="Card title" bordered={false}>
          <p>Card content</p>
        </Card>
        <Card className="custom-card" title="Card title" bordered={false}>
          <p>Card content</p>
        </Card>
        <Card className="custom-card" title="Card title" bordered={false}>
          <p>Card content</p>
        </Card>
        <Card className="custom-card" title="Card title" bordered={false}>
          <p>Card content</p>
        </Card>
        <Card className="custom-card" title="Card title" bordered={false}>
          <p>Card content</p>
        </Card>
        {/* Agregar más tarjetas según sea necesario */}
      </div>
    </div>
  );
};

export default Home;
