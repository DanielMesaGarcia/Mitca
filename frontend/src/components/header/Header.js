import React, { useState } from 'react';
import './Header.css'; // Archivo de estilos CSS personalizado
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const logOut = () => {
    // Borrar el token del almacenamiento local
    localStorage.removeItem('token');
    // Redirigir a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <div className="header-container">
      <div className={`menu ${menuVisible ? 'show' : ''}`} onClick={toggleMenu}>
        <ul>
          <li>Ruta 1</li>
          <li>Ruta 2</li>
          <li>Ruta 3</li>
          <Button type="primary" className="logout-button" onClick={logOut}>
          Cerrar sesión
        </Button>
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
