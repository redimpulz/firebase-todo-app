import React, { useState } from 'react';
import { Button, Space } from 'antd';

import { db } from '@/lib/firestore';

import Form from './Form';
import Table from './Table';

const Main: React.FC = () => {
  // state
  const [task, setTask] = useState('');

  const addTodo = async () => {
    if (task) {
      await db.collection('todos').add({
        todo: task,
        isComplete: false,
        date: new Date(),
      });
      setTask('');
    }
  };

  const handleToDoTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTask(e.target.value);

  return (
    <>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className="form-wrap">
          <Form value={task} onChange={handleToDoTextChange} />
          <div className="btn-wrap">
            <Button type="primary" onClick={addTodo}>
              Add
            </Button>
          </div>
        </div>
        <Table />
      </Space>
      <style jsx>{`
        .form-wrap {
          display: flex;
          flex-direction: column;
          margin-bottom: 5%;
          padding: 3rem;
          background-color: white;
        }
        .btn-wrap {
          margin-top: 1rem;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </>
  );
};

export default Main;
