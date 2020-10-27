import React, { useState, useEffect } from 'react';
import { isBefore, format, formatISO } from 'date-fns';
import { Table as AntTable, Switch, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import {
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { db } from '@/lib/firestore';

const columns: ColumnsType<TodoItem> = [
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, { id, isComplete }) => {
      const el = (
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked
          checked={isComplete}
          onChange={(checked) =>
            db.collection('todos').doc(id).update({ isComplete: checked })
          }
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
    title: 'Created',
    dataIndex: 'date',
    key: 'date',
    render: (_, { date }) => formatISO(date),
  },
  {
    dataIndex: 'delete',
    key: 'delete',
    render: (_, { id }) => {
      const el = (
        <Button
          type="dashed"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => db.collection('todos').doc(id).delete()}
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
        date: doc.data().date.toDate(),
      }));
      setTodos(data);
    });
  }, []);

  const sortedTodos = todos.sort((a, b) => (isBefore(a.date, b.date) ? 1 : -1));

  return <AntTable rowKey="id" dataSource={sortedTodos} columns={columns} />;
};

export default Table;
