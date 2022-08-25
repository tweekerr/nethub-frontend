import React from 'react';

const Test2 = () => {
  function onTelegramAuth(user: any) {
    alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
  }

  return (
    <>
      <script async src="https://telegram.org/js/telegram-widget.js?19" data-telegram-login="nethub_official_bot"
              data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script>
    </>
  )
    ;
};

export default Test2;
