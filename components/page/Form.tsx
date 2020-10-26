import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

type Props = InputProps;

const Form: React.FC<Props> = (props) => {
  return (
    <div className="input-wrap">
      <label>Todo:</label>
      <Input id="todo" placeholder="Add Todo" {...props} />
      <style jsx>{`
        .input-wrap {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        label {
          width: 10%;
        }
      `}</style>
    </div>
  );
};

export default Form;
