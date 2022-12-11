import { INVALID_MOVE, TurnOrder } from "boardgame.io/core";
import { CustomGame } from "games/types";
import { mapValues, sum } from "lodash";
import cards from "./data/cards.json";
import bonuses from "./data/bonuses.json";
import { canBuyCard, canTakeBonus, fromEntries } from "./utils";
import { RESOURCES, RESOURCES_CONFIG, WINNING_POINTS } from "./config";
import { PluginActions } from "plugins/actions";

const REGULAR_RESOURCES = RESOURCES.filter((res) => res !== "gold");
const CARDS_PER_LEVEL = 4;

function setupGame({ ctx, random }, setupData) {
  const G = {
    privateMatch: setupData && setupData.private,
    actionsCount: 0,
    players: {},
    points: Array(ctx.numPlayers).fill(0),
    actions: [],
    deck: mapValues(cards, random.Shuffle),
    table: mapValues(cards, () => Array(CARDS_PER_LEVEL).fill(null)),
    tokens: mapValues(RESOURCES_CONFIG, (res) => res.tokensCount[ctx.numPlayers - 1]),
    bonuses: random.Shuffle(bonuses).slice(0, ctx.numPlayers + 1),
  };

  for (let i = 0; i < ctx.numPlayers; i++) {
    G.players[i] = {
      cards: fromEntries(REGULAR_RESOURCES.map((res) => [res, 0])),
      tokens: fromEntries(RESOURCES.map((res) => [res, 0])),
      reservedCards: [],
      bonuses: [],
    };
  }

  return G;
}

