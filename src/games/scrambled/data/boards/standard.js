const A = { bonus: { type: "letter", multiply: 2 } };
const B = { bonus: { type: "letter", multiply: 3 } };
const C = { bonus: { type: "word", multiply: 2 } };
const D = { bonus: { type: "word", multiply: 3 } };
const S = { ...C, start: true };

const board = {
  name: "Standard",
  board: [
    { row: [D, 0, 0, A, 0, 0, 0, D, 0, 0, 0, A, 0, 0, D] },
    { row: [0, C, 0, 0, 0, B, 0, 0, 0, B, 0, 0, 0, C, 0] },
    { row: [0, 0, C, 0, 0, 0, A, 0, A, 0, 0, 0, C, 0, 0] },
    { row: [A, 0, 0, C, 0, 0, 0, A, 0, 0, 0, C, 0, 0, A] },
    { row: [0, 0, 0, 0, C, 0, 0, 0, 0, 0, C, 0, 0, 0, 0] },
    { row: [0, B, 0, 0, 0, B, 0, 0, 0, B, 0, 0, 0, B, 0] },
    { row: [0, 0, A, 0, 0, 0, A, 0, A, 0, 0, 0, A, 0, 0] },
    { row: [D, 0, 0, A, 0, 0, 0, S, 0, 0, 0, A, 0, 0, D] },
    { row: [0, 0, A, 0, 0, 0, A, 0, A, 0, 0, 0, A, 0, 0] },
    { row: [0, B, 0, 0, 0, B, 0, 0, 0, B, 0, 0, 0, B, 0] },
    { row: [0, 0, 0, 0, C, 0, 0, 0, 0, 0, C, 0, 0, 0, 0] },
    { row: [A, 0, 0, C, 0, 0, 0, A, 0, 0, 0, C, 0, 0, A] },
    { row: [0, 0, C, 0, 0, 0, A, 0, A, 0, 0, 0, C, 0, 0] },
    { row: [0, C, 0, 0, 0, B, 0, 0, 0, B, 0, 0, 0, C, 0] },
    { row: [D, 0, 0, A, 0, 0, 0, D, 0, 0, 0, A, 0, 0, D] },
  ],
};

export default board;
