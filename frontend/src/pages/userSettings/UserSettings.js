import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Switch, Modal } from 'antd';
import './UserSettings.css';
import Header from '../../components/header/Header';
import UserService from '../../services/userService';

const UserSettings = () => {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState({});
  const [formDisabled, setFormDisabled] = useState(true); // Estado para controlar si los inputs están deshabilitados
  const token = localStorage.getItem('token');

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
    console.log(values);
    UserService.updateUser(values._id, values);
    setFormDisabled(true);
  };

  const handleSwitchChange = (checked) => {
    setFormDisabled(!checked);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form2] = Form.useForm();
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [form3] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Aquí puedes agregar la lógica para create, update o delete según sea necesario
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal2 = () => {
    setIsModalVisible2(true);
  };

  const handleOk2 = () => {
    // Aquí puedes agregar la lógica para create, update o delete según sea necesario
    setIsModalVisible2(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

  // Puedes usar useEffect para actualizar el formulario cuando userData cambia
  useEffect(() => {
    form.setFieldsValue({
      _id: userData._id,
      companyName: userData.companyName,
      typeCompany: userData.typeCompany,
    });
  }, [userData, form]);

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
            <Button onClick={showModal2}>
              Botón para usuarios
            </Button>
          )}

          {userData.role === 'sponsor' && (
            <Button onClick={showModal}>
              Botón para sponsors
            </Button>
          )}
        </div>
        <Modal
        title="Título del Modal"
        visible={isModalVisible}
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

          {/* Agrega más campos según tus necesidades */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Crear/Actualizar
            </Button>
            <Button type="danger" onClick={() => console.log('Eliminar')}>
              Eliminar
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Título del Modal"
        visible={isModalVisible2}
        onOk={handleOk2}
        onCancel={handleCancel2}
      >
        <Form
          form={form3}
          onFinish={handleOk2}
          // Agrega otros props necesarios para tu formulario
        >
          <Form.Item
            name="_id"
            label="DNI"
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
            name="name"
            label="Nombre"
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
            label="Por hacer"
            rules={[
              {
                required: true,
                message: 'Por favor, selecciona el tipo de empresa',
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Agrega más campos según tus necesidades */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Crear/Actualizar
            </Button>
            <Button type="danger" onClick={() => console.log('Eliminar')}>
              Eliminar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      </div>
    </>
  );
};

export default UserSettings;
