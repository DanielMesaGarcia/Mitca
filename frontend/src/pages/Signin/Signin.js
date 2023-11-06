import React, { useState } from 'react';
import { Input, Button } from 'antd';
import './Signin.css'; // Archivo de estilos CSS personalizado
import { Link } from 'react-router-dom';
import signInService from '../../services/signInService'; // Import the provided signInService

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    DNI: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // Call the createUser function from the signInService
    signInService.createUser(formData).then((data) => {
      console.log('User created:', data);
      // You can add a redirect or other logic here
    }).catch((error) => {
      console.error('Error creating user:', error);
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder]: e.target.value,
    });
  };
  
  

  return (
    <div className="signin-container">
      <div className="background-image">
        <img src="/img/couple.jpg" alt="Background" className="bg-img" />
      </div>
      <div className="Signin-form">
        <h2>Bienvenido a la Maratón</h2>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="email"
            className="input"
            onChange={handleChange}
          />
          <Input.Password
            placeholder="password"
            className="input"
            onChange={handleChange}
          />
          <Input
            placeholder="name"
            className="input"
            onChange={handleChange}
          />
          <Input
            placeholder="phone"
            className="input"
            onChange={handleChange}
          />
          <Input placeholder="DNI" className="input" onChange={handleChange} />

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

