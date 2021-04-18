import React from "react";
import { Icon, Label, LabelProps, SemanticICONS, SemanticCOLORS } from "semantic-ui-react";

export type ActionType = "default" | "success" | "info" | "warning" | "alert" | "danger";

export interface ActionProps {
  actionType?: ActionType;
  icon?: SemanticICONS;
  iconColor?: SemanticCOLORS;
  personal?: boolean;
  onClick?: () => void;
  content?: React.ReactNode;
  children?: React.ReactNode;
}

// eslint-disable-next-line no-unused-vars
const actionTypes: { [key in ActionType]: LabelProps & { iconColor?: SemanticCOLORS } } = {
  default: {},
  success: {
    color: "green",
  },
  info: {
    color: "blue",
    basic: true,
  },
  alert: {
    color: "yellow",
  },
  warning: {
    color: "red",
    basic: true,
    iconColor: "red",
  },
  danger: {
    color: "red",
  },
};

export const Action = ({
  actionType = "default",
  icon,
  iconColor,
  onClick,
  personal = false,
  content,
  children,
}: ActionProps) => {
  const styles = {
    maxWidth: "100%",
    marginLeft: 0,
    cursor: onClick ? "pointer" : "auto",
  };

  const { iconColor: actionTypeIconColor, ...actionTypeProps } = actionTypes[actionType];

  return (
    <Label style={styles} onClick={onClick} pointing={personal && "left"} {...actionTypeProps}>
      {icon && <Icon name={icon} color={iconColor ?? actionTypeIconColor} />}
      {content || children}
    </Label>
  );
};

export default Action;
