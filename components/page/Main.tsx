import React, { useState } from 'react';
import { Button } from 'antd';

import { db } from '@/lib/firestore';

import Space from '@/components/atoms/Space';
import Form from './Form';
import Table from './Table';

const Index: React.FC = () => {
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
      <div className="mt-10 sm:mt-0">
        <div className="shadow overflow-hidden sm:rounded-md">
          <Form value={task} onChange={handleToDoTextChange} />
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Button type="primary" onClick={addTodo}>
              Add
            </Button>
          </div>
        </div>

        <Space />

        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <Table />
        </div>
      </div>
    </>
  );
};

export default Index;
