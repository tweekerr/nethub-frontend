import React from 'react';
import {Input} from "@chakra-ui/react";
import Layout, {Page} from "../components/Layout/Layout";

const TestSpace: Page = () => {

  return <Layout>
    <>
      <Input
        isInvalid
        errorBorderColor='red.300'
      />
    </>
  </Layout>
}

TestSpace.Provider = React.Fragment;


export default TestSpace;
