import easy from "./easy.json";
import idioms from "./idioms.json";
import nounPhrases from "./noun_phrases.json";
import proverbs from "./proverbs.json";

export const pl = {
  key: "pl",
  name: "polski",
  categories: [
    { key: "easy", name: "Proste słowa", phrases: easy },
    { key: "idioms", name: "Idiomy", phrases: idioms },
    { key: "noun_phrases", name: "Frazy", phrases: nounPhrases },
    { key: "proverbs", name: "Przysłowia", phrases: proverbs },
  ],
};

export default pl;
