import React, {FC} from 'react';
import {StyledButton} from "../styled";

interface IGoogleAuthProps {
  onClick: (e: React.MouseEvent) => void
}

const GoogleAuthButton: FC<IGoogleAuthProps> = ({onClick}) => {
  return (
    <StyledButton onClick={onClick}>
      <img
        style={{height: '25px', width: '25px', marginRight: '10px'}}
        src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
        alt="Google Login"
      />
      Google
    </StyledButton>
  );
};

export default GoogleAuthButton;
