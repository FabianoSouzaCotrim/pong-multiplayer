import React, { useState } from "react";

const Chat = (props) => {
  const [messageToSend, setMessageToSend] = useState('');

  return (
    <>
      <div>{props.messages}</div>
      <input type="text" value={messageToSend} onChange={(e) => setMessageToSend(e.target.value)} />
      <button onClick={()=> props.sendMessage(messageToSend)}>Enviar</button>
    </>
  );
};

export default Chat;
