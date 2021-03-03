import easy from "./easy.json";
import medium from "./medium.json";
import hard from "./hard.json";

const en = {
  key: "en",
  name: "English",
  categories: [
    { key: "easy", name: "Easy", phrases: easy },
    { key: "medium", name: "Medium", phrases: medium },
    { key: "hard", name: "Hard", phrases: hard },
  ],
};

export default en;
