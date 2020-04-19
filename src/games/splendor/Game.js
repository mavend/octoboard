import { INVALID_MOVE } from "boardgame.io/core";
import { mapValues, sum } from "lodash";
import { stripPhrase } from "utils/strings";
import cards from "./data/cards.json";
import { canBuyCard } from "./utils";
import { RESOURCES, RESOURCES_CONFIG } from "./config";

const REGULAR_RESOURCES = RESOURCES.filter((res) => res != "gold");
const CARDS_PER_LEVEL = 4;

function setupGame(ctx, setupData) {
  const G = {
    privateRoom: setupData && setupData.private,
    actionsCount: 0,
    players: {},
    points: Array(ctx.numPlayers).fill(0),
    actions: [],
    deck: mapValues(cards, ctx.random.shuffle),
    table: mapValues(cards, () => Array(CARDS_PER_LEVEL).fill(null)),
    tokens: mapValues(RESOURCES_CONFIG, (res) => res.tokensCount[ctx.numPlayers]),
  };

  for (let i = 0; i < ctx.numPlayers; i++) {
    G.players[i] = {
      cards: Object.fromEntries(REGULAR_RESOURCES.map((res) => [res, 0])),
      tokens: Object.fromEntries(RESOURCES.map((res) => [res, 0])),
      reservedCards: [],
    };
  }

  return G;
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

function canTakeTokens(availableTokens, requestedTokens, playerTokens) {
  const playerTokensCount = sum(Object.values(playerTokens));
  const requestedCount = sum(Object.values(requestedTokens));
  const resources = Object.keys(requestedTokens).filter((res) => requestedTokens[res] > 0);

  const allowedResources = resources.every((res) => REGULAR_RESOURCES.includes(res));

  const withinLimit = playerTokensCount + requestedCount <= 10;

  const upToThreeDifferent =
    requestedCount <= 3 &&
    requestedCount === resources.length &&
    resources.every((res) => availableTokens[res] >= 1);

  const twoSame =
    requestedCount === 2 && resources.length === 1 && availableTokens[resources[0]] >= 4;

  return allowedResources && withinLimit && (upToThreeDifferent || twoSame);
}

function TakeTokens(G, ctx, requestedTokens) {
  if (!canTakeTokens(G.tokens, requestedTokens)) {
    return INVALID_MOVE;
  }

  for (const [res, count] of Object.entries(requestedTokens)) {
    G.tokens[res] -= count;
    G.players[ctx.currentPlayer].tokens += count;
  }

  ctx.events.endTurn();
}

function canBuyCard(tokens, cards, card) {
  let gold = player.tokens.gold;
  return Object.keys(card.cost).every((res) => {
    const available = player.tokens[res] + player.cards[res];
    const cost = card.cost[res];
    if (available >= cost) {
      return true;
    }
    if (available + gold >= cost) {
      gold -= cost - available;
      return true;
    }
    return false;
  });
}

function payForCard(player, card) {
  for (const [res, cost] of Object.entries(card.cost)) {
    const tokens = player.tokens[res];
    const cards = player.cards[res];
    if (tokens + cards >= cost) {
      player.tokens[res] -= cost - cards;
    } else {
      player.tokens.gold -= cost - (tokens + cards);
      player.tokens[res] = 0;
    }
  }
}

function BuyCard(G, ctx, level, cardIdx) {
  const player = G.players[ctx.currentPlayer];
  const { tokens, cards } = player;
  const card = G.table[level][cardIdx];
  if (!canBuyCard(tokens, cards, card)) {
    return INVALID_MOVE;
  }

  payForCard(player, card);

  player.cards[card.resource] += 1;
  G.points[ctx.currentPlayer] += card.points;
  G.table[level][cardIdx] = null;

  ctx.events.endTurn();
}

function BuyReserved(G, ctx, cardIdx) {
  const player = G.players[ctx.currentPlayer];
  const { tokens, cards } = player;
  const card = player.reservedCards[cardIdx];
  if (!canBuyCard(tokens, cards, card)) {
    return INVALID_MOVE;
  }

  payForCard(player, card);

  player.cards[card.resource] += 1;
  G.points[ctx.currentPlayer] += card.points;
  G.reservedCards = G.reservedCards.filter((c) => c != card);

  ctx.events.endTurn();
}

function ReserveCard(G, ctx, level, cardIdx) {
  const player = G.players[ctx.currentPlayer];
  const card = G.table[level][cardIdx];
  if (!card || player.reservedCards.length >= 3) {
    return INVALID_MOVE;
  }

  if (sum(Object.values(player.tokens)) < 10) {
    player.tokens.gold += 1;
  }
  player.reservedCards.push(card);
  G.table[level][cardIdx] = null;

  ctx.events.endTurn();
}

function DiscardToken(G, ctx, resource) {
  const player = G.players[ctx.currentPlayer];
  if (!player.tokens[resource] > 0) {
    return INVALID_MOVE;
  }

  player.tokens[resource] -= 1;
}

function addCardsToTheTable(G) {
  Object.keys(G.table).each((level) => {
    G.table[level] = G.table[level].map((card) => card || G.deck[level].pop() || null);
  });
}

export const Splendor = {
  name: "Splendor",
  image: "/images/games/splendor/icon.png",
  minPlayers: 2,
  maxPlayers: 4,

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
      moves: { TakeTokens, BuyCard, ReserveCard, DiscardToken, BuyReserved },
      turn: {
        onBegin: (G, ctx) => {
          addCardsToTheTable(G);
        },
      },
    },
  },

  endIf: (G, ctx) => {
    let winner = G.points.findIndex((points) => points >= 15);
    if (winner >= 0) {
      return { winner: winner };
    }
  },
};
