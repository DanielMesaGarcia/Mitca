import React, { useState } from 'react';
import { Input, Button } from 'antd';
import './Login.css';
import { Link } from 'react-router-dom';
import UserService from '../../services/logInService'; // Adjust the path according to your file structure

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await UserService.login({ _id: email, password }); // assuming the email value is stored in the 'email' variable
      // Handle the response as per your requirements
      console.log(response);
    } catch (error) {
      // Handle the error
      console.error('Error while logging in:', error);
    }
  };
  

  return (
    <div className="login-container">
      <div className="background-image">
        <img src="/img/couple.jpg" alt="Background" className="bg-img" />
      </div>
      <div className="login-form">
        <h2>Bienvenido a la Maratón</h2>
        <Input
          placeholder="Correo electrónico"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input.Password
          placeholder="Contraseña"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/signin">
          <Button type="primary" className="signin-button">
            Crear cuenta
          </Button>
        </Link>

        <Button type="primary" className="login-button" onClick={handleLogin}>
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
};

export default Login;
