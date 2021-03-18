import React from "react";
import { Icon, Menu, Popup } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { COLORS } from "config/constants";
import { Media } from "config/media";

const propTypes = {
  currentColor: PropTypes.string.isRequired,
  canChangePhrase: PropTypes.bool.isRequired,
  onColorChange: PropTypes.func.isRequired,
  onSizeChange: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
  onUndoDrawing: PropTypes.func.isRequired,
  onPhraseChange: PropTypes.func.isRequired,
  onForfeit: PropTypes.func.isRequired,
  canUndo: PropTypes.bool,
};

const Toolbar = ({
  currentColor,
  canChangePhrase,
  onColorChange,
  onSizeChange,
  onClearAll,
  onUndoDrawing,
  onPhraseChange,
  onForfeit,
  canUndo,
}) => {
  const { t } = useTranslation("kalambury");
  const eraserColor = "#FFFFFF";
  const colors = COLORS;

  const onClickColor = (color) => {
    onColorChange(color);
    onSizeChange(3);
  };

  const onClickEraser = () => {
    onColorChange(eraserColor);
    onSizeChange(25);
  };

  const MenuWide = () => (
    <Menu borderless size="small">
      {colors.map((color) => (
        <Menu.Item
          key={color}
          name={`color-${color}`}
          active={currentColor === color}
          onClick={() => onClickColor(color)}
        >
          <ColorBox color={color} />
        </Menu.Item>
      ))}

      <Menu.Item name="eraser" active={currentColor === eraserColor} onClick={onClickEraser}>
        <Icon fitted name="eraser" />
      </Menu.Item>
      <Menu.Menu position="right">
        <Popup
          content={t("tools.undo")}
          trigger={
            <Menu.Item name="undo" active={false} disabled={!canUndo} onClick={onUndoDrawing}>
              <Icon fitted name="undo" />
            </Menu.Item>
          }
        />
        <Popup
          content={t("tools.clear")}
          trigger={
            <Menu.Item name="trash" active={false} onClick={onClearAll}>
              <Icon fitted color="red" name="trash alternate outline" />
            </Menu.Item>
          }
        />
        <Popup
          content={t("board.game.new_phrase")}
          trigger={
            <Menu.Item
              name="exchange"
              active={false}
              disabled={!canChangePhrase}
              onClick={onPhraseChange}
            >
              <Icon fitted name="exchange" />
            </Menu.Item>
          }
        />
        <Popup
          content={t("tools.forfeit")}
          trigger={
            <Menu.Item name="flag" active={false} onClick={onForfeit}>
              <Icon fitted color="red" name="flag" />
            </Menu.Item>
          }
        />
      </Menu.Menu>
    </Menu>
  );

  const MenuNarrow = () => (
    <>
      <Menu widths={3} size="small">
        <Menu.Item name="trash" active={false} onClick={onClearAll}>
          <Icon fitted color="red" name="trash alternate outline" />
        </Menu.Item>
        <Menu.Item
          name="exchange"
          active={false}
          disabled={!canChangePhrase}
          onClick={onPhraseChange}
        >
          <Icon fitted name="exchange" />
        </Menu.Item>
        <Menu.Item name="flag" active={false} onClick={onForfeit}>
          <Icon fitted color="red" name="flag" />
        </Menu.Item>
      </Menu>
      <Menu widths={6} attached="top" size="small">
        {colors.slice(0, 6).map((color) => (
          <Menu.Item
            key={color}
            name={`color-${color}`}
            active={currentColor === color}
            onClick={() => onClickColor(color)}
          >
            <ColorBox color={color} />
          </Menu.Item>
        ))}
      </Menu>
      <Menu widths={6} attached="bottom" size="small">
        {colors.slice(6, 10).map((color) => (
          <Menu.Item
            key={color}
            name={`color-${color}`}
            active={currentColor === color}
            onClick={() => onClickColor(color)}
          >
            <ColorBox color={color} />
          </Menu.Item>
        ))}
        <Menu.Item name="eraser" active={currentColor === eraserColor} onClick={onClickEraser}>
          <Icon fitted name="eraser" />
        </Menu.Item>
        <Menu.Item name="undo" active={false} disabled={!canUndo} onClick={onUndoDrawing}>
          <Icon fitted name="undo" />
        </Menu.Item>
      </Menu>
    </>
  );

  return (
    <>
      <Media greaterThanOrEqual="wide_mobile">
        <MenuWide />
      </Media>
      <Media lessThan="wide_mobile">
        <MenuNarrow />
      </Media>
    </>
  );
};

const ColorBox = ({ color }) => (
  <div
    style={{
      boxSizing: "border-box",
      width: "15px",
      height: "15px",
      backgroundColor: color,
    }}
  ></div>
);
ColorBox.propTypes = { color: PropTypes.string };

Toolbar.propTypes = propTypes;

export default React.memo(Toolbar);
