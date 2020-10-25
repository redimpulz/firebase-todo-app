import React from 'react';
import { Layout } from 'antd';

const BaseLayout: React.FC = ({ children }) => (
  <Layout>
    <Layout style={{ height: '100vh' }}>
      <div style={{ padding: 24 }}>{children}</div>
    </Layout>
  </Layout>
);

export default BaseLayout;
