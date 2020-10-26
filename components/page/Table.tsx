import React, { useState, useEffect } from 'react';
import { isBefore } from 'date-fns';
import { Table as AntTable, Switch, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import {
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { db } from '@/lib/firestore';

const createColumns = (
  handleTodoStatusChange: (id: string, checked: boolean) => void,
  handleDelete: (id: string) => void
): ColumnsType<TodoItem> => [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => {
      const el = (
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
          checked={record.isComplete}
          onChange={(checked) => handleTodoStatusChange(record.id, checked)}
        />
      );
      return el;
    },
  },
  {
    title: 'Task',
    dataIndex: 'todo',
    key: 'todo',
  },
  {
    dataIndex: 'delete',
    key: 'delete',
    render: (_, record) => {
      const el = (
        <Button
          type="dashed"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        />
      );
      return el;
    },
  },
];

type TodoItem = {
  id: string;
  todo: string;
  isComplete: boolean;
  date: Date;
};

const Table: React.FC = () => {
  // state
  const [todos, setTodos] = useState<TodoItem[]>([]);

  // init
  useEffect(() => {
    db.collection('todos').onSnapshot((collection) => {
      const data = collection.docs.map<TodoItem>((doc) => ({
        id: doc.id,
        todo: doc.data().todo,
        isComplete: doc.data().isComplete,
        date: doc.data().date,
      }));
      setTodos(data);
    });
  }, []);

  const handleTodoStatusChange = async (id: string, checked: boolean) => {
    const target = todos.find((x) => x.id === id);
    if (target)
      await db
        .collection('todos')
        .doc(id)
        .update({ ...target, isComplete: checked });
  };

  const handleDelete = (id: string) => {
    const target = todos.find((x) => x.id === id);
    if (target) db.collection('todos').doc(id).delete();
  };

  const sortedTodos = todos.sort((a, b) => (isBefore(a.date, b.date) ? -1 : 1));

  return (
    <AntTable
      dataSource={sortedTodos}
      columns={createColumns(handleTodoStatusChange, handleDelete)}
    />
  );
};

export default Table;
