import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Form: React.FC<Props> = (props) => {
  return (
    <>
      <div className="px-4 py-5 bg-white sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label className="block text-sm font-medium leading-5 text-gray-700">
              Todo
            </label>
            <input
              id="todo"
              className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              placeholder="Add Todo"
              {...props}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
