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
  handleGuessClick: func,
};

const Action = ({ action, handleGuessClick }) => {
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
    style={{ maxWidth: "100%", marginLeft: 0, cursor: handleGuessClick ? "pointer" : "auto" }}
    onClick={handleGuessClick}
  >
    {success ? <Icon name="check circle" /> : <Icon name="times circle" color="red" />}
    {phrase}
  </Label>
);

const ActionMatch = ({ action: { picture, style } }) => (
  <Image src={`/images/games/picture-match/pictures/${style}/${picture}.png`} size="tiny" />
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

Action.propTypes = propTypes;

export default Action;