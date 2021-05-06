import React from "react";
import Action from "./Action";

export default {
  component: Action,
  title: "Sidebar/Action",
  excludeStories: /.*Data$/,
};

export const ActionMessage = () => <Action content="Test" />;
