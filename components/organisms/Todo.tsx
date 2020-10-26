import React from 'react';
import { Button, Switch } from 'antd';
import {
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

export type TodoItem = {
  id: string;
  todo: string;
  isComplete: boolean;
  date: Date;
};

type Props = {
  todoItem: TodoItem;
  onSwitchChange: (id: string, checked: boolean) => void;
  onButtonClick: (id: string) => void;
};

const Todo: React.FC<Props> = ({ todoItem, onSwitchChange, onButtonClick }) => {
  const { id, isComplete, todo } = todoItem;
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-no-wrap">
          <div className="flex items-center">
            <div className="ml-4">
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                checked={isComplete}
                onChange={(checked) => onSwitchChange(id, checked)}
              />
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap">
          <div className="text-sm leading-5 text-gray-900">{todo}</div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
          <Button
            type="dashed"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => onButtonClick(id)}
          />
        </td>
      </tr>
    </>
  );
};

export default Todo;
