import { PlayerView } from "boardgame.io/core";
import cards from "./data/cards/8.json";
import removeAccents from "remove-accents";

function prepareDeck(ctx) {
  const mapping = ctx.random.Shuffle([...Array(88).keys()]).slice(0, 57);
  let shuffleAndMapPictures = (pictures) => {
    return ctx.random.Shuffle(pictures).map((number) => mapping[number]);
  };
  let picturesToCards = (pictures) => {
    return {
      pictures: pictures,
      layout: Math.round(100 * ctx.random.Number()),
      rotation: 360 * ctx.random.Number(),
    };
  };
  return ctx.random.Shuffle(cards).map(shuffleAndMapPictures).map(picturesToCards);
}

function setupGame(ctx, setupData) {
  const G = {
    secret: {
      deck: prepareDeck(ctx),
    },
    privateRoom: setupData && setupData.private,
    currentCard: { pictures: [], layout: 0, rotation: 0 },
    actionsCount: 0,
    players: {},
    points: Array(ctx.numPlayers).fill(0),
    maxPoints: cards.length,
    actions: [],
  };

  for (let i = 0; i < ctx.numPlayers; i++) {
    G.players[i] = {
      card: { pictures: [], layout: 0, rotation: 0 },
    };
  }

  return G;
}

function stripPhrase(phrase) {
  return removeAccents(phrase).toLowerCase().replace(/\W/g, "");
}

function LogAction(G, ctx, playerID, action, params = {}, clear = false) {
  if (clear) {
    G.actions = [];
  }
  G.actions.push({
    time: Date.now(),
    id: G.actionsCount++,
    playerID,
    action,
    ...params,
  });
}

function SendText(G, ctx, text) {
  if (!stripPhrase(text)) return;
  LogAction(G, ctx, ctx.playerID, "message", { text: text });
}

function StartGame(G, ctx) {
  ctx.events.setPhase("play");
}

function Match(G, ctx, picture) {
  if (
    G.currentCard.pictures.indexOf(picture) < 0 ||
    G.players[ctx.playerID].card.pictures.indexOf(picture) < 0
  ) {
    return;
  }

  G.points[ctx.playerID] += 1;
  G.currentCard = G.players[ctx.playerID].card;
  G.players[ctx.playerID].card = G.secret.deck.pop();

  LogAction(G, ctx, ctx.playerID, "guess", { phrase: `Matched: ${picture}`, success: true });
}

export const PictureMatch = {
  name: "PictureMatch",
  image: "/images/games/picture-match/icon.png",
  minPlayers: 2,
  maxPlayers: 8,

  seed: process.env.NODE_ENV === "production" ? undefined : "test",
  setup: setupGame,

  phases: {
    wait: {
      start: true,
      next: "play",
      turn: {
        onBegin: (G, ctx) => {
          LogAction(G, ctx, ctx.currentPlayer, "manage");
          ctx.events.setActivePlayers({ currentPlayer: "manage", others: "wait" });
        },
        stages: {
          manage: {
            moves: {
              SendText: {
                move: SendText,
                unsafe: true,
              },
              StartGame,
            },
          },
          wait: {
            moves: {
              SendText: {
                move: SendText,
                unsafe: true,
              },
            },
          },
        },
      },
    },
    play: {
      turn: {
        onBegin: (G, ctx) => {
          G.actions = [];
          G.currentCard = G.secret.deck.pop();
          G.maxPoints = Math.floor(G.secret.deck.length / ctx.numPlayers);
          for (let i = 0; i < ctx.numPlayers; i++) {
            G.players[i].card = G.secret.deck.pop();
          }
          ctx.events.setActivePlayers({ all: "match" });
        },
        stages: {
          match: {
            moves: {
              Match: {
                move: Match,
                client: false,
              },
            },
          },
        },
      },
    },
  },

  endIf: (G, ctx) => {
    let winner = G.points.findIndex((points) => points >= G.maxPoints);
    if (winner >= 0) {
      return { winner: winner };
    }
  },

  playerView: PlayerView.STRIP_SECRETS,
};
