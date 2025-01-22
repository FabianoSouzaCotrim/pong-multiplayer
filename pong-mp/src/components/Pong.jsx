import React from "react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Pong = () => {
  const [players, setPlayers] = useState({});

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("Conectado!");
    });

    socket.on("playerRefresh", (players) => {
      setPlayers(players);
    });

    
    return () => {
      socket.disconnect();
      console.log("Socket desconectado.");
    };
  }, []);

  return (
    <>
      {Object.keys(players).map((key) => (
        <div key={key}>{players[key].name}</div>
      ))}
    </>
  );
};

export default Pong;
