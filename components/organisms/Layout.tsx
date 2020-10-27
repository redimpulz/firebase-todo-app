import React from 'react';
import { Layout as AntLayout } from 'antd';

const Layout: React.FC = ({ children }) => (
  <AntLayout style={{ minHeight: '100vh' }}>
    <div style={{ padding: '2.5rem' }}>
      <div className="container">{children}</div>
    </div>
    <style jsx>{`
      .container {
        margin: 2.5rem 10rem;
      }
    `}</style>
  </AntLayout>
);

export default Layout;
