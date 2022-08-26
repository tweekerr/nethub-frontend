import React from 'react';
import loader from '../../../assets/Loader.gif';
import {Wrapper} from './styled';

interface ILoaderProps {
  height?: string;
  width?: string;
}

export const Loader: React.FC<ILoaderProps> = ({
                                                 height = 'auto',
                                                 width = 'auto',
                                               }) => {
  return (
    <Wrapper>
      <img style={{height, width}} src={loader} alt="Loader"/>
    </Wrapper>
  );
};
