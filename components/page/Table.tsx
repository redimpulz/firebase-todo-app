import React, { useState, useEffect } from 'react';
import { isBefore } from 'date-fns';

import { db } from '@/lib/firestore';
import Todo, { TodoItem } from '@/components/organisms/Todo';

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
    <>
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
          {sortedTodos.map((x) => (
            <Todo
              key={x.id}
              todoItem={x}
              onSwitchChange={handleTodoStatusChange}
              onButtonClick={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
