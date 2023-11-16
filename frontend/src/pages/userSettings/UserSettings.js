import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import './UserSettings.css';
import Header from '../../components/header/Header';
const UserSettings = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Aquí llama a tu servicio/API para obtener los datos del usuario
    // y actualiza el estado con setUserData
    // Ejemplo:
    // axios.get('/api/user')
    //   .then(response => setUserData(response.data))
    //   .catch(error => console.error(error));
  }, []);

  const handleFormSubmit = (values) => {
    // Aquí deberías enviar los datos actualizados del usuario a tu API
    // usando axios.post o axios.put
    // Ejemplo:
    // axios.put('/api/user', values)
    //   .then(response => console.log(response.data))
    //   .catch(error => console.error(error));
  };

  return (
    <>
    <Header/>
    
    <div className="account-settings-container">
      
      <Form
        name="account-settings"
        onFinish={handleFormSubmit}
        initialValues={userData}
      >
        <Form.Item label="Email" name="_id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="DNI" name="_id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Nombre" name="_id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Telefono" name="_id">
          <Input disabled />
        </Form.Item>
        {/* Agrega más campos para mostrar la información del usuario */}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Guardar cambios
          </Button>
        </Form.Item>
      </Form>

      <div className="buttons-container">
        <Button type="primary" size="large">
          Añadir corredores a mi cuenta
        </Button>
        <Button type="primary" size="large">
          Represento a una o más empresas y quiero hacer de patrocinador
        </Button>
      </div>
    </div>
    </>
  );
};

export default UserSettings;
