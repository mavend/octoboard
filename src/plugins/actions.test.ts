/* eslint-disable jest/prefer-strict-equal */
import { PluginActions } from "./actions";
import { Client } from "boardgame.io/client";

const ISO_TIME_REGEX = /^(\d{4})-0?(\d+)-0?(\d+)[T ]0?(\d+):0?(\d+):0?(\d+)\.(\d+)Z?$/;

describe("default values", () => {
  it("playerState is not passed", () => {
    expect.hasAssertions();
    const plugin = PluginActions();
    const game = {
      plugins: [plugin],
    };
    const client = Client({ game });

    expect(client.getState()!.plugins[plugin.name].data).toEqual({
      actions: { "0": [], "1": [] },
      idx: 0,
    });
  });
});

describe("in game", () => {
  let client;

  beforeEach(() => {
    const game = {
      moves: {
        LogAction: (_, ctx, playerID, name, data?) => {
          ctx.actions.log(playerID, name, data);
        },
        LoadActions: (G, ctx, playerID) => {
          G.playerActions = ctx.actions.get(playerID);
        },
        Clear: (_, ctx, playerID) => {
          ctx.actions.clear(playerID);
        },
      },
      plugins: [PluginActions()],
    };

    client = Client({ game });
  });

  it("log action with data", () => {
    expect.hasAssertions();
    client.moves.LogAction("1", "bar", { text: "abc" });
    expect(client.getState().plugins[PluginActions().name].data).toMatchObject({
      idx: 1,
      actions: {
        "0": [],
        "1": [
          {
            name: "bar",
            playerID: "1",
            id: 0,
            time: expect.stringMatching(ISO_TIME_REGEX),
            data: { text: "abc" },
          },
        ],
      },
    });
  });

  it("appends new actions in front of the list", () => {
    expect.hasAssertions();
    client.moves.LogAction("0", "foo", {});
    client.moves.LogAction("0", "bar", {});
    const playerActions = client.getState().plugins[PluginActions().name].data.actions[0];
    expect(playerActions.map((action) => action.name)).toEqual(["bar", "foo"]);
  });

  it("returns all users actions", () => {
    expect.hasAssertions();
    client.moves.LogAction("0", "foo", {});
    client.moves.LogAction("1", "foo", {});
    client.moves.LogAction("1", "foo", {});

    client.moves.LoadActions("1");

    expect(client.getState().G.playerActions).toHaveLength(2);
  });

  it("allows to clear one user actions", () => {
    expect.hasAssertions();
    client.moves.LogAction("0", "foo", {});
    client.moves.LogAction("1", "foo", {});
    client.moves.Clear("0");

    expect(client.getState().plugins[PluginActions().name].data).toMatchObject({
      idx: 2,
      actions: {
        "0": [],
        "1": [
          {
            name: "foo",
            playerID: "1",
            id: 1,
            time: expect.stringMatching(ISO_TIME_REGEX),
            data: {},
          },
        ],
      },
    });
  });

  it("allows to clear all users actions", () => {
    expect.hasAssertions();
    client.moves.LogAction("0", "foo", {});
    client.moves.LogAction("1", "foo", {});
    client.moves.Clear();

    expect(client.getState().plugins[PluginActions().name].data).toMatchObject({
      idx: 2,
      actions: {
        "0": [],
        "1": [],
      },
    });
  });
});
