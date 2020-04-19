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
