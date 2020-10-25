import React, { useState, useEffect } from 'react';
import { Button, Switch } from 'antd';
import {
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { parseISO } from 'date-fns';

import Header from '@/components/atoms/Header';
import Space from '@/components/atoms/Space';

import firestore from '@/lib/db';

type Todo = {
  id: string;
  todo: string;
  isComplete: boolean;
  date: string;
};

const Index: React.FC = () => {
  // state
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (todo) {
      firestore.collection('todos').add({
        todo,
        isComplete: false,
        date: new Date(),
      });
      setTodo('');
    }
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof e.target.value !== 'string') return;
    setTodo(e.target.value);
  };

  useEffect(() => {
    firestore.collection('todos').onSnapshot((collection) => {
      const data = collection.docs.map((doc) => ({
        id: doc.id,
        todo: doc.data().todo as string,
        isComplete: doc.data().isComplete as boolean,
        date: doc.data().date as string,
      }));
      setTodos(data);
    });
  }, []);

  const onTodoStatusChange = (id: string, checked: boolean) => {
    const target = todos.find((x) => x.id === id);
    if (target)
      firestore
        .collection('todos')
        .doc(id)
        .update({ ...target, isComplete: checked });
  };

  const onDelete = (id: string) => {
    const target = todos.find((x) => x.id === id);
    if (target) firestore.collection('todos').doc(id).delete();
  };

  const sortedTodos = todos.sort((a, b) =>
    parseISO(a.date) > parseISO(b.date) ? 1 : 0
  );

  return (
    <div className="container mx-auto">
      <Header>Firebase TODO App</Header>
      <Space />

      <div className="mt-10 sm:mt-0">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label
                  htmlFor="street_address"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Todo
                </label>
                <input
                  id="todo"
                  className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  placeholder="Add Todo"
                  value={todo}
                  onChange={onTextChange}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Button type="primary" onClick={addTodo}>
              Add
            </Button>
          </div>
        </div>

        <Space />

        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Task
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTodos.map((x, i: number) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <Switch
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<CloseOutlined />}
                          defaultChecked
                          checked={x.isComplete}
                          onChange={(checked) =>
                            onTodoStatusChange(x.id, checked)
                          }
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="text-sm leading-5 text-gray-900">
                      {x.todo}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                    <Button
                      type="dashed"
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={() => onDelete(x.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Index;
