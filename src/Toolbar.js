import React from "react";

const Toolbar = ({ currentColor, onColorChange, onSizeChange, onClearAll }) => {
  const colors = [
    "#000000",
    "#ff0000",
    "#00ff00",
    "#0000ff",
  ];

  const onClickEraser = () => {
    onColorChange("#eeeeee");
    onSizeChange(25);
  };

  const onClickColor = (color) => {
    onColorChange(color);
    onSizeChange(2);
  }

  const colorsItems = colors.map((color) =>
    <ColorBox key={color} color={color} onClick={() => onClickColor(color)} />
  );

  return (
    <div style={{
      width: "100%",
      height: "20px",
      display: "flex"
    }}>
      <span style={{ margin: "0 5px" }}>Current:</span>
      <ColorBox color={currentColor} />

      <span style={{ margin: "0 5px" }}>Available:</span>
      {colorsItems}

      <button onClick={onClickEraser} style={{ margin: "0 5px" }}>Eraser</button>

      <button onClick={onClearAll} style={{ margin: "0 5px" }}>Clear All</button>
    </div>
  );
};

const ColorBox = ({ color, onClick }) => (
  <div
    onClick={onClick}
    style={{
      boxSizing: "border-box",
      border: "2px solid black",
      width: "20px",
      height: "20px",
      margin: "0 5px",
      backgroundColor: color || "#eeeeee",
      cursor: "pointer" }}>
  </div>
);

export default Toolbar;

