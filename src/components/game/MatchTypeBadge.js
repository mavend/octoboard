import React from "react";
import PropTypes from "prop-types";
import { Icon, Label } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const propTypes = {
  privateMatch: PropTypes.bool,
  detailed: PropTypes.bool,
  style: PropTypes.object,
};

const MatchTypeBadge = ({ privateMatch, detailed, style }) => {
  const { t } = useTranslation("lobby");

  return (
    <Label as="span" size="small" style={style || {}}>
      <Icon name={privateMatch ? "lock" : "open lock"} />
      {detailed && (
        <Label.Detail>{privateMatch ? t("game.private") : t("game.public")}</Label.Detail>
      )}
    </Label>
  );
};
MatchTypeBadge.propTypes = propTypes;

export default MatchTypeBadge;
