import { PlayerView } from "boardgame.io/core";
import { getCardsDeck } from "./data/cards";
import { PluginActions } from "plugins/actions";

// This dictionary keeps track of number of pictures for each style
const styles = {
  circle: 68,
  color: 88,
  emoji: 88,
  lines: 84,
};

const modes = ["regular", "infinite"];

function randomizeCardLayout(ctx, pictures) {
  return {
    pictures: pictures,
    layout: Math.round(100 * ctx.random.Number()),
    rotation: 360 * ctx.random.Number(),
  };
}

function prepareDeck(ctx, mapping, picturesCount) {
  const shuffleAndMapPictures = (pictures) =>
    ctx.random.Shuffle(pictures).map((number) => mapping[number]);
  const picturesToCards = (pictures) => randomizeCardLayout(ctx, pictures);
  return ctx.random
    .Shuffle(getCardsDeck(picturesCount))
    .map(shuffleAndMapPictures)
    .map(picturesToCards);
}

function setupGame(ctx, setupData) {
  const G = {
    secret: {
      deck: [],
      used: [],
    },
    privateMatch: setupData && setupData.private,
    currentCard: { pictures: [], layout: 0, rotation: 0 },
    styles: Object.keys(styles),
    style: "color",
    pictures: [],
    modes: modes,
    mode: modes[0],
    picturesCount: 8,
    actionsCount: 0,
    players: {},
    points: Array(ctx.numPlayers).fill(0),
    maxPoints: 0,
    actions: [],
  };

  for (let i = 0; i < ctx.numPlayers; i++) {
    G.players[i] = {
      card: { pictures: [], layout: 0, rotation: 0 },
    };
  }

  return G;
}

function StartGame(G, ctx, style, mode, picturesCount) {
  G.style = style;
  G.mode = mode;
  G.picturesCount = picturesCount;
  G.pictures = ctx.random.Shuffle([...Array(styles[style]).keys()]).slice(0, 57);
  // Once this gets resolved https://github.com/nicolodavis/boardgame.io/issues/588
  // we could remove `client: false` from `StartGame` and perform deck setup in phase onBegin
  G.secret.deck = prepareDeck(ctx, G.pictures, G.picturesCount);
  G.secret.used = [];
  ctx.events.setPhase("play");
}

function Match(G, ctx, picture) {
  if (
    G.currentCard.pictures.indexOf(picture) < 0 ||
    G.players[ctx.playerID].card.pictures.indexOf(picture) < 0
  ) {
    return;
  }

  G.secret.used.push(G.players[ctx.playerID].card);
  G.points[ctx.playerID] += 1;
  G.currentCard = G.players[ctx.playerID].card;
  G.players[ctx.playerID].card = G.secret.deck.pop();

  if (G.secret.deck.length === 0 && G.mode === "infinite") {
    G.secret.deck = ctx.random
      .Shuffle(G.secret.used)
      .map(({ pictures }) => randomizeCardLayout(ctx, pictures));
    G.secret.used = [];
  }

  ctx.actions.clear();
  ctx.actions.log(ctx.playerID, "match", { picture, style: G.style });
}

export const PictureMatch = {
  name: "PictureMatch",
  image: "/images/games/picture-match/icon.png",
  minPlayers: 2,
  maxPlayers: 8,

  seed: process.env.NODE_ENV === "production" ? undefined : "test",
  setup: setupGame,
  plugins: [PluginActions()],

  phases: {
    wait: {
      start: true,
      next: "play",
      turn: {
        onBegin: (G, ctx) => {
          ctx.actions.log(ctx.currentPlayer, "manage");
        },
        activePlayers: { currentPlayer: "manage", others: "wait" },
        stages: {
          manage: {
            moves: {
              StartGame: {
                move: StartGame,
                client: false,
              },
            },
          },
          wait: {
            moves: {},
          },
        },
      },
    },
    play: {
      onBegin: (G, ctx) => {
        G.actions = [];
        G.currentCard = G.secret.deck.pop();
        if (G.mode !== "infinite") {
          G.maxPoints = Math.floor(G.secret.deck.length / ctx.numPlayers);
        }
        for (let i = 0; i < ctx.numPlayers; i++) {
          G.players[i].card = G.secret.deck.pop();
        }
      },
      turn: {
        activePlayers: { all: "match" },
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
    const winner = G.points.findIndex((points) => points >= G.maxPoints);
    if (G.mode !== "infinite" && G.maxPoints > 0 && winner >= 0) {
      return { winners: [winner] };
    }
  },

  playerView: PlayerView.STRIP_SECRETS,
};
