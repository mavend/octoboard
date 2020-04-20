import React from "react";
import { text, number } from "@storybook/addon-knobs";
import { Card } from "semantic-ui-react";
import Avatar from "./index";

export default {
  component: Avatar,
  title: "User/Avatar",
  excludeStories: /.*Data$/,
};

export const Default = () => <Avatar small uid={text("UID", "some-user-uid")} />;

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

export const WithOverrides = () => {
  const size = number("Size", 200);
  return (
    <Avatar
      uid={text("UID", "some-user-uid")}
      color={number("Custom color", 0)}
      bodyStyle={number("Custom body Style", 0)}
      body={number("Custom body", 0)}
      eyes={number("Custom eyes", 0)}
      glasses={number("Custom glasses", 0)}
      features={number("Custom features", 0)}
      border={number("Custom border", 0)}
      style={{ width: size, height: size }}
    />
  );
};
