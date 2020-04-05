import { filter, reverse } from "lodash";

function filterActions(actions, playerID, actionType) {
  let allActions = reverse(filter(actions, { playerID: playerID.toString() }));
  if (actionType) {
    return filter(allActions, { action: actionType });
  }
  return allActions;
}

export default filterActions;
