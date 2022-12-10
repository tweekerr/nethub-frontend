import React from 'react';
import {Input} from "@chakra-ui/react";
import {LFC2} from "../components/Layout/LFC";

const TestSpace: LFC2 = () => {

  return {
    Center: {
      Render: <>
        <Input
          isInvalid
          errorBorderColor='red.300'
        />
      </>
    },
    ContextProvider: React.Fragment
  }
}


export default TestSpace;
