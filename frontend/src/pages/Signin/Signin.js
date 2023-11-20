import React, { useState } from 'react';
import { Input, Button } from 'antd';
import './Signin.css'; // Archivo de estilos CSS personalizado
import { Link, useNavigate } from 'react-router-dom';
import signInService from '../../services/signInService'; // Import the provided signInService
import UserService from '../../services/logInService';

import {regSw, subscribe} from '../../services/helper';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    DNI: '',
  });

  async function registerAndSubscribe () {
    try {
      const serviceWorkerReg = await regSw ();
      await subscribe (serviceWorkerReg);
    } catch (error) {
      console.log (error);
    }
  }


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    // Call the createUser function from the signInService
    signInService.createUser(formData).then( async (data) => {
      console.log('User created:', data);
      // You can add a redirect or other logic here

      const response = await UserService.login({ _id: formData.email, password: formData.password });
      // Handle the response as per your requirements
      console.log(response);
      // Save the token to the local storage
      localStorage.setItem('token', response.token);
      // Redirect to the home page
      navigate('/home');

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

          <Button type="primary" onClick={registerAndSubscribe} htmlType="submit" className="Signin-button">
            Crear cuenta
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signin;

