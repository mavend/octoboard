import React from "react";
import DrawArea from "./DrawArea";

const KalamburyBoard = ({ G }) => {

  const { phrase } = G;

  return (
    <div>
      <h1>Your phrase is: {phrase}</h1>
      <DrawArea width="800" height="600" />
    </div>
  )
}

export default KalamburyBoard;