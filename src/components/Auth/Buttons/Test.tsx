import React, {FC, useEffect, useRef} from 'react';

interface ITestProps {
  botName: string
  buttonSize: "large" | "medium" | "small",
  cornerRadius?: number | null,
  widgetVersion: number,
  dataAuthUrl?: string
}

const Test: FC<ITestProps> = ({
                                botName,
                                buttonSize,
                                cornerRadius,
                                widgetVersion,
                                dataAuthUrl
                              }) => {
  const instance = useRef<HTMLDivElement>(null);

  useEffect(() => {
    instance.current?.appendChild(script);
  },[]);

  function onAuth(user: any) {
    console.log(user);
  }

  const script = document.createElement("script");
  script.src = "https://telegram.org/js/telegram-widget.js?" + widgetVersion;
  script.setAttribute("data-telegram-login", botName);
  script.setAttribute("data-size", buttonSize);
  if (cornerRadius) {
    script.setAttribute("data-radius", cornerRadius.toString());
  }
  script.setAttribute(
    "data-onauth",
    "Test.onAuth(user)"
  );
  script.async = true;

  return (
    <div ref={instance}>
      Test
    </div>
  );
}

export default Test;

