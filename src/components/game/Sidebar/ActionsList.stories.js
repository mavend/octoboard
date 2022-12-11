import React from "react";

import ActionsList from "./ActionsList";

export default {
  component: ActionsList,
  title: "Sidebar/ActionsList",
  excludeStories: /.*Data$/,
};

const actionsMapper = (act) => {
  switch (act.name) {
    case "guess":
      return {
        actionType: "success",
        icon: "check circle",
        content: act.data.phrase,
      };
    case "foo":
      return {
        actionType: "warning",
        icon: "times circle",
        content: act.data.foo,
      };
  }
};

export const Default = (args) => <ActionsList actionsMapper={actionsMapper} {...args} />;

Default.args = {
  actions: [
    { name: "guess", id: "123", data: { phrase: "Baba z wozu?" } },
    { name: "manage", id: "456" },
    { name: "foo", id: "124", data: { foo: "test" } },
    { name: "bar", id: "125" },
    { name: "foo", id: "126", data: { foo: "test" } },
  ],
  maxActions: 3,
  fade: true,
};
