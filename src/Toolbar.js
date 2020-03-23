import React from "react";
import { Icon, Menu } from 'semantic-ui-react';

const Toolbar = ({ currentColor, onColorChange, onSizeChange, onClearAll }) => {
  const colors = [
    {name: "black", value: "#000000"},
    {name: "red", value: "#ff0000"},
    {name: "green", value: "#00ff00"},
    {name: "blue", value: "#0000ff"},
  ];

  const onClickColor = (color) => {
    onColorChange(color.value);
    onSizeChange(2);
  };

  const onClickEraser = () => {
    onColorChange("#eeeeee");
    onSizeChange(25);
  };

  return (
    <Menu>
      {colors.map((color) => (
        <Menu.Item
          name={`color-${color.name}`}
          active={currentColor === color.value}
          onClick={() => onClickColor(color)}
        >
          <Icon name="circle" color={color.name} />
        </Menu.Item>
      ))}

      <Menu.Item
        name='eraser'
        active={currentColor === "#eeeeee"}
        onClick={onClickEraser}
      >
        <Icon name="eraser" />
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

export default Toolbar;

