import React from 'react';
import {Input} from "@chakra-ui/react";
import Layout, {Page} from "../components/Layout/Layout";
import Currency from "../components/Currency/Currency";

const TestSpace: Page = () => {

  return <Layout>
    <>
      <Input
        isInvalid
        errorBorderColor='red.300'
      />
    </>
    <Currency/>
  </Layout>
}

TestSpace.Provider = React.Fragment;


export default TestSpace;
