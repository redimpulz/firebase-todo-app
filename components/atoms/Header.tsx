import React from 'react';

const Header: React.FC = ({ children }) => (
  <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
    {children}
  </h2>
);

export default Header;
