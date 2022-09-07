import React, {FC} from 'react';

interface IClickImageProps {
  src: string,
  onClick?: (e: React.MouseEvent) => void
  alt?: string
}

const ClickImage: FC<IClickImageProps> = ({src, onClick, alt = 'damaged'}) => {
  return (
    <img onClick={onClick} src={src} alt={alt}/>
  );
};

export default ClickImage;
