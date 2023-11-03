import React from 'react';
import { Input, Button } from 'antd';
import './Signin.css'; // Archivo de estilos CSS personalizado
import { Link } from 'react-router-dom';

const Signin = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // Add your form submission logic here
  };
  //usar axios
  return (
    <div className="signin-container">
      <div className="background-image">
        <img src="/img/couple.jpg" alt="Background" className="bg-img" />
      </div>
      <div className="Signin-form">
        <h2>Bienvenido a la Maratón</h2>
        <form onSubmit={handleSubmit}>
          <Input placeholder="Correo electrónico" className="input" />
          <Input.Password placeholder="Contraseña" className="input" />
          <Input placeholder="Nombre" className="input" />
          <Input placeholder="Telefono" className="input" />
          <Input placeholder="DNI" className="input" />

          {/* PROVISIONAL HASTA QUE AÑADA SISTEMA DE TOKENS Y SigninS */}

          <Button type="primary" htmlType="submit" className="Signin-button">
            Crear cuenta
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
