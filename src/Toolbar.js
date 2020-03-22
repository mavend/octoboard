import React from "react";

const Toolbar = ({ currentColor, onColorChange, onSizeChange, onClearAll }) => {
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

  const onClickEraser = () => {
    onColorChange("#F4F6F9");
    onSizeChange(25);
  };

  const onClickColor = (color) => {
    onColorChange(color);
    onSizeChange(3);
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
      border: "2px solid #A9B1BC",
      width: "20px",
      height: "20px",
      margin: "0 5px",
      backgroundColor: color || "#F4F6F9",
      cursor: "pointer" }}>
  </div>
);

export default Toolbar;

