import React, { createContext, useContext } from "react";

export const BoardGameContext = createContext({});

export const BoardGameProvider = ({ children, ...props }) => {
  return (
    <BoardGameContext.Provider
      value={{
        ...props,
      }}
    >
      {children}
    </BoardGameContext.Provider>
  );
};

export const useBoardGame = () => {
  const boardGame = useContext(BoardGameContext);
  return boardGame;
};
