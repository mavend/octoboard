/* eslint-disable react/prop-types */
import React from "react";
import { Card } from "semantic-ui-react";
import Avatar from "./index";

export default {
  component: Avatar,
  title: "User/Avatar",
  excludeStories: /.*Data$/,
};

export const Default = (args) => <Avatar small {...args} />;

Default.args = {
  uid: "some-user-uid",
  empty: false,
};

export const NicePreview = ({ uid, ...args }) => {
  return (
    <Card style={{ margin: 20 }}>
      <Avatar
        uid={"some-user-uid"}
        style={{ width: 260, height: 308, margin: "0 auto" }}
        {...args}
      />
      <Card.Content>
        <Card.Header>{"some-user-uid"}</Card.Header>
      </Card.Content>
    </Card>
  );
};

NicePreview.args = {
  uid: "some-user-uid",
};
