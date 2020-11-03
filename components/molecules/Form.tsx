import React from 'react';
import { Form as AntForm, Input, Button } from 'antd';

const initialValues = {
  todo: '',
};

type Props = {
  onSubmit: (todo: string) => Promise<unknown>;
  todo?: string;
};

const Form: React.FC<Props> = ({ onSubmit, todo = initialValues.todo }) => {
  const [form] = AntForm.useForm();

  const handleFinish = async ({ todo }: typeof initialValues) => {
    await onSubmit(todo);
    form.resetFields();
  };

  return (
    <>
      <AntForm form={form} initialValues={{ todo }} onFinish={handleFinish}>
        <AntForm.Item
          className="input-wrap"
          label="Todo"
          name="todo"
          rules={[{ required: true, message: 'Todoを入力してください' }]}
        >
          <Input placeholder="Add Todo" />
        </AntForm.Item>
        <div className="btn-wrap">
          <Button type="primary" htmlType="submit">
            {todo ? 'update' : 'Add'}
          </Button>
        </div>
      </AntForm>

      <style jsx>{`
        .btn-wrap {
          margin-top: 1rem;
          display: flex;
          justify-content: flex-end;
        }
        .input-wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Form;
