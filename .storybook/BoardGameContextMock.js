import React from "react";
import { boolean, number, text, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { BoardGameProvider } from "contexts/BoardGameContext";

const ref = "Game Context";

const BoardGameContextMock = ({ children }) => {
  return (
    <BoardGameProvider
      G={{
        timePerTurn: 120,
        turnEndTime:
          Math.floor(new Date().getTime() / 1000) +
          number(
            "Remaining seconds",
            100,
            {
              range: true,
              min: 0,
              max: 120,
              step: 1,
            },
            ref
          ),
        points: [10, 3],
        actions: [
          { action: "message", text: text("Message text", "Hello there, shall we begin?", ref) },
        ],
        privateRoom: boolean("Private", true, ref),
        players: {
          "0": {
            phrase: text("Phrase", "Baba z wozu", ref),
            card: { pictures: [], layout: 0, rotation: 0 },
          },
          "1": {},
        },
        canChangePhrase: boolean("Can change phrase?", true, ref),
        currentCard: { pictures: [], layout: 0, rotation: 0 },
      }}
      ctx={{
        activePlayers: [
          select("stage", ["draw", "guess", "wait", "manage", "match"], "draw", ref),
          "guess",
        ],
        phase: select("phase", ["wait", "play"], "play", ref),
        numPlayers: number("Player count", 4, { range: true, min: 2, max: 10, step: 1 }, ref),
      }}
      moves={{
        Guess: action("Guess"),
        Ping: action("Ping"),
        UpdateDrawing: action("UpdateDrawing"),
        NotifyTimeout: action("NotifyTimeout"),
      }}
      playerID={0}
      gameName={"Kalambury"}
      gameID={"qwe123"}
      rawClient={{ transport: { socket: null } }}
      gameMetadata={[
        { id: 0, name: "user-0", isConnected: true },
        { id: 1, name: "user-1", isConnected: false },
      ]}
    >
      {children}
    </BoardGameProvider>
  );
};

export default BoardGameContextMock;
