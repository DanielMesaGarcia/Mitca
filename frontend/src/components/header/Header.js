import React, { useState } from 'react';
import './Header.css'; // Archivo de estilos CSS personalizado
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import DemoService from '../../services/demoService';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleRedirect = (path) => {
    navigate(path);
  };

  const demoData = async () => {
    try {
      const response = await DemoService.createDemoData();
    } catch (error) {
      console.error('Error fetching route data:', error);
    }
  };

  const logOut = () => {
    // Borrar el token del almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirigir a la página de inicio de sesión
    navigate('/login');
  };
  const role = localStorage.getItem('role');
  return (
    <div className="header-container">
    
      <div className={`menu ${menuVisible ? 'show' : ''}`} onClick={toggleMenu}>
        <ul>
        <li>
        <Button
          type="primary"
          className="demo-button"
          onClick={() => handleRedirect(role === 'admin' ? '/homeAdmin' : '/home')}
        >
          Vuelta al inicio
        </Button>
      </li>
      <li>
        <Button
          type="primary"
          className="demo-button"
          onClick={() => handleRedirect('/usersettings')}
        >
          Ajustes de usuario
        </Button>
      </li>
      <li>
        <Button
          type="primary"
          className="demo-button"
          onClick={demoData}
        >
          Crear datos demo
        </Button>
      </li>
      <li>
        <Button
          type="primary"
          className="logout-button"
          onClick={logOut}
        >
          Cerrar sesión
        </Button>
      </li>
      </ul>
      </div>
      <div className={`menu-overlay ${menuVisible ? 'show' : ''}`} onClick={toggleMenu}></div>
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
    </div>

  );
};

export default Header;
