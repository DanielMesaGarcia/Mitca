import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import './UserSettings.css';
import Header from '../../components/header/Header';
import UserService from '../../services/userService';
const UserSettings = () => {
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const response = await UserService.getUserByToken(token);
        const data = response.data;
        console.log(data);
        if (data) {
          setUserData(data);
        } else {
          console.error('Error fetching users:', response && response.error);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

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
      <Header />

      <div className="account-settings-container">

        <Form
          name="account-settings"
          onFinish={handleFormSubmit}
          initialValues={{
            _id: userData._id,
            DNI: userData.DNI,
            name: userData.name,
            phone: userData.phone,
            // Add more fields as needed
          }}
        >
          <Form.Item label="Email" name="_id">
            <Input disabled />
          </Form.Item>
          <Form.Item label="DNI" name="DNI">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Nombre" name="name">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Telefono" name="phone">
            <Input disabled />
          </Form.Item>
          {/* Add more Form.Item components for additional fields */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
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
