import React from "react";
import { boolean, number, text, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { shuffle } from "lodash";
import { BoardGameProvider } from "contexts/BoardGameContext";
import cards from "../src/games/splendor/data/cards.json";

const ref = "Game Context";

const Kalambury = {
  gameName: "Kalambury",
  G: {
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
    players: { "0": { phrase: text("Phrase", "Baba z wozu", ref) }, "1": {} },
    canChangePhrase: boolean("Can change phrase?", true, ref),
  },
  moves: {
    Guess: action("Guess"),
    Ping: action("Ping"),
    UpdateDrawing: action("UpdateDrawing"),
    NotifyTimeout: action("NotifyTimeout"),
  },
};

const Splendor = {
  gameName: "Splendor",
  G: {
    table: {
      "1": shuffle(cards["1"]).slice(0, 4),
      "2": [...shuffle(cards["2"]).slice(0, 3), null],
      "3": shuffle(cards["3"]).slice(0, 4),
    },
    tokens: { edu: 7, water: 7, nature: 3, tech: 7, lab: 5, gold: 5 },
    points: [10, 3],
    players: {
      "0": {
        tokens: { edu: 0, water: 1, nature: 2, tech: 3, lab: 0, gold: 0 },
        cards: { edu: 0, water: 1, nature: 2, tech: 3, lab: 0 },
        reservedCards: [cards["2"][4], cards["1"][25]],
      },
      "1": {
        tokens: { edu: 1, water: 1, nature: 0, tech: 0, lab: 1, gold: 2 },
        cards: { edu: 2, water: 0, nature: 1, tech: 3, lab: 4 },
        reservedCards: [],
      },
    },
  },
};

const BoardGameContextMock = ({ children }) => {
  return (
    <BoardGameProvider
      {...select("Game", { Kalambury, Splendor }, Splendor, ref)}
      ctx={{
        activePlayers: [
          select("stage", ["draw", "guess", "wait", "manage", "match"], "draw", ref),
          "guess",
        ],
        phase: select("phase", ["wait", "play"], "play", ref),
        numPlayers: number("Player count", 4, { range: true, min: 2, max: 10, step: 1 }, ref),
      }}
      playerID={"0"}
      gameID={"qwe123"}
      rawClient={{ transport: { socket: null } }}
      gameMetadata={[
        { id: "0", name: "user-0", isConnected: true },
        { id: "1", name: "user-1", isConnected: true },
      ]}
    >
      {children}
    </BoardGameProvider>
  );
};

export default BoardGameContextMock;
