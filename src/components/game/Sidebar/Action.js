import React from "react";
import { string, func, bool, shape } from "prop-types";
import { useTranslation } from "react-i18next";
import { Icon, Label, Image } from "semantic-ui-react";

const propTypes = {
  action: shape({
    action: string.isRequired,
    text: string,
    phrase: string,
    previous: string,
    success: bool,
  }),
  handleActionClick: func,
};

const Action = ({ action, handleActionClick }) => {
  const { t } = useTranslation("kalambury");
  const ActionType = {
    message: ActionMessage,
    guess: ActionGuess,
    change: ActionChange,
    forfeit: ActionForfeit,
    manage: ActionManage,
    draw: ActionDraw,
    match: ActionMatch,
    timeout: ActionTimeout,
  }[action.action];
  return <ActionType action={action} onClick={() => handleActionClick(action)} t={t} />;
};

const ActionMessage = ({ action: { text }, onClick }) => (
  <Label
    basic
    pointing="left"
    color="blue"
    style={{ maxWidth: "100%", marginLeft: 0 }}
    onClick={onClick}
  >
    <Icon name="chat" color="blue" />
    {text}
  </Label>
);

const ActionGuess = ({ action: { phrase, success }, onClick }) => (
  <Label
    basic={!success}
    color={success ? "green" : "red"}
    pointing="left"
    style={{ maxWidth: "100%", marginLeft: 0, cursor: onClick ? "pointer" : "auto" }}
    onClick={onClick}
  >
    {success ? <Icon name="check circle" /> : <Icon name="times circle" color="red" />}
    {phrase}
  </Label>
);

const ActionMatch = ({ action: { picture, style, onClick } }) => (
  <Image
    src={`/images/games/picture-match/pictures/${style}/${picture}.png`}
    size="tiny"
    onClick={onClick}
  />
);

const ActionChange = ({ action: { previous }, onClick, t }) => (
  <Label color="yellow" style={{ maxWidth: "100%" }} onClick={onClick}>
    <Icon name="exchange" />
    {t("sidebar.action.change", { phrase: previous })}
  </Label>
);

const ActionForfeit = ({ action: { previous }, onClick, t }) => (
  <Label color="red" style={{ maxWidth: "100%" }} onClick={onClick}>
    <Icon name="flag" />
    {t("sidebar.action.forfeit", { phrase: previous })}
  </Label>
);

const ActionManage = ({ onClick, t }) => (
  <Label style={{ maxWidth: "100%" }} onClick={onClick}>
    <Icon name="chess king" color="yellow" />
    {t("sidebar.action.manage")}
  </Label>
);

const ActionDraw = ({ onClick, t }) => (
  <Label style={{ maxWidth: "100%" }} onClick={onClick}>
    <Icon name="pencil" />
    {t("sidebar.action.draw")}
  </Label>
);

const ActionTimeout = ({ onClick, action: { previous }, t }) => (
  <Label color="red" style={{ maxWidth: "100%" }} onClick={onClick}>
    <Icon name="clock outline" />
    {t("sidebar.action.timeout", { phrase: previous })}
  </Label>
);

Action.propTypes = propTypes;

export default Action;
