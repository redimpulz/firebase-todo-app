import React, { useState, useEffect } from 'react';
import { isBefore, formatISO } from 'date-fns';
import { Table as AntTable, Switch, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import {
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import Edit from '@/components/molecules/Edit';

import { firestore } from '@/lib/firebase';
import { Todo } from '@/types/todo';

const columns: ColumnsType<Todo> = [
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
            firestore
              .collection('todos')
              .doc(id)
              .update({ isComplete: checked })
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
    render: (_, { todo, isComplete }) => {
      const el = (
        <div style={{ textDecoration: isComplete ? 'line-through' : 'none' }}>
          {todo}
        </div>
      );
      return el;
    },
  },
  {
    title: 'Created',
    dataIndex: 'date',
    key: 'date',
    render: (_, { date }) => formatISO(date),
  },
  {
    title: 'edit',
    dataIndex: 'edit',
    key: 'edit',
    render: (_, todo) => {
      const el = <Edit todoItem={todo} />;
      return el;
    },
  },
  {
    title: 'delete',
    dataIndex: 'delete',
    key: 'delete',
    render: (_, { id }) => {
      const el = (
        <Button
          type="dashed"
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => firestore.collection('todos').doc(id).delete()}
        />
      );
      return el;
    },
  },
];

const Table: React.FC = () => {
  // state
  const [todos, setTodos] = useState<Todo[]>([]);

  // init
  useEffect(() => {
    firestore.collection('todos').onSnapshot((collection) => {
      const data = collection.docs.map<Todo>((doc) => ({
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
