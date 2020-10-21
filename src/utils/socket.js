import { SocketIO } from "boardgame.io/multiplayer";
import { API_ROOT } from "config/api";
export const socket = SocketIO({ server: API_ROOT });
