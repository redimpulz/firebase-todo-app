import React from 'react';
import { AppProps } from 'next/app';

import { ConfigProvider } from 'antd';
import jaJP from 'antd/lib/locale-provider/ja_JP';

import 'antd/dist/antd.css';
import '@/styles/global.css';

import Layout from '@/components/organisms/BaseLayout';

const MyApp = (app: AppProps) => {
  const { Component, pageProps } = app;

  return (
    <>
      <ConfigProvider locale={jaJP}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigProvider>
    </>
  );
};

export default MyApp;
