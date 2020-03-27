import React from "react";
import { Icon, Transition, Header, List, Label, Segment, Feed } from "semantic-ui-react";

const SidebarAction = ({ action, handleGuessClick }) => {
  const ActionType = {
    message: ActionMessage,
    guess: ActionGuess,
    change: ActionChange,
    forfeit: ActionForfeit,
    manage: ActionManage,
    draw: ActionDraw,
    timeout: ActionTimeout,
  }[action.action];
  return <ActionType action={action} handleGuessClick={handleGuessClick} />;
};

const ActionMessage = ({ action: { text } }) => (
  <Label basic pointing="left" color="blue" style={{ maxWidth: "100%", marginLeft: 0 }}>
    <Icon name="chat" color="blue" />
    {text}
  </Label>
);

const ActionGuess = ({ action: { phrase, success }, handleGuessClick }) => (
  <Label
    basic={!success}
    color={success ? "green" : "red"}
    pointing="left"
    style={{ maxWidth: "100%", marginLeft: 0, cursor: "pointer" }}
    onClick={handleGuessClick}
  >
    {success ? <Icon name="check circle" /> : <Icon name="times circle" color="red" />}

    {phrase}
  </Label>
);

const ActionChange = ({ action: { previous } }) => (
  <Label color="yellow" style={{ maxWidth: "100%" }}>
    <Icon name="exchange" />
    Changed phrase. Old one was "{previous}"
  </Label>
);

const ActionForfeit = ({ action: { previous } }) => (
  <Label color="red" style={{ maxWidth: "100%" }}>
    <Icon name="flag" />
    Gave up. The phrase was "{previous}"
  </Label>
);

const ActionManage = () => (
  <Label style={{ maxWidth: "100%" }}>
    <Icon name="chess king" color="yellow" />
    Can now manage game.
  </Label>
);

const ActionDraw = () => (
  <Label style={{ maxWidth: "100%" }}>
    <Icon name="pencil" />
    Is now drawing...
  </Label>
);

const ActionTimeout = ({ action: { previous } }) => (
  <Label color="red" style={{ maxWidth: "100%" }}>
    <Icon name="clock outline" />
    Ran out of time. Phrase was "{previous}"
  </Label>
);

export default SidebarAction;
