import React from "react";
import { Icon, Label } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const Action = ({ action, handleGuessClick }) => {
  const { t } = useTranslation("kalambury");
  const ActionType = {
    message: ActionMessage,
    guess: ActionGuess,
    change: ActionChange,
    forfeit: ActionForfeit,
    manage: ActionManage,
    draw: ActionDraw,
    timeout: ActionTimeout,
  }[action.action];
  return <ActionType action={action} handleGuessClick={handleGuessClick} t={t} />;
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

const ActionChange = ({ action: { previous }, t }) => (
  <Label color="yellow" style={{ maxWidth: "100%" }}>
    <Icon name="exchange" />
    {t("sidebar.action.change", { phrase: previous })}
  </Label>
);

const ActionForfeit = ({ action: { previous }, t }) => (
  <Label color="red" style={{ maxWidth: "100%" }}>
    <Icon name="flag" />
    {t("sidebar.action.forfeit", { phrase: previous })}
  </Label>
);

const ActionManage = ({ t }) => (
  <Label style={{ maxWidth: "100%" }}>
    <Icon name="chess king" color="yellow" />
    {t("sidebar.action.manage")}
  </Label>
);

const ActionDraw = ({ t }) => (
  <Label style={{ maxWidth: "100%" }}>
    <Icon name="pencil" />
    {t("sidebar.action.draw")}
  </Label>
);

const ActionTimeout = ({ action: { previous }, t }) => (
  <Label color="red" style={{ maxWidth: "100%" }}>
    <Icon name="clock outline" />
    {t("sidebar.action.timeout", { phrase: previous })}
  </Label>
);

export default Action;
