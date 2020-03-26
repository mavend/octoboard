import { PlayerView, INVALID_MOVE } from "boardgame.io/core";
import proverbs from "./data/phrases/pl/proverbs.json";
import idioms from "./data/phrases/pl/idioms.json";
import nounPhrases from "./data/phrases/pl/noun_phrases.json";
import removeAccents from "remove-accents";

function setupKalambury(ctx, setupData) {
  const G = {
    secret: {
      phrase: "",
      startTime: new Date(),
      phrases: ctx.random.Shuffle([...proverbs, ...idioms, ...nounPhrases]),
    },
    canChangePhrase: true,
    players: {},
    playersData: {},
    points: Array(ctx.numPlayers).fill(0),
    drawing: [],
    actions: [],
    remainingSeconds: 120,
  };

  for (let i = 0; i < ctx.numPlayers; i++) {
    G.players[i] = {
      phrase: "",
    };
  }

  return G;
}

function stripPhrase(phrase) {
  return removeAccents(phrase).toLowerCase().replace(/\W/g, "");
}

function SendText(G, ctx, text) {
  const { playerID } = ctx;
  G.actions.push({
    time: Date.now(),
    playerID,
    action: "message",
    text: text,
  });
}

function Guess(G, ctx, phrase) {
  const { playerID, currentPlayer } = ctx;
  if (!phrase) {
    phrase = G.secret.phrase;
  } // DEBUG
  let success = stripPhrase(phrase).includes(stripPhrase(G.secret.phrase));
  G.actions.push({
    time: Date.now(),
    playerID,
    action: "guess",
    phrase,
    success,
  });

  if (success) {
    G.points[playerID] += 1;
    G.points[currentPlayer] += 1;
    ctx.events.endTurn();
  }
}

function SetNewPhrase(G, ctx) {
  G.secret.phrase = G.secret.phrases.pop();
  G.players[ctx.currentPlayer].phrase = G.secret.phrase;
  G.drawing = [];
}

function ChangePhrase(G, ctx) {
  // TODO: Track number of allowed changes?
  if (!G.canChangePhrase) {
    return INVALID_MOVE;
  }
  G.actions.push({
    time: Date.now(),
    playerID: ctx.playerID,
    action: "change",
    previous: G.secret.phrase,
  })
  G.canChangePhrase = false;
  SetNewPhrase(G, ctx);
}

function UpdateDrawing(G, _ctx, lines) {
  G.drawing = lines;
}

function Forfeit(G, ctx) {
  G.points[ctx.currentPlayer] -= 1;
  G.actions.push({
    time: Date.now(),
    playerID: ctx.playerID,
    action: "forfeit",
    previous: G.secret.phrase,
  })
  ctx.events.endTurn();
}

function Ping(G, { playerID, phase }, playerData) {
  if (phase === "play") { G.remainingSeconds = 120 - Math.floor((new Date() - G.secret.startTime) / 1000); }
  updatePlayersData(G, playerID, playerData);
}

function StartGame(G, ctx) {
  ctx.events.setPhase("play");
}

function updatePlayersData(G, playerID, playerData) {
  G.playersData[playerID] = {
    ...(G.playersData[playerID] || {}),
    ...playerData,
    lastActivity: new Date(),
    id: playerID,
  };
  Object.values(G.playersData).forEach((player) => {
    player.isActive = new Date() - player.lastActivity < 5000;
  });
}

function indexOfMax(array) {
  const maxValue = Math.max(...array);
  const maxIndexes = [];
  let index = array.indexOf(maxValue);
  while (index >= 0) {
    maxIndexes.push(index);
    index = array.indexOf(maxValue, index + 1);
  }
  return maxIndexes;
}

export const Kalambury = {
  name: "Kalambury",
  image: "/images/kalambury-icon.png",
  minPlayers: 2,
  maxPlayers: 10,

  seed: "test",
  setup: setupKalambury,

  phases: {
    wait: {
      start: true,
      next: "play",
      turn: {
        onBegin: (G, ctx) => {
          G.actions.push({
            time: Date.now(),
            playerID: ctx.currentPlayer,
            action: "manage",
          })
          ctx.events.setActivePlayers({ currentPlayer: "manage", others: "wait" });
        },
        stages: {
          manage: {
            moves: {
              SendText,
              StartGame,
              Ping: {
                move: Ping,
                client: false
              },
            },
          },
          wait: {
            moves: {
              SendText,
              Ping: { 
                move: Ping,
                client: false
              },
            },
          },
        },
      },
    },
    play: {
      turn: {
        onBegin: (G, ctx) => {
          G.secret.startTime = new Date();
          G.canChangePhrase = true;
          SetNewPhrase(G, ctx);
          G.remainingSeconds = 120;
          G.actions.push({
            time: Date.now(),
            playerID: ctx.currentPlayer,
            action: "draw",
          })
          ctx.events.setActivePlayers({ currentPlayer: "draw", others: "guess" });
        },
        onEnd: (G, ctx) => {
          if (G.remainingSeconds <= 0) {
            G.actions.push({
              time: Date.now(),
              playerID: ctx.currentPlayer,
              action: "timeout",
              previous: G.secret.phrase,
            })
            G.points[ctx.currentPlayer] -= 1;
          }
        },
        endIf: (G, _ctx) => G.remainingSeconds <= 0,
        order: {
          first: () => 0,
          next: (G, ctx) => {
            const activePlayersIdxs = Object.keys(G.playersData).filter(
              (pid) => G.playersData[pid].isActive
            );
            const nextActivePlayerIdx =
              (activePlayersIdxs.indexOf(ctx.currentPlayer) + 1) % activePlayersIdxs.length;
            return parseInt(activePlayersIdxs[nextActivePlayerIdx]);
          },
        },
        stages: {
          draw: {
            moves: {
              UpdateDrawing,
              ChangePhrase: {
                move: ChangePhrase,
                client: false,
              },
              Ping: {
                move: Ping,
                client: false,
              },
              Forfeit: {
                move: Forfeit,
                client: false,
              },
            },
          },
          guess: {
            moves: {
              Guess: {
                move: Guess,
                client: false,
              },
              Ping: {
                move: Ping,
                client: false,
              },
            },
          },
        },
      },
    }
  },

  endIf: (G, ctx) => {
    if (G.secret.phrases.length === 0 && !G.secret.phrase) {
      return { winners: indexOfMax(G.points) };
    }
  },

  playerView: PlayerView.STRIP_SECRETS,
};
