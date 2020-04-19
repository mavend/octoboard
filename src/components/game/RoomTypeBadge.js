import React from "react";
import { Icon, Label } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const RoomTypeBadge = ({ privateRoom, detailed, style }) => {
  const { t } = useTranslation("lobby");

  return (
    <Label as="span" size="small" style={style || {}}>
      <Icon name={privateRoom ? "lock" : "open lock"} />
      {detailed && (
        <Label.Detail>{privateRoom ? t("game.private") : t("game.public")}</Label.Detail>
      )}
    </Label>
  );
};

export default RoomTypeBadge;
