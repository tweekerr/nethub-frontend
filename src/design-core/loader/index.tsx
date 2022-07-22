import React from 'react';
//@ts-ignore
import loader from 'assets/Loader.gif';
import { Wrapper } from './styled';

interface IProps {
  height?: string;
  width?: string;
}

export const Loader: React.FC<IProps> = ({
  height = 'auto',
  width = 'auto',
}) => {
  return (
    <Wrapper>
      <img style={{ height, width }} src={loader} alt="Loader" />
    </Wrapper>
  );
};
