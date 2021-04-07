import React from "react";
import { text, boolean } from "@storybook/addon-knobs";
import { Card } from "semantic-ui-react";
import Avatar from "./index";

export default {
  component: Avatar,
  title: "User/Avatar",
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <Avatar small uid={text("UID", "some-user-uid")} empty={boolean("Empty?", false)} />
);

export const NicePreview = () => {
  const uid = text("UID", "some-user-uid");
  return (
    <Card style={{ margin: 20 }}>
      <Avatar uid={uid} style={{ width: 260, height: 308, margin: "0 auto" }} />
      <Card.Content>
        <Card.Header>{uid}</Card.Header>
      </Card.Content>
    </Card>
  );
};
