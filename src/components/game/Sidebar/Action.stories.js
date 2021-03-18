import React from "react";
import { action } from "@storybook/addon-actions";
import { text, number, select, boolean } from "@storybook/addon-knobs";

import Action from "./Action";

export default {
  component: Action,
  title: "Sidebar/Action",
  excludeStories: /.*Data$/,
};

export const ActionMessage = () => (
  <Action
    action={{ action: "message", text: text("Message text", "Hello there, shall we begin?") }}
    handleActionClick={action("handleActionClick")}
  />
);
export const ActionGuess = () => (
  <Action
    action={{
      action: "guess",
      phrase: text("User guess", "Baba z wozu koniom lżej"),
      success: boolean("Success", true),
    }}
    handleActionClick={action("handleActionClick")}
  />
);
export const ActionChange = () => (
  <Action
    action={{ action: "change", previous: text("Phrase before change", "Baba z wozu koniom lżej") }}
    handleActionClick={action("click")}
  />
);
export const ActionForfeit = () => (
  <Action
    action={{
      action: "forfeit",
      previous: text("Phrase before forfeit", "Baba z wozu koniom lżej"),
    }}
    handleActionClick={action("handleActionClick")}
  />
);
export const ActionManage = () => <Action action={{ action: "manage" }} />;
export const ActionDraw = () => <Action action={{ action: "draw" }} />;
export const ActionTimeout = () => (
  <Action
    action={{
      action: "timeout",
      previous: text("Phrase before timeout", "Baba z wozu koniom lżej"),
    }}
    handleActionClick={action("handleActionClick")}
  />
);
export const ActionMatch = () => (
  <Action
    action={{
      action: "match",
      picture: number("Picture number", 0),
      style: select("Picture style", ["emoji", "color", "circle", "lines"], "emoji"),
    }}
    handleActionClick={action("handleActionClick")}
  />
);
