import React, { useEffect } from 'react';
import { Form as AntForm, Input, Button } from 'antd';

const initialValues = {
  todo: '',
};

type Props = {
  onSubmit: (value: typeof initialValues) => void;
  todo?: string;
  resetFlag?: boolean;
};

const Form: React.FC<Props> = ({ onSubmit, todo, resetFlag }) => {
  const [form] = AntForm.useForm();

  useEffect(() => {
    resetFlag && form.resetFields();
  }, [resetFlag]);

  initialValues.todo = todo || '';

  const btnTitle = todo ? 'update' : 'Add';

  return (
    <>
      <AntForm form={form} initialValues={initialValues} onFinish={onSubmit}>
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
            {btnTitle}
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
