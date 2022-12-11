import { Game, MoveFn } from "boardgame.io";
import { ActionsApi } from "plugins/actions";

export type PluginAPIs = { actions: ActionsApi } & Record<string, unknown>;
export type CustomMoveFn = MoveFn<any, PluginAPIs>;
export type CustomGame = Game<any, PluginAPIs> & { displayName?: string; image?: string };
