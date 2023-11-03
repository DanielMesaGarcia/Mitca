import React from 'react';
import { Input, Button } from 'antd';
import './Login.css'; // Archivo de estilos CSS personalizado
import { Link } from 'react-router-dom';
const Login = () => {
  return (
    <div className="login-container">
      <div className="background-image">
        <img src="/img/couple.jpg" alt="Background" className="bg-img" />
      </div>
      <div className="login-form">
        <h2>Bienvenido a la Maratón</h2>
        <Input placeholder="Correo electrónico" className="input" />
        <Input.Password placeholder="Contraseña" className="input" />
        <Link to="/signin">
            <Button type="primary" className="signin-button">
            Crear cuenta
            </Button>
        </Link>

            {/* PROVISIONAL HASTA QUE AÑADA SISTEMA DE TOKENS Y LOGINS */}

        <Link to="/home">
            <Button type="primary" className="login-button">
            Iniciar sesión
            </Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
