export function canBuyCard(tokens, cards, card) {
  if (!tokens || !cards) return false;
  let gold = tokens.gold;
  return Object.keys(card.cost).every((res) => {
    const available = tokens[res] + cards[res];
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

export function canTakeBonus(cards, bonus) {
  if (!cards || !bonus) return false;
  return Object.keys(bonus.cost).every((res) => cards[res] >= bonus.cost[res]);
}

export function fromEntries(iterable) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
}

export function imgUrl(name) {
  return `/images/games/splendid/cards/${name}`;
}
