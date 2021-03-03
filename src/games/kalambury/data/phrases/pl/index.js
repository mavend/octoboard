import easy from "./easy.json";
import idioms from "./idioms.json";
import noun_phrases from "./noun_phrases.json";
import proverbs from "./proverbs.json";

export const pl = {
  key: "pl",
  name: "polski",
  categories: [
    { key: "easy", name: "Proste słowa", phrases: easy },
    { key: "idioms", name: "Idiomy", phrases: idioms },
    { key: "noun_phrases", name: "Frazy", phrases: noun_phrases },
    { key: "proverbs", name: "Przysłowia", phrases: proverbs },
  ],
};

export default pl;
