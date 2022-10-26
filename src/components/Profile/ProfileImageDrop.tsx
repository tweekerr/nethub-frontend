import React, {FC, useState} from 'react';
import {Typography} from "@mui/material";
import SvgSelector from "../basisComps/SvgSelector/SvgSelector";
import {FilledDiv} from '../basisComps/Basic.styled';

interface IProfileImageDropProps {
  onDrop: (e: React.DragEvent<HTMLSpanElement>) => Promise<void>,
}

const ProfileImageDrop: FC<IProfileImageDropProps> = ({onDrop}) => {

  const [drag, setDrag] = useState<boolean>(false);

  const handleDrop = async (e: React.DragEvent<HTMLSpanElement>) => {
    await onDrop(e);
    setDrag(false);
  }


  const handleDragStart = (e: React.DragEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setDrag(true);
  }

  const handleDragLeave = (e: React.DragEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setDrag(false);
  }



  return (
    <FilledDiv
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragStart}
      onDrop={handleDrop}
      background={drag ? 'lightgray' : '#FFFFFF'} padding={'33px 76px'}
    >
      <Typography
        color={'#838383'}
        fontWeight={700}
        variant={'inherit'}
      >
        {drag ? 'Відпустіть для відправки' : 'Перетягніть фото сюди'}
      </Typography>
      <SvgSelector id={'Dnd'}/>
    </FilledDiv>
  );
};

export default ProfileImageDrop;
