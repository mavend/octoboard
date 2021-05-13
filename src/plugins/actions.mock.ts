import { PlayerID } from "boardgame.io";
import { Action, ActionsData } from "./actions";

export const actionsDataMock = (actions: Record<PlayerID, Action[]>): { data: ActionsData } => ({
  data: {
    idx: 1,
    actions: {
      0: [{ name: "manage", id: 0, playerID: "0", time: "2021-01-01" }],
      ...actions,
    },
  },
});
