import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import './UserSettings.css';
import Header from '../../components/header/Header';
import UserService from '../../services/userService';
const CompanySettings = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  

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
        <Form.Item label="CIF" name="_id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="CompanyName" name="_id">
          <Input disabled />
        </Form.Item>
        <Form.Item label="CompanyType" name="_id">
          <Input disabled />
        </Form.Item>
        {/* Agrega más campos para mostrar la información del usuario */}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Guardar cambios
          </Button>
        </Form.Item>
      </Form>
      </div>
    </>
  );
};

export default CompanySettings;
