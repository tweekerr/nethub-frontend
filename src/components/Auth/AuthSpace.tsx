import React from 'react';
import Layout from "../Layout/Layout";
import Login from "./Login";

export const AuthSpace = () => {

  return (
    <Layout showSidebar={false}>
      <Login/>
    </Layout>
  );
};
