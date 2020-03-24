import React from "react";
import { Icon, Menu, Popup } from 'semantic-ui-react';

const Toolbar = ({ currentColor, onColorChange, onSizeChange, onClearAll, onUndoDrawing, onForfeit, canUndo }) => {
  const eraserColor = "#FFFFFF";
  const colors = [
    "#1b1c1d",
    "#767676",
    "#db2828",
    "#f2711c",
    "#fbbd08",
    "#b5cc18",
    "#21ba45",
    "#00b5ad",
    "#2185d0",
    "#6435c9",
    "#a333c8",
    "#e03997",
    "#f4d0b5",
    "#a5673f"
  ];

  const onClickColor = (color) => {
    onColorChange(color);
    onSizeChange(3);
  };

  const onClickEraser = () => {
    onColorChange(eraserColor);
    onSizeChange(25);
  };

  return (
    <Menu borderless size="small" style={{ height: "41px" }}>
      {colors.map(color => (
        <Menu.Item
          key={color}
          name={`color-${color}`}
          active={currentColor === color}
          onClick={() => onClickColor(color)}
        >
          <ColorBox color={color} />
        </Menu.Item>
      ))}

      <Menu.Item
        name='eraser'
        active={currentColor === eraserColor}
        onClick={onClickEraser}
      >
        <Icon fitted name="eraser" />
      </Menu.Item>
      <Menu.Menu position='right'>
        <Popup content="Remove last line"
          trigger={
            <Menu.Item
              name='undo'
              active={false}
              disabled={!canUndo}
              onClick={onUndoDrawing}
            >
              <Icon fitted name="undo" />
            </Menu.Item>
          } />
        <Popup content="Clear drawing"
          trigger={
            <Menu.Item
              name='trash'
              active={false}
              onClick={onClearAll}
            >
              <Icon fitted color='red' name="trash alternate outline" />
            </Menu.Item>
          } />
        <Popup content="Give up :("
          trigger={
            <Menu.Item
              name="flag"
              active={false}
              onClick={onForfeit}
            >
              <Icon fitted color='red' name="flag" />
            </Menu.Item>
          } />
      </Menu.Menu>
    </Menu>
  )
};

const ColorBox = ({ color }) => (
  <div
    style={{
      boxSizing: "border-box",
      width: "15px",
      height: "15px",
      backgroundColor: color}}>
  </div>
);

export default Toolbar;

