import React from 'react';
import Layout from "../components/Layout/Layout";
import {Input} from "@chakra-ui/react";
import {LFC} from "../components/Layout/LFC";

const TestSpace: LFC = () =>
  <>
    <Input
      isInvalid
      errorBorderColor='red.300'
    />
  </>;

export default TestSpace;
