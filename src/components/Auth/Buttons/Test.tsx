import React, {FC, useEffect, useRef} from 'react';

interface ITestProps {
  botName: string
  buttonSize: "large" | "medium" | "small",
  cornerRadius?: number | null,
  widgetVersion: number,
  dataAuthUrl?: string
}

const Test: FC = () => {
  function asd() {
    //@ts-ignore
    window.Telegram.Login.auth(
      {bot_id: '5533270293', request_access: true},
      (data: any) => {
        if (!data) {
          // authorization failed
        }

        // Here you would want to validate data like described there https://core.telegram.org/widgets/login#checking-authorization
        // doWhateverYouWantWithData(data);
        console.log(data)
      }
    );
  }


  const ref = useRef<HTMLDivElement>(null);

  //
  const script = document.createElement("script");
  script.src = "https://telegram.org/js/telegram-widget.js?19";
  // script.setAttribute("data-telegram-login", botName);
  // script.setAttribute("data-size", buttonSize);
  // if (cornerRadius) {
  //   script.setAttribute("data-radius", cornerRadius.toString());
  // }
  // script.setAttribute(
  //   "data-onauth",
  //   "Test.onAuth(user)"
  // );
  script.async = true;

  useEffect(() => {
    ref.current?.appendChild(script)
  }, [])

  return (
    <div ref={ref}>
      <button onClick={asd}>Telegram</button>
    </div>
  );
}

export default Test;

