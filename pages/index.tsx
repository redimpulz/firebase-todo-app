import React from 'react';

import Header from '@/components/atoms/Header';
import Space from '@/components/atoms/Space';
import Main from '@/components/page/Main';

const Index = () => {
  return (
    <div className="container mx-auto">
      <Header>Firebase TODO App</Header>
      <Space />
      <Main />
    </div>
  );
};

export default Index;
