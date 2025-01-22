import React from "react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import PlayerList from "./PlayerList";
import Chat from "./Chat";

let socket;

const Pong = () => {
  const [players, setPlayers] = useState({});
  const [messages, setMessages] = useState('')

  useEffect(() => {
    socket = io("http://localhost:4000");

    socket.on('connect', () => {
      console.log("Conectado!");
    });

    return () => {
      socket.disconnect();
      console.log("Socket desconectado.");
    };
  }, []);

  useEffect(() => {
    socket.on('PlayerRefresh', (players) => {
      setPlayers(players);
    });
  
    return () => {
      socket.off('PlayerRefresh');
    };
  }, []);
  

  useEffect(() => {
    socket.on('ReceiveMessage', (receivedMessage) => {
        setMessages(messages + receivedMessage + `\n\n`)
    })
  }, [messages])

  const sendMessage = (message) =>{
    socket.emit('SendMessage', message)
  }

  return (
    <>
        <PlayerList players={players}/>
        <Chat sendMessage={sendMessage} messages={messages}/>
    </>
  );
};

export default Pong;
