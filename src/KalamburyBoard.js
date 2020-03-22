import React from "react";

const KalamburyBoard = ({ G }) => {

  const { phrase } = G;

  return (
    <div>
      <h1>Your phrase is: {phrase}</h1>
    </div>
  )
}

export default KalamburyBoard;