import React from 'react';
import Layout from "../components/Layout/Layout";
import {Input} from "@chakra-ui/react";

const TestSpace = () => {
  return (
    <Layout>
      <Input
        isInvalid
        errorBorderColor='red.300'
      />
    </Layout>
  );
};

export default TestSpace;
