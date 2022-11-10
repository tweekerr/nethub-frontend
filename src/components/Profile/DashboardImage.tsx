import React, {FC, useEffect, useState} from 'react';
import cl from "./Profile.module.sass";
import SvgSelector from "../UI/SvgSelector/SvgSelector";
import {useAppSelector} from "../../store/storeConfiguration";
import {createImageFromInitials} from "../../utils/logoGenerator";
import {Image} from "@chakra-ui/react";

interface IDashboardImageProps {
  openModal: () => void,
  handleDrop: (e: React.DragEvent<HTMLSpanElement>) => Promise<void>,
}

const DashboardImage: FC<IDashboardImageProps> = ({openModal, handleDrop: onDrop}) => {

  const {user} = useAppSelector(state => state.generalReducer);
  const [drag, setDrag] = useState<boolean>(false);
  const getImage = () => user.profilePhotoLink ?? createImageFromInitials(500, user.username);
  const [image, setImage] = useState<string>(getImage());

  useEffect(() => {
    setImage(getImage())
  }, [user.profilePhotoLink])

  const handleImageError = () => {
    setImage(createImageFromInitials(500, user.username));
  }

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
    <div
      onDragStart={handleDragStart}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragStart}
      onDrop={handleDrop}
      className={`${cl.dashboardMainImage} + ${drag ? cl.darkFilter : ''}`} onClick={openModal}
    >
      <Image
        src={image}
        minH={110}
        minW={110}
        onError={handleImageError}
        alt={'damaged'}
      />
      <SvgSelector id={'DriveFileRenameOutlineIcon'}/>
    </div>
  );
};

export default DashboardImage;
