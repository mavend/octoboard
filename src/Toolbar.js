import React from "react";
import { Icon, Menu } from 'semantic-ui-react';

const Toolbar = ({ currentColor, onColorChange, onSizeChange, onClearAll, onUndoDrawing }) => {
  const eraserColor = "#FFFFFF";
  const colors = [
    "#424953",
    "#D94452",
    "#FB6D51",
    "#FECD57",
    "#8AC054",
    "#B4E080",
    "#46CEAD",
    "#4B89DA",
    "#AC92EA",
    "#F299CE",
    "#F4D0B5"
  ];

  const onClickColor = (color) => {
    onColorChange(color);
    onSizeChange(2);
  };

  const onClickEraser = () => {
    onColorChange(eraserColor);
    onSizeChange(25);
  };

  return (
    <Menu>
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
        <Icon name="eraser" />
      </Menu.Item>
      <Menu.Item
        name='undo'
        active={false}
        onClick={onUndoDrawing}
      >
        <Icon name="undo" />
      </Menu.Item>
      <Menu.Item
        name='trash'
        active={false}
        onClick={onClearAll}
      >
        <Icon name="trash alternate" />
      </Menu.Item>
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

