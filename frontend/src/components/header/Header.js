import React, { useState } from 'react';
import './Header.css'; // Archivo de estilos CSS personalizado

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="header-container">
      <div className={`menu ${menuVisible ? 'show' : ''}`} onClick={toggleMenu}>
        <ul>
          <li>Ruta 1</li>
          <li>Ruta 2</li>
          <li>Ruta 3</li>
          <li>Ruta 4</li>
          {/* Agrega más rutas según sea necesario */}
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
