import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

import SidebarAction from "./SidebarAction";

export default {
  component: SidebarAction,
  title: "Kalambury/Sidebar/Action",
  excludeStories: /.*Data$/,
};

export const ActionMessage = () => (
  <SidebarAction
    action={{ action: "message", text: text("Message text", "Hello there, shall we begin?") }}
  />
);
export const ActionGuess = () => (
  <SidebarAction
    action={{
      action: "guess",
      phrase: text("User guess", "Baba z wozu koniom lżej"),
      success: boolean("Success", true),
    }}
    handleGuessClick={action("handleGuessClick")}
  />
);
export const ActionChange = () => (
  <SidebarAction
    action={{ action: "change", previous: text("Phrase before change", "Baba z wozu koniom lżej") }}
  />
);
export const ActionForfeit = () => (
  <SidebarAction
    action={{
      action: "forfeit",
      previous: text("Phrase before forfeit", "Baba z wozu koniom lżej"),
    }}
  />
);
export const ActionManage = () => <SidebarAction action={{ action: "manage" }} />;
export const ActionDraw = () => <SidebarAction action={{ action: "draw" }} />;
export const ActionTimeout = () => (
  <SidebarAction
    action={{
      action: "timeout",
      previous: text("Phrase before timeout", "Baba z wozu koniom lżej"),
    }}
  />
);
