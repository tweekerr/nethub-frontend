import React, {FC} from "react";
import {StyledButton} from "../styled";

interface IFacebookAuthProps {
  onClick: (e: React.MouseEvent) => void
}

const FacebookAuthButton: FC<IFacebookAuthProps> = ({onClick}) => {
  return (
    <StyledButton onClick={onClick}>
      <img
        style={{height: '25px', width: '25px', marginRight: '10px'}}
        src="https://www.freepnglogos.com/uploads/facebook-logo-icon/facebook-logo-clipart-flat-facebook-logo-png-icon-circle-22.png"
        alt="Google Login"
      />
      Facebook
    </StyledButton>
  );
};

export default FacebookAuthButton;
