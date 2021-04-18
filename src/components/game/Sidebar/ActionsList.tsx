import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";
import Action, { ActionProps } from "./Action";
import { Action as ActionType } from "plugins/actions";
import { useTranslation } from "react-i18next";

export type ActionPropsMapper = (action: ActionType) => ActionProps | null;

export interface ActionsListProps {
  actions: ActionType[];
  actionsMapper?: ActionPropsMapper;
  maxActions?: number;
  fade?: boolean;
}

export const ActionsList = ({
  actions,
  actionsMapper = () => null,
  maxActions = 3,
  fade = true,
}: ActionsListProps) => {
  const { t } = useTranslation("lobby");

  const defaultActionsMapper = useCallback<ActionPropsMapper>(
    (action) => {
      switch (action.name) {
        case "manage":
          return {
            icon: "chess king",
            iconColor: "yellow",
            content: t("sidebar.action.manage"),
          };
        default:
          return null;
      }
    },
    [t]
  );

  const fadeFor = useCallback((idx: number) => ((maxActions - idx) * 0.5) / maxActions + 0.5, [
    maxActions,
  ]);

  const actionsToDisplay = useMemo(
    () =>
      actions
        .map((action) => ({
          action,
          props: defaultActionsMapper(action) || actionsMapper(action),
        }))
        .filter(({ props }) => !!props)
        .slice(0, maxActions),
    [actions, maxActions, actionsMapper, defaultActionsMapper]
  );

  if (actionsToDisplay.length === 0) {
    return null;
  }

  return (
    <List verticalAlign="middle">
      {actionsToDisplay.map(({ action, props }, idx) => (
        <List.Item key={action.id} style={{ opacity: fade ? fadeFor(idx) : 1, marginRight: "8px" }}>
          <Action {...props} />
        </List.Item>
      ))}
    </List>
  );
};

ActionsList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  actionsMapper: PropTypes.func,
};

export default React.memo(ActionsList);
