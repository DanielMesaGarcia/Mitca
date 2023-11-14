import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button } from 'antd';
import RunnerService from '../../services/runnerService';
import Header from '../../components/header/Header';
import { useParams } from 'react-router-dom';

const RunnersPage = () => {
    const [runners, setRunners] = useState([]);
    const [form] = Form.useForm();
    const { id } = useParams();
  
    const columns = [
      {
        title: 'DNI',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Mail',
        dataIndex: 'mail',
        key: 'mail',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Details',
        dataIndex: 'details',
        key: 'details',
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        key: 'actions',
        render: (_, record) => (
          <div>
            <Button onClick={() => handleDelete(record._id)}>Delete</Button>
            <Button onClick={() => handleUpdate(record._id)}>Update</Button>
          </div>
        ),
      },
    ];
  
    useEffect(() => {
      const fetchRunners = async () => {
        try {
          const response = await RunnerService.getDataById(id);
          const data = response.data.runners;
          if (data) {
            setRunners(data);
          } else {
            console.error('Error fetching runners:', response && response.error);
          }
        } catch (error) {
          console.error('Error fetching runners:', error);
        }
      };
    
      fetchRunners();
    }, [id]);
  
    const addRunner = async (values) => {
      const formattedValues = { ...values, _id: values.DNI };
      delete formattedValues.DNI;
      try {
        await RunnerService.addRunner(formattedValues);
        await RunnerService.addRunnerToRace(formattedValues._id, id);
        const response = await RunnerService.getDataById(id);
        const data = response.data.runners;
        setRunners(data);
        
        form.resetFields();
      } catch (error) {
        console.error('Error adding runner:', error);
      }
    };
  
    const handleUpdate = async (id) => {
        try {
            const values = form.getFieldsValue();
            const updatedRunner = { ...values, _id: values.DNI };
            delete updatedRunner.DNI;
            await RunnerService.updateRunner(id, updatedRunner);
            const response = await RunnerService.getDataById(id);
            setRunners(response);
            
            form.resetFields();
        } catch (error) {
            console.error('Error updating runner:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await RunnerService.deleteRunner(id);
            const response = await RunnerService.getRunners();
            setRunners(response);
            
        } catch (error) {
            console.error('Error deleting runner:', error);
        }
    };


    return (
      
        <div className="page-container">
          <Header/>
          <h1>Runners</h1>
          <Table dataSource={runners} columns={columns} rowKey="_id" />
    
          <Form form={form} name="add_runner" className="form-container" onFinish={addRunner}>
            <Form.Item name="DNI" label="DNI" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
    
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
    
            <Form.Item name="mail" label="Mail" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
    
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
    
            <Form.Item name="details" label="Details">
              <Input.TextArea />
            </Form.Item>
    
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Runner
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    };

    export default RunnersPage;