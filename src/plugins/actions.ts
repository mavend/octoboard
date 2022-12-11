import { PlayerID, Plugin } from "boardgame.io";

export interface Action {
  id: number;
  name: string;
  playerID: PlayerID;
  time: string;
  data?: any;
}
export interface ActionsData {
  actions: Record<PlayerID, Action[]>;
  idx: number;
}

export interface ActionsApi {
  state: ActionsData;
  log: (playerID: PlayerID, name: string, data?: object) => void;
  get: (playerID: PlayerID) => Action[];
  clear: (playerID?: PlayerID) => void;
}

export function PluginActions(): Plugin<ActionsApi, ActionsData> {
  return {
    name: "actions",

    // Initialize the plugin's data.
    // This is stored in a special area of the state object
    // and not exposed to the move functions.
    setup: ({ ctx }: any) => {
      const actions: Record<PlayerID, Action[]> = {};
      for (let i = 0; i < ctx.numPlayers; i++) {
        actions[i + ""] = [];
      }
      const idx = 0;

      return { idx, actions };
    },

    // Create an object that becomes available in `ctx`
    // under `ctx['plugin-name']`.
    // This is called at the beginning of a move or event.
    // This object will be held in memory until flush (below)
    // is called.
    api: ({ data: { actions, idx } }: any): ActionsApi => {
      const state: ActionsData = { actions, idx };

      const log = (playerID: PlayerID, name: string, data?: object) => {
        const action = {
          name,
          playerID,
          id: state.idx++,
          time: new Date().toISOString(),
          data,
        };
        state.actions[playerID] = [action, ...(state.actions[playerID] || [])];
      };

      const get = (playerID: PlayerID): Action[] => state.actions[playerID];

      const clear = (playerId?: PlayerID) => {
        if (playerId) {
          state.actions[playerId] = [];
        } else {
          Object.keys(state.actions).forEach((id) => {
            state.actions[id] = [];
          });
        }
      };

      return {
        state,
        log,
        get,
        clear,
      };
    },

    // Return an updated version of data that is persisted
    // in the game's state object.
    flush: ({ api: { state } }: any) => state,
  };
}