function StartGame({ G, events }) {
  G.actions = [];
  events.setPhase("play", { next: "0" });
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

function checkBonusAndEndTurn({ G, ctx, events }) {
  const player = G.players[ctx.currentPlayer];
  if (G.bonuses.some((bonus) => canTakeBonus(player.cards, bonus))) {
    events.setStage("bonus");
  } else {
    events.endTurn();
  }
}

function TakeTokens({ G, ctx, events }, requestedTokens: Record<string, number>) {
  const player = G.players[ctx.currentPlayer];
  if (!canTakeTokens(G.tokens, requestedTokens, player.tokens)) {
    return INVALID_MOVE;
  }

  for (const [res, count] of Object.entries(requestedTokens)) {
    G.tokens[res] -= count;
    player.tokens[res] += count;
  }

  checkBonusAndEndTurn({ G, ctx, events });
}

function findCardOnTheTable(G, level, cardId) {
  return G.table[level].find((card) => card && card.id === cardId);
}

function removeCardFromTheTable(G, level, cardId) {
  G.table[level] = G.table[level].map((card) => (card && card.id === cardId ? null : card));
}

function payForCard(player, card, publicTokens) {
  for (const [res, cost] of Object.entries(card.cost as Record<string, number>)) {
    const tokens = player.tokens[res];
    const cards = player.cards[res];
    let tokensPaid = 0;
    let goldPaid = 0;
    if (tokens + cards >= cost) {
      tokensPaid = Math.max(cost - cards, 0);
    } else {
      tokensPaid = player.tokens[res];
      goldPaid = cost - (tokens + cards);
    }
    player.tokens[res] -= tokensPaid;
    player.tokens.gold -= goldPaid;
    publicTokens[res] += tokensPaid;
    publicTokens.gold += goldPaid;
  }
}

function BuyCard({ G, ctx, events }, level, cardId) {
  const player = G.players[ctx.currentPlayer];
  const { tokens, cards } = player;
  const card = findCardOnTheTable(G, level, cardId);

  if (!canBuyCard(tokens, cards, card)) {
    return INVALID_MOVE;
  }

  payForCard(player, card, G.tokens);

  player.cards[card.resource] += 1;
  G.points[ctx.currentPlayer] += card.points;
  removeCardFromTheTable(G, level, cardId);

  checkBonusAndEndTurn({ G, ctx, events });
}

function BuyReserved({ G, ctx, events }, cardId) {
  const player = G.players[ctx.currentPlayer];
  const { tokens, cards } = player;
  const card = player.reservedCards.find((card) => card.id === cardId);

  if (!canBuyCard(tokens, cards, card)) {
    return INVALID_MOVE;
  }

  payForCard(player, card, G.tokens);

  player.cards[card.resource] += 1;
  G.points[ctx.currentPlayer] += card.points;
  player.reservedCards = player.reservedCards.filter((card) => card.id !== cardId);

  checkBonusAndEndTurn({ G, ctx, events });
}

function ReserveCard({ G, ctx, events }, level, cardId) {
  const player = G.players[ctx.currentPlayer];
  const card = findCardOnTheTable(G, level, cardId);

  if (!card || player.reservedCards.length >= 3) {
    return INVALID_MOVE;
  }

  if (sum(Object.values(player.tokens)) < 10 && G.tokens.gold > 0) {
    player.tokens.gold += 1;
    G.tokens.gold -= 1;
  }
  player.reservedCards.push(card);
  removeCardFromTheTable(G, level, cardId);

  checkBonusAndEndTurn({ G, ctx, events });
}

function DiscardToken({ G, ctx }, resource) {
  const player = G.players[ctx.currentPlayer];
  if (player.tokens[resource] <= 0) {
    return INVALID_MOVE;
  }

  player.tokens[resource] -= 1;
  G.tokens[resource] += 1;
}

function TakeBonus({ G, ctx, events }, id) {
  const player = G.players[ctx.currentPlayer];
  const bonus = G.bonuses.find((bonus) => bonus.id === id);
  if (!bonus || !canTakeBonus(player.cards, bonus)) {
    return INVALID_MOVE;
  }

  G.points[ctx.currentPlayer] += bonus.points;
  player.bonuses.push(bonus);
  G.bonuses = G.bonuses.filter((bonus) => bonus.id !== id);
  events.endStage();
  events.endTurn();
}

function addCardsToTheTable(G) {
  Object.keys(G.table).forEach((level) => {
    G.table[level] = G.table[level].map((card) => card || G.deck[level].pop() || null);
  });
}

export const Splendid: CustomGame = {
  name: "Splendid",
  image: "/images/games/splendid/icon.png",
  minPlayers: 2,
  maxPlayers: 5,

  seed: process.env.NODE_ENV === "production" ? undefined : "test",
  setup: setupGame,
  plugins: [PluginActions()],

  phases: {
    wait: {
      start: true,
      next: "play",
      turn: {
        onBegin: ({ G, ctx, actions, events }) => {
          actions.log(ctx.currentPlayer, "manage");
          events.setActivePlayers({ currentPlayer: "manage", others: "wait" });
        },
        stages: {
          manage: {
            moves: {
              StartGame,
            },
          },
          wait: {
            moves: {},
          },
        },
      },
    },
    play: {
      moves: { TakeTokens, BuyCard, ReserveCard, DiscardToken, BuyReserved },
      turn: {
        onBegin: ({ G, ctx }) => {
          addCardsToTheTable(G);
          if (G.lastPlayer === ctx.currentPlayer) {
            G.calculateWinner = true;
          }
        },
        onEnd: ({ G, ctx }) => {
          const points = G.points[ctx.currentPlayer];
          if (points >= WINNING_POINTS && !G.lastPlayer) {
            G.lastPlayer = ctx.currentPlayer;
          }
        },
        order: TurnOrder.RESET,
        stages: {
          bonus: {
            moves: { TakeBonus },
          },
        },
      },
    },
  },
  endIf: ({ G, ctx }) => {
    if (G.calculateWinner) {
      const cardsCount = (playerID) => sum(Object.values(G.players[playerID].cards));
      const bonusesCount = (playerID) => G.player[playerID].bonuses.length;
      const winner = Object.keys(G.players).sort(
        (a, b) =>
          G.points[b] - G.points[a] ||
          cardsCount(a) - cardsCount(b) ||
          bonusesCount(b) - bonusesCount(a)
      )[0];
      return { winners: [winner] };
    }
  },
};
