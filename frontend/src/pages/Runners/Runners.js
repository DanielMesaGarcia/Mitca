import React, { useState, useEffect } from 'react';
import { Table, Form, Input, Button } from 'antd';
import RunnerService from '../../services/runnerService';
import Header from '../../components/header/Header';
import { useParams } from 'react-router-dom';
import { Transfer } from 'antd';



const RunnersPage = () => {
  const [runners, setRunners] = useState([]);
  const [userRunners, setUserRunners] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem('token');

  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

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
  ];


  useEffect(() => {
    const fetchRunners = async () => {
      try {
        const response = await RunnerService.getDataById(id);
        const userResponse = await RunnerService.getUserByToken(token);
        const data = response.data.runners;
        const userData = userResponse.data.runners;
        if (data && userData) {
          setRunners(data);
          setUserRunners(userData);

          // Calcular initialTargetKeys
          const initialTargetKeys = userData
            .filter((userRunner) => data.some((runner) => runner._id === userRunner._id))
            .map((userRunner) => userRunner._id);

          // Establecer initialTargetKeys como datos iniciales para targetKeys
          setTargetKeys(initialTargetKeys);
        } else {
          console.error('Error fetching runners:', response && response.error);
        }
      } catch (error) {
        console.error('Error fetching runners:', error);
      }
    };

    fetchRunners();
  }, [id, token]);

  
  let runnerBuffer = [];

  for (const runner of runners) {
    runnerBuffer.push(runner._id);
  }
  //VAMOS A ACTUALIZAR RACE.RUNNERS CON ESTO


  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);

    setTargetKeys(nextTargetKeys);
  };
  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);

    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };



  const mockData = userRunners.map((item) => ({
    key: item._id,
    title: `${item.name} - ${item._id}`,
  }));


 


  return (

    <div className="page-container">
      <Header />
      <h1>Runners</h1>
      <Table dataSource={runners} columns={columns} rowKey="_id" />
      <Transfer
        dataSource={mockData}
        titles={['Source', 'Target']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        render={(item) => item.title}
      />

    </div>
  );
};

export default RunnersPage;