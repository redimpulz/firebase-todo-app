import React from 'react';
import { Layout } from 'antd';

const BaseLayout: React.FC = ({ children }) => (
  <Layout style={{ height: '100vh' }}>
    <div className="p-10">{children}</div>
  </Layout>
);

export default BaseLayout;
