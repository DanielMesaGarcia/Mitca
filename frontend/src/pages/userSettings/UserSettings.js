import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Switch, Modal } from 'antd';
import './UserSettings.css';
import Header from '../../components/header/Header';
import UserService from '../../services/userService';
import { useNavigate } from 'react-router-dom';

const UserSettings = () => {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState({});
  const [formDisabled, setFormDisabled] = useState(true); // Estado para controlar si los inputs están deshabilitados
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getUserByToken(token);
        const data = response.data;
        if (data) {
          setUserData(data);
          form.setFieldsValue({
            _id: data._id,
            DNI: data.DNI,
            name: data.name,
            phone: data.phone,
            // Agrega más campos según sea necesario
          });
          if(data.role ==='sponsor'){
          form2.setFieldsValue({
            _id: data.sponsor._id,
            companyName: data.sponsor.companyName,
            typeCompany: data.sponsor.typeCompany,
            // Agrega más campos según sea necesario
          });
        }
        } else {
          console.error('Error fetching users:', response && response.error);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleFormSubmit = async () => {
    const values = form.getFieldsValue();
    UserService.updateUser(values._id, values);
    setFormDisabled(true);
  };

  const handleSwitchChange = (checked) => {
    setFormDisabled(!checked);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form2] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = form2.getFieldsValue();
    UserService.updateSponsor(userData.sponsor._id, values);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Puedes usar useEffect para actualizar el formulario cuando userData cambia
  useEffect(() => {
    form.setFieldsValue({
      _id: userData._id,
      companyName: userData.companyName,
      typeCompany: userData.typeCompany,
    });
  }, [userData, form]);


  const goToRunners = () =>{
    navigate('/runners');
  }
  return (
    <>
      <Header />

      <div className="account-settings-container">
        <Switch
          checked={!formDisabled}
          onChange={handleSwitchChange}
        />

        <Form
          form={form}
          name="account-settings"
          onFinish={handleFormSubmit}
        >
          <Form.Item label="Email" name="_id">
            <Input disabled={formDisabled} />
          </Form.Item>
          <Form.Item label="DNI" name="DNI">
            <Input disabled={formDisabled} />
          </Form.Item>

          <Form.Item label="Nombre" name="name">
            <Input disabled={formDisabled} />
          </Form.Item>
          <Form.Item label="Telefono" name="phone">
            <Input disabled={formDisabled} />
          </Form.Item>

          {/* ... (más elementos Form.Item según sea necesario) */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Guardar cambios
            </Button>
          </Form.Item>
        </Form>

        <div className="buttons-container">
          {userData.role === 'user' && (
            <Button onClick={goToRunners}>
              Gestionar corredores
            </Button>
          )}

          {userData.role === 'sponsor' && (
            <Button onClick={showModal}>
              Gestionar patrocinador
            </Button>
          )}
        </div>
        <Modal
        title="Título del Modal"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form2}
          onFinish={handleOk}
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
    </>
  );
};

export default UserSettings;
