export function LogAction(G, playerID, action, params = {}, clear = false) {
  if (clear) {
    G.actions = [];
  }
  G.actions.push({
    time: new Date().toISOString(),
    id: G.actionsCount++,
    playerID,
    action,
    ...params,
  });
}
