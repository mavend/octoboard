import React from "react";
import { Icon, Menu, Popup } from 'semantic-ui-react';

const Toolbar = ({ currentColor, onColorChange, onSizeChange, onClearAll, onUndoDrawing, canUndo }) => {
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
    onSizeChange(3);
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
      <Menu.Menu position='right'>
        <Popup content="Remove last line"
          trigger={
            <Menu.Item
              name='undo'
              active={false}
              disabled={!canUndo}
              onClick={onUndoDrawing}
            >
              <Icon name="undo" />
            </Menu.Item>
          } />
        <Popup content="Clear drawing"
          trigger={
            <Menu.Item
              name='trash'
              active={false}
              onClick={onClearAll}
            >
              <Icon color='red' name="trash alternate outline" />
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

