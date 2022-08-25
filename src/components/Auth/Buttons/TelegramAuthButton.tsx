import React, {FC, useEffect, useRef} from 'react';
import {StyledButton} from "../styled";

interface ITelegramAuthButtonProps {
  onClick: (e: React.MouseEvent) => void
}

const TelegramAuthButton: FC<ITelegramAuthButtonProps> = ({onClick}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const script = document.createElement("script");
  script.src = "https://telegram.org/js/telegram-widget.js?19";
  script.async = true;

  useEffect(() => {
    ref.current?.appendChild(script)
  }, [])

  return (
    <StyledButton ref={ref} onClick={onClick}>
      <img
        style={{height: '25px', width: '25px', marginRight: '10px'}}
        src="https://www.freepnglogos.com/uploads/telegram-logo-2.png"
        alt="Telegram Login"
      />
      Telegram
    </StyledButton>
  );
}

export default TelegramAuthButton;

