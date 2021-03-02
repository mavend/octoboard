import * as en from "./en";
import * as pl from "./pl";

const languages = { pl, en };

export const languagesList = [
  {
    key: "pl",
    name: "polski",
    sets: [
      { key: "easy", name: "Proste słowa" },
      { key: "idioms", name: "Idiomy" },
      { key: "noun_phrases", name: "Frazy" },
      { key: "proverbs", name: "Przysłowia" },
    ],
  },
  {
    key: "en",
    name: "English",
    sets: [
      { key: "easy", name: "Easy" },
      { key: "medium", name: "Medium" },
      { key: "hard", name: "Hard" },
    ],
  },
];

export function getPhrases(language = "en", set = null) {
  if (languages[language][set]) {
    return languages[language][set];
  }
  return Object.values(languages[language]).flat();
}
