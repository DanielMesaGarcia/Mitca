import React from 'react';
import { Input, Button } from 'antd';
import './Login.css'; // Archivo de estilos CSS personalizado

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

            {/* PROVISIONAL HASTA QUE AÑADA SISTEMA DE TOKENS Y LOGINS */}

        {/* <Link to="/home">
            <Button type="primary" className="login-button">
            Iniciar sesión
            </Button>
        </Link> */}
      </div>
    </div>
  );
};

export default Login;
