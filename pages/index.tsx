import React from 'react';

import Main from '@/components/page/Main';

const Index = () => {
  return (
    <div className="container">
      <div className="ttl-wrap">
        <h1 className="bold">Firebase TODO App</h1>
      </div>
      <Main />
      <style jsx>{`
        .container {
          margin: 2.5rem 10rem;
        }
        .ttl-wrap {
          margin-bottom: 5%;
        }
        .bold {
          font-size: 2rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Index;
