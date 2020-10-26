import React from 'react';
import { Layout } from 'antd';

const BaseLayout: React.FC = ({ children }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <div style={{ padding: '2.5rem' }}>{children}</div>
  </Layout>
);

export default BaseLayout;
