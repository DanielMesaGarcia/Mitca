import React, { useState } from 'react';
import { Input, Button, Switch, Modal, Form } from 'antd';
import './Signin.css'; // Archivo de estilos CSS personalizado
import { Link, useNavigate } from 'react-router-dom';
import signInService from '../../services/signInService'; // Import the provided signInService
import UserService from '../../services/logInService';

import { regSw, subscribe } from '../../services/helper';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    DNI: '',
  });
  const [form2] = Form.useForm();
  const [formData2, setFormData2] = useState({});


  //IMPLEMENTAR CUADRADITO PARA QUE SI QUIERO RECIBIR NOTIFICACIONES


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (isCreateCompany) {
      signInService.createCompany(formData, formData2).then(async (data) => {
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
    } else {
      // Call the createUser function from the signInService
      signInService.createUser(formData).then(async (data) => {
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
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder]: e.target.value,
    });
  };

  const [isCreateCompany, setIsCreateCompany] = useState(false); // Nuevo estado para controlar la lógica del botón

  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setIsCreateCompany(false);
  };

  const handleSwitchChange = (checked) => {
    const value=checked;
    setIsCreateCompany(value);
  };

  const handleOk = async () => {
    const values=form2.getFieldsValue();
    setIsModalVisible(false);
    setFormData2(values);
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

          <Button type="primary" htmlType="submit" className="Signin-button">
            Crear cuenta
          </Button>

          <Button type="primary" className="Signin-button" onClick={showModal}>
            Abrir Modal
          </Button>

          

        </form>
        <Modal
            title="Switch para createCompany"
            open={isModalVisible}
            onCancel={handleModalCancel}
            onOk={handleOk}
            footer={[
              <Button key="back" onClick={handleModalCancel}>
                Cancelar
              </Button>,
              <Button key="submit" type="primary" onClick={handleOk}>
                Confirmar
              </Button>,
            ]}
          >
            <p>Selecciona si deseas utilizar createCompany:</p>
            <Switch onChange={handleSwitchChange} />

            <Form
              form={form2}
            // Agrega otros props necesarios para tu formulario
            >
              <Form.Item
                name="_id"
                label="CIF"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingresa el CIF',
                  },
                  // Puedes agregar la validación personalizada aquí
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="companyName"
                label="Nombre de la empresa"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, ingresa el nombre de la empresa',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="typeCompany"
                label="Tipo de empresa"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, selecciona el tipo de empresa',
                  },
                ]}
              >
                <Input />
              </Form.Item>

            </Form>

          </Modal>
      </div>
    </div>
  );
};

export default Signin;

