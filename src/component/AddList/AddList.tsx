// import React from "react";
import "./AddList.scss";

export default function AddList({ onExit }: { onExit: () => void }) {
  return (
    <>
      <div className={"tab"}>
        <button onClick={onExit}>X</button>
        <h3>Nouvelle Liste</h3>
        <button onClick={onExit}>X</button>
      </div>
      <div className={'items'}>

      </div>
    </>
  );
}
