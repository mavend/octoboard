import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Icon, Label, Image } from "semantic-ui-react";

const propTypes = {
  action: PropTypes.shape({
    action: PropTypes.string.isRequired,
    text: PropTypes.string,
    phrase: PropTypes.string,
    previous: PropTypes.string,
    success: PropTypes.bool,
  }),
  handleActionClick: PropTypes.func,
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

const singleActionPropTypes = {
  ...propTypes,
  onClick: PropTypes.func,
  t: PropTypes.object,
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
ActionMessage.propTypes = singleActionPropTypes;

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
ActionGuess.propTypes = singleActionPropTypes;

const ActionMatch = ({ action: { picture, style, onClick } }) => (
  <Image
    src={`/images/games/picture-match/pictures/${style}/${picture}.png`}
    size="tiny"
    onClick={onClick}
  />
);
ActionMatch.propTypes = singleActionPropTypes;

const ActionChange = ({ action: { previous }, onClick, t }) => (
  <Label color="yellow" style={{ maxWidth: "100%" }} onClick={onClick}>
    <Icon name="exchange" />
    {t("sidebar.action.change", { phrase: previous })}
  </Label>
);
ActionChange.propTypes = singleActionPropTypes;

const ActionForfeit = ({ action: { previous }, onClick, t }) => (
  <Label color="red" style={{ maxWidth: "100%" }} onClick={onClick}>
    <Icon name="flag" />
    {t("sidebar.action.forfeit", { phrase: previous })}
  </Label>
);
ActionForfeit.propTypes = singleActionPropTypes;

const ActionManage = ({ onClick, t }) => (
  <Label style={{ maxWidth: "100%" }} onClick={onClick}>
    <Icon name="chess king" color="yellow" />
    {t("sidebar.action.manage")}
  </Label>
);
ActionManage.propTypes = singleActionPropTypes;

const ActionDraw = ({ onClick, t }) => (
  <Label style={{ maxWidth: "100%" }} onClick={onClick}>
    <Icon name="pencil" />
    {t("sidebar.action.draw")}
  </Label>
);
ActionDraw.propTypes = singleActionPropTypes;

const ActionTimeout = ({ onClick, action: { previous }, t }) => (
  <Label color="red" style={{ maxWidth: "100%" }} onClick={onClick}>
    <Icon name="clock outline" />
    {t("sidebar.action.timeout", { phrase: previous })}
  </Label>
);
ActionTimeout.propTypes = singleActionPropTypes;

Action.propTypes = propTypes;

export default Action;
