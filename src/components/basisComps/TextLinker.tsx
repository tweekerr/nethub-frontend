import React, {FC} from 'react';
import SvgSelector from './SvgSelector/SvgSelector';
import classes from './ВasicComps.module.sass';
import {Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";

//TODO: TO TSX
interface IBasicLinkerProps {
  onClick: () => void,
  placeholder: string,
  link: string,
  svgId?: string
}

const TextLinker: FC<IBasicLinkerProps> = ({onClick, placeholder, link, svgId}) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(link)} className={classes.basicLink}>
      <Typography color={'primary'}>{placeholder}</Typography>
      {svgId && <SvgSelector id={svgId}/>}
    </div>
  );
};

export default TextLinker;
