import React from "react";

const PlayerList = (props) => {

  return (
    <>
      {Object.keys(props.players).map((key) => (
        <div key={key}>{props.players[key].name}</div>
      ))}
    </>
  );
};

export default PlayerList;
