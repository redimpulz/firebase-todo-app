import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { db } from '@/lib/firestore';
import Form from '@/components/page/Form';
import { TodoItem } from '@/types/todo';

type Props = {
  todoItem: TodoItem;
};

const Edit: React.FC<Props> = ({ todoItem }) => {
  // state
  const [isOpen, setIsOpen] = useState(false);

  const updateTodo = async (todo: string) => {
    await db.collection('todos').doc(todoItem.id).update({
      todo: todo,
      isComplete: todoItem.isComplete,
      date: todoItem.date,
    });
    setIsOpen(false);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button shape="circle" icon={<EditOutlined />} onClick={handleOpen} />
      <Modal title="Edit" visible={isOpen} onCancel={handleClose} footer={null}>
        <Form
          todo={todoItem.todo}
          onSubmit={({ todo }) => updateTodo(todo)}
          resetFlag={isOpen}
        />
      </Modal>
    </>
  );
};

export default Edit;
